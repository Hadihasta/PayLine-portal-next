import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { serializeBigInt } from '@/lib/serializeBigIntToString' // opsional kalau kamu sudah punya helper ini

// GET /api/v1/store-table/get-by-store/[storeId]
export async function GET(
  req: Request,
  context: { params: Promise<{ storeId: string }> }
) {
  try {
    // Ambil storeId dari dynamic route
    const { storeId } = await context.params

    if (!storeId) {
      return NextResponse.json(
        { message: 'storeId wajib disertakan di URL' },
        { status: 400 }
      )
    }

    // Ambil semua meja berdasarkan store_id
    const storeTables = await prisma.storeTable.findMany({
      where: { store_id: BigInt(storeId) },
      orderBy: { created_at: 'asc' },
    })

    if (storeTables.length === 0) {
      return NextResponse.json(
        { message: 'Belum ada meja untuk store ini', data: [] },
        { status: 200 }
      )
    }

    // Jika kamu punya BigInt di field (id, store_id), ubah ke string biar tidak error di Next.js
    const serializedData = serializeBigInt
      ? serializeBigInt(storeTables)
      : storeTables

    return NextResponse.json(
      {
        message: 'Berhasil mengambil data meja',
        data: serializedData,
      },
      { status: 200 }
    )
  } catch (err) {
    console.error('Error get store tables:', err)
    return NextResponse.json(
      { success: false, message: 'Failed to get data' },
      { status: 500 }
    )
  }
}
