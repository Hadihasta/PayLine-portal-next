import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { serializeBigInt } from '@/lib/serializeBigIntToString'

export async function GET(
  req: Request,
  context: { params: Promise<{ storeId: string }> }
) {
  try {
    const { storeId } = await context.params

    if (!storeId) {
      return NextResponse.json(
        { message: 'storeId wajib diisi' },
        { status: 400 }
      )
    }

    // Ambil 1 data meja terakhir berdasarkan table_number terbesar
    const lastTable = await prisma.storeTable.findFirst({
      where: { store_id: BigInt(storeId) },
      orderBy: { table_number: 'desc' }, // pastikan field ini bisa diurutkan
    })

    if (!lastTable) {
      return NextResponse.json({
        message: 'Belum ada meja di store ini',
        data: null,
      })
    }

    return NextResponse.json({
      message: 'Berhasil mengambil meja terakhir',
      data: serializeBigInt(lastTable),
    })
  } catch (error) {
    console.error('Error get last store table:', error)
     return NextResponse.json(
      { success: false, message: 'Failed to get data' },
      { status: 500 }
    )
  }
}
