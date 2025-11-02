import { prisma } from '@/lib/prisma'
import { comparePassword } from '@/lib/bcrypt'
import { serializeBigInt } from '@/lib/serializeBigIntToString'

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()

    if (!username || !password) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const existingUser = await prisma.auth.findUnique({
      where: { username },
      include: {
        user: {
          include: { role: true },
        },
      },
    })

    if (!existingUser) {
      return Response.json({ error: 'Invalid username or password' }, { status: 401 })
    }

    const valid = await comparePassword(password, existingUser.password)

    if (!valid) {
      return Response.json({ error: 'Invalid username or password' }, { status: 401 })
    }

    // Tentukan pesan tambahan jika role masih null
    const role = existingUser.user?.role?.role_name || null
    const role_status = !role ? 'Permission needs to be confirmed by admin' : null

    return Response.json(
      {
        message: 'Login successful',
        data: {
          id: serializeBigInt(existingUser.user_id),
          username: existingUser.username,
          email: existingUser.user?.email,
          role: existingUser.user?.role?.role_name,
          role_status,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    // const message = reason instanceof Error ? reason.message : 'Unexpected error'
    console.error('Login error:', error)
    return Response.json({ error: 'Internal server error', status: 500 }, { status: 500 })
  }
}
