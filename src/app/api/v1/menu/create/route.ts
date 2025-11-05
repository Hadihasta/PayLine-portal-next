import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma' 
import { serializeBigInt } from '@/lib/serializeBigIntToString'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // default namanya general
    const { store_id, name = 'general' } = body

    // Validasi input
    if (!store_id || !name) {
      return NextResponse.json(
        { message: 'store_id dan name wajib diisi' },
        { status: 400 }
      )
    }

    // Pastikan store ada
    const store = await prisma.store.findUnique({
      where: { id: BigInt(store_id) },
    })

    if (!store) {
      return NextResponse.json(
        { message: 'Store tidak ditemukan' },
        { status: 404 }
      )
    }

    // Cek apakah menu dengan nama yang sama sudah ada di store tersebut
    const existingMenu = await prisma.menu.findFirst({
      where: {
        store_id: BigInt(store_id),
        name: name,
      },
    })

    if (existingMenu) {
      return NextResponse.json(
        { message: 'Menu dengan nama tersebut sudah ada untuk store ini', data: serializeBigInt(existingMenu )},
        { status: 200 }
      )
    }

    // Jika belum ada, buat menu baru
    const newMenu = await prisma.menu.create({
      data: {
        name,
        store_id: BigInt(store_id),
      },
    })

    return NextResponse.json(
      { message: 'Menu baru berhasil dibuat', data: serializeBigInt(newMenu) },
      { status: 201 }
    )
  } catch  (error) {
    console.error('Error create menu:', error)
      return NextResponse.json({  message: 'Failed Create Menu' }, { status: 500 })
  }
}
