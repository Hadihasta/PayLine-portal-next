import { prisma } from "@/lib/prisma"
import { serializeBigInt } from "@/lib/serializeBigIntToString"

export async function POST(req: Request) {
  try {
    const { user_id, store_id, table_id, total_cost } = await req.json()

    // ===== SIMPLE VALIDATION =====
    if (!user_id) {
      return Response.json(
        { error: "user_id is required" },
        { status: 400 }
      )
    }

    if (!store_id) {
      return Response.json(
        { error: "store_id is required" },
        { status: 400 }
      )
    }

    if (!table_id) {
      return Response.json(
        { error: "table_id is required" },
        { status: 400 }
      )
    }

    // ===== CHECK USER EXIST =====
    const user = await prisma.user.findUnique({
      where: { id: BigInt(user_id) },
    })

    if (!user) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // ===== CHECK TABLE EXIST =====
    const table = await prisma.storeTable.findUnique({
      where: { id: BigInt(table_id) },
    })

    if (!table) {
      return Response.json(
        { error: "Table not found" },
        { status: 404 }
      )
    }

    // ===== CHECK STORE MATCH WITH TABLE =====
    if (serializeBigInt(table.store_id) !== String(store_id)) {
      return Response.json(
        { error: "Store ID does not match the table" },
        { status: 400 }
      )
    }

    // ===== CREATE CART =====
    const cart = await prisma.cart.create({
      data: {
        user_id: BigInt(user_id),
        store_id: BigInt(store_id),
        table_id: BigInt(table_id),
        total_cost: total_cost ?? 0,
      },
    })

    return Response.json(
      {
        message: "Cart created successfully",
        data: serializeBigInt(cart),
        status: 201,
      },
      { status: 201 }
    )

  } catch (error) {
    console.error("Create cart error:", error)
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
