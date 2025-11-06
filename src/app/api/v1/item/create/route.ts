import { NextResponse } from 'next/server'

import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json(
        { message: 'File tidak ditemukan' },
        { status: 400 }
      )
    }

    // 🔹 Buat nama file unik agar tidak menimpa file lain
    const ext = file.name.split('.').pop()
    const fileName = `item-${Date.now()}.${ext}`

    // 🔹 Upload ke Supabase Storage
    const { data, error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET!)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      })

    if (error) {
      console.error('Supabase upload error:', error)
      return NextResponse.json(
        { message: 'Gagal upload ke Supabase', error: error.message },
        { status: 500 }
      )
    }

    // 🔹 Ambil public URL-nya
    const { data: publicUrlData } = supabase.storage
      .from(process.env.SUPABASE_BUCKET!)
      .getPublicUrl(data.path)

    return NextResponse.json(
      {
        message: 'Upload berhasil',
        url: publicUrlData.publicUrl,
        path: data.path,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error upload:', error)
    return NextResponse.json(
      {
        message: 'Terjadi kesalahan server',
        error: (error as Error).message,
      },
      { status: 500 }
    )
  }
}
