import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// uset id need to be string
export async function GET(req: Request, context: { params: Promise<{ userId: string }> }) {
  try {
    // Harus di-await di Next.js 15+
    const { userId } = await context.params

    const stores = await prisma.store.findMany({
      where: {
        usersStores: {
          some: {
            user_id: BigInt(userId),
          },
        },
      },
      include: {
        usersStores: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json({ success: true, data: stores })
  } catch (error) {
    console.error('error get store', error)
    return NextResponse.json({ success: false, message: 'Failed to get store' }, { status: 500 })
  }
}
