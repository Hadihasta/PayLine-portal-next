import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@supabase/supabase-js'
import { serializeBigInt } from '@/lib/serializeBigIntToString'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    // 🧩 Ambil field dari formData
    const menu_id = formData.get('menu_id')?.toString()
    const name = formData.get('name')?.toString()
    const price = formData.get('price')?.toString()
    const category = formData.get('category')?.toString() || null
    const is_active = formData.get('is_active')?.toString()
    const file = formData.get('file') as File | null

    // 🧩 Validasi mandatory fields
    if (!menu_id || !name || !price || !file) {
      return NextResponse.json(
        {
          message: 'menu_id, name, price, dan file wajib diisi',
          missing: {
            menu_id: !menu_id,
            name: !name,
            price: !price,
            file: !file,
          },
        },
        { status: 400 }
      )
    }

    // 🧩 Validasi angka
    if (isNaN(Number(price))) {
      return NextResponse.json(
        { message: 'Price harus berupa angka yang valid' },
        { status: 400 }
      )
    }

    // 🧩 Cek apakah menu_id valid dan ada di DB
    const menu = await prisma.menu.findUnique({
      where: { id: BigInt(menu_id) },
    })

    if (!menu) {
      return NextResponse.json(
        { message: 'Menu tidak ditemukan' },
        { status: 404 }
      )
    }

    // 🔹 Upload file ke Supabase Storage
    const ext = file.name.split('.').pop()
    const fileName = `item-${Date.now()}.${ext}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET!)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      })

    if (uploadError) {
      console.error('Supabase upload error:', uploadError)
      return NextResponse.json(
        { message: 'Gagal upload ke Supabase', error: uploadError.message },
        { status: 500 }
      )
    }

    // 🔹 Ambil public URL dari file yang diupload
    const { data: publicUrlData } = supabase.storage
      .from(process.env.SUPABASE_BUCKET!)
      .getPublicUrl(uploadData.path)

    const image_url = publicUrlData.publicUrl

    // 🧩 Buat item baru di database
    const newItem = await prisma.item.create({
      data: {
        menu_id: BigInt(menu_id),
        name: name.trim(),
        price: BigInt(price),
        category: category,
        is_active: is_active === 'false' ? false : true,
        image_url,
      },
    })

    return NextResponse.json(
      {
        message: 'Item berhasil dibuat dan gambar terupload',
        data: serializeBigInt(newItem),
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error create item:', error)
    return NextResponse.json(
      {
        message: 'Terjadi kesalahan server',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
