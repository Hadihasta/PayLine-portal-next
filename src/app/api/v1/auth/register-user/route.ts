import { prisma } from "@/lib/prisma";
import { serializeBigInt } from "@/lib/serializeBigIntToString";
import { signToken } from "@/lib/jwt";


// register menggunakan nama saja dan generate token
export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name) {
      return Response.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    // Create user
    const newUser = await prisma.user.create({
      data: { name },
    });


    const payload = {
      id: serializeBigInt(newUser.id),
      name: newUser.name,
    };

    const token = signToken(payload);

    return Response.json(
      {
        message: "User created successfully",
        data: {
          id: serializeBigInt(newUser.id),
          name: newUser.name,
        },
        token, 
        status: 201
      },
    );

  } catch (error) {
    console.error("Create user error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
