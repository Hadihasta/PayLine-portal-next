import { prisma } from '@/lib/prisma'
import { serializeBigInt } from '@/lib/serializeBigIntToString'

export async function POST(req: Request) {
  try {
    const { role_name } = await req.json()

    // Validasi input
    if (!role_name) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Cek apakah role sudah ada
   const existingRole = await prisma.role.findFirst({
  where: { role_name },
})

    if (existingRole) {
      return Response.json({ error: 'Role already exists' }, { status: 409 })
    }

    // Buat role baru
    const newRole = await prisma.role.create({
      data: { role_name },
    })

    return Response.json(
      {
        message: 'Role created successfully',
        data: {
          id: serializeBigInt(newRole.id),
          role_name: newRole.role_name,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create role error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
