// /app/api/stores/route.ts

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { serializeBigInt } from '@/lib/serializeBigIntToString'

export async function POST(req: Request) {
  try {
    const { user_id, name } = await req.json()

    // 1️⃣ Buat Store baru
    const store = await prisma.store.create({
      data: {
        name,
        // created_at dan updated_at otomatis karena @default(now())
        usersStores: {
          create: {
            user: { connect: { id: BigInt(user_id) } }
          }
        }
      },
      include: {
        usersStores: {
          include: {
            user: true
          }
        }
      }
    })

    return NextResponse.json({ success: true, data: serializeBigInt(store) })
  } catch (error) {
    console.error('Error creating store:', error)
    return NextResponse.json({ success: false, message: 'Failed to create store' }, { status: 500 })
  }
}
