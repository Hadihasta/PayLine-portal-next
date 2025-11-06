import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { serializeBigInt } from '@/lib/serializeBigIntToString'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const menu_id = searchParams.get('menu_id')

    // 🧩 Validasi
    if (!menu_id) {
      return NextResponse.json(
        { message: 'menu_id wajib disertakan di query parameter' },
        { status: 400 }
      )
    }

    // 🧩 Ambil semua item berdasarkan menu_id
    const items = await prisma.item.findMany({
      where: { menu_id: BigInt(menu_id) },
      orderBy: { created_at: 'desc' }, // opsional, urut terbaru
    })

    if (items.length === 0) {
      return NextResponse.json(
        { message: 'Belum ada item untuk menu ini', data: [] },
        { status: 200 }
      )
    }

    return NextResponse.json(
      {
        message: 'Berhasil mengambil semua item',
        data: serializeBigInt(items),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error GET item:', error)
    return NextResponse.json(
      {
        message: 'Terjadi kesalahan server',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
