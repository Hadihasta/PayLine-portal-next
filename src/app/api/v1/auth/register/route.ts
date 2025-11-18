import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/bcrypt"
import { serializeBigInt } from "@/lib/serializeBigIntToString"

export async function POST(req: Request) {
  try {
    // register for admin
    const { name, email, phone_number, username, password } = await req.json()
// database schema butuh di update
     if (!name || !phone_number || !username || !password) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Cek apakah username atau email sudah terdaftar
    const existingAuth = await prisma.auth.findFirst({
      where: {
        OR: [{ username }, { user: { email } }],
      },
    })

    if (existingAuth) {
      return Response.json({ error: "Username or email already registered" }, { status: 409 })
    }


     // Hash password pakai bcrypt-ts
    const hashedPassword = await hashPassword(password)


      // Buat user baru beserta auth dan store-nya
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone_number,
        auth: {
          create: {
            username,
            password: hashedPassword,
          },
        },
       
      },
      include: {
        auth: true,
      },
    })

    return Response.json(
      {
        message: "Account created successfully",
        data: {
          id: serializeBigInt(newUser.id),
          username: newUser.auth?.username,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    // const message = reason instanceof Error ? reason.message : 'Unexpected error'
      console.error('Login error:', error)
    return Response.json({ error: 'Internal server error' , status: 500 },{ status: 500 } )
  }
}
