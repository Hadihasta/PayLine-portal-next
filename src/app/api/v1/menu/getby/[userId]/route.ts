import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { serializeBigInt } from '@/lib/serializeBigIntToString'

// GET /api/menu/[userId]
export async function GET(
  req: Request,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params

    const menuIds = await prisma.menu.findFirst({
      where: {
        store: {
          usersStores: {
            some: {
              user_id: BigInt(userId),
            },
          },
        },
      },
      select: {
        id: true,
      },
    })

    return NextResponse.json({
    
      data: serializeBigInt(menuIds),
    })
  } catch (error) {
    console.error('Error getting menu IDs by user ID:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to get menu IDs by user ID' },
      { status: 500 }
    )
  }
}
