import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma' 
import { serializeBigInt } from '@/lib/serializeBigIntToString'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { menu_id, name, price, category, is_active } = body

    // 🧩 Validasi input
    if (!menu_id || !name || !price) {
      return NextResponse.json(
        { message: 'menu_id, name, dan price wajib diisi' },
        { status: 400 }
      )
    }

    // 🧩 Pastikan menu yang direferensikan ada
    const menu = await prisma.menu.findUnique({
      where: { id: BigInt(menu_id) },
    })

    if (!menu) {
      return NextResponse.json(
        { message: 'Menu tidak ditemukan' },
        { status: 404 }
      )
    }

    // 🧩 Buat item baru
    const newItem = await prisma.item.create({
      data: {
        name,
        price: BigInt(price),
        category: category ?? null,
        is_active: is_active ?? true,
        menu_id: BigInt(menu_id),
      },
    })

    return NextResponse.json(
      { message: 'Item berhasil dibuat', data: serializeBigInt(newItem) },
      { status: 201 }
    )
  } catch  (error) {
    console.error('Error create item:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}