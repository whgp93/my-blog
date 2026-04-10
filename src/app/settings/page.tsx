'use client'
import { useState, useRef } from 'react'
import { Upload, Check, Trash2 } from 'lucide-react'

export default function SettingsPage() {
  const [uploading, setUploading] = useState(false)
  const [currentFont, setCurrentFont] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('customFont')
      if (stored) return JSON.parse(stored).fontFamily
    }
    return null
  })
  const [success, setSuccess] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('font', file)

      const res = await fetch('/api/fonts', { method: 'POST', body: formData })
      if (!res.ok) throw new Error('فشل الرفع')

      const { fontUrl, fontFamily } = await res.json()
      localStorage.setItem('customFont', JSON.stringify({ fontUrl, fontFamily }))
      setCurrentFont(fontFamily)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)

      // Apply immediately
      const existing = document.getElementById('custom-font')
      if (existing) existing.remove()
      const style = document.createElement('style')
      style.id = 'custom-font'
      style.textContent = `
        @font-face {
          font-family: '${fontFamily}';
          src: url('${fontUrl}');
          font-display: swap;
        }
        body { font-family: '${fontFamily}', var(--font-tajawal), sans-serif; }
      `
      document.head.appendChild(style)
    } catch {
      alert('حدث خطأ أثناء رفع الخط')
    } finally {
      setUploading(false)
    }
  }

  const removeFont = () => {
    localStorage.removeItem('customFont')
    document.getElementById('custom-font')?.remove()
    setCurrentFont(null)
  }

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 pb-20">
      <header className="pt-8 mb-12">
        <h1 className="font-headline text-4xl mb-3">الإعدادات</h1>
        <p className="text-on-surface-variant">تخصيص مظهر المدونة.</p>
      </header>

      {/* Font Upload Card */}
      <div className="bg-surface-container-low rounded-xl p-8 mb-6">
        <h2 className="font-headline text-xl mb-2">خط مخصص</h2>
        <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
          ارفع خطاً عربياً مخصصاً (TTF، WOFF، WOFF2، OTF) ليُطبَّق على المدونة كاملة.
          ملاحظة: الخطوط المرفوعة تُحفظ محلياً في المتصفح.
        </p>

        {currentFont && (
          <div className="flex items-center justify-between mb-4 p-4 bg-surface-container rounded-lg">
            <div>
              <p className="text-xs uppercase tracking-widest text-outline mb-1">الخط الحالي</p>
              <p className="font-bold text-on-surface">{currentFont}</p>
            </div>
            <button
              onClick={removeFont}
              className="flex items-center gap-2 text-xs text-error hover:text-error-container transition-colors"
            >
              <Trash2 size={14} />
              إزالة
            </button>
          </div>
        )}

        <div className="flex items-center gap-4">
          <input
            type="file"
            ref={fileRef}
            accept=".ttf,.woff,.woff2,.otf"
            onChange={handleUpload}
            className="hidden"
          />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-primary-dim transition-colors disabled:opacity-50"
          >
            {uploading ? (
              'جاري الرفع...'
            ) : (
              <>
                <Upload size={16} />
                رفع خط
              </>
            )}
          </button>
          {success && (
            <span className="flex items-center gap-2 text-sm text-primary font-semibold">
              <Check size={16} />
              تم تطبيق الخط
            </span>
          )}
        </div>
        <p className="text-[10px] text-outline-variant mt-3 leading-relaxed">
          الصيغ المدعومة: .ttf · .woff · .woff2 · .otf
        </p>
      </div>

      {/* Theme info */}
      <div className="bg-surface-container-low rounded-xl p-8">
        <h2 className="font-headline text-xl mb-2">المظهر</h2>
        <p className="text-sm text-on-surface-variant mb-4">
          استخدم أيقونة القمر/الشمس في شريط التنقل لتبديل بين الوضع الليلي والنهاري.
        </p>
        <p className="text-sm text-on-surface-variant">
          الخط الافتراضي: <strong className="text-on-surface">Tajawal</strong> من Google Fonts.
        </p>
      </div>
    </div>
  )
}
