import { writeFile } from 'fs/promises'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('font') as File | null

    if (!file) {
      return NextResponse.json({ error: 'لا يوجد ملف' }, { status: 400 })
    }

    // Sanitize filename: keep alphanumeric, dots, dashes, underscores
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
    const ext = sanitizedName.split('.').pop()?.toLowerCase()

    if (!ext || !['ttf', 'woff', 'woff2', 'otf'].includes(ext)) {
      return NextResponse.json({ error: 'صيغة غير مدعومة' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const destPath = path.join(process.cwd(), 'public', 'fonts', sanitizedName)

    await writeFile(destPath, buffer)

    const fontFamily = sanitizedName.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' ')

    return NextResponse.json({
      fontUrl: `/fonts/${sanitizedName}`,
      fontFamily,
    })
  } catch (error) {
    console.error('Font upload error:', error)
    return NextResponse.json({ error: 'فشل الرفع' }, { status: 500 })
  }
}
