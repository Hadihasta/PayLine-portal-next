import { prisma } from "@/lib/prisma"
import { serializeBigInt } from "@/lib/serializeBigIntToString"

export async function POST(req: Request) {
  try {
    const { name } = await req.json()

    if (!name) {
      return Response.json(
        { error: "Name is required" },
        { status: 400 }
      )
    }

    // Create user record
    const newUser = await prisma.user.create({
      data: {
        name,
      },
    })

    return Response.json(
      {
        message: "Customer created successfully",
        data: {
          id: serializeBigInt(newUser.id),
          name: newUser.name,
        },
      },
      { status: 201 }
    )

  } catch (error) {
    console.error("Create customer error:", error)
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
