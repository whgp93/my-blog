'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'خطأ في تسجيل الدخول')
        return
      }
      router.push('/admin')
      router.refresh()
    } catch {
      setError('حدث خطأ، حاول مجدداً')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 rounded-full bg-primary-container flex items-center justify-center mb-4">
            <Lock size={24} className="text-on-primary-container" />
          </div>
          <h1 className="font-headline text-3xl text-on-surface">لوحة التحكم</h1>
          <p className="text-sm text-on-surface-variant mt-2">أدخل كلمة المرور للمتابعة</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-surface-container-low rounded-xl p-8 space-y-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant block mb-2">
              كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full bg-surface-container border-none rounded-md px-4 py-3 text-on-surface placeholder:text-outline-variant focus:ring-1 focus:ring-primary/40 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-error bg-error-container/20 rounded-md px-4 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary py-3 rounded-md text-sm font-bold uppercase tracking-widest transition-colors hover:bg-primary-dim disabled:opacity-50"
          >
            {loading ? 'جاري الدخول...' : 'دخول'}
          </button>
        </form>
      </div>
    </div>
  )
}
