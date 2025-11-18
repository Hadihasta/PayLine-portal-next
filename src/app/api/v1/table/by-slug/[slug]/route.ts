import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { serializeBigInt } from '@/lib/serializeBigIntToString'

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = await params

    const table = await prisma.storeTable.findUnique({
      where: { slug },
      include: {
        store: true,  // optional jika kamu ada relasi
      },
    })

    if (!table) {
      return NextResponse.json(
        { message: 'Slug tidak ditemukan' },
        { status: 404 }
      )
    }

    // ambil menu berdasarkan store_id
    const menus = await prisma.menu.findFirst({
      where: {
        store_id: table.store_id,
      },
      include: {
    items: true   
  },
    })

    return NextResponse.json(
      serializeBigInt({
        table,
        menus,
      }),
      { status: 200 }
    )

  } catch (err) {
    console.error('GET SLUG ERROR:', err)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
