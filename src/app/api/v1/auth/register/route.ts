


export async function POST(req: Request) {
  try {

    const {nama_toko ,  email, phone_number,username , password} = await req.json()



    
    console.log (nama_toko , email, phone_number,username , password)
       return Response.json(
      { message: 'Account created successfully' },
      { status: 201 }
    )
  } catch (reason) {
    const message =
      reason instanceof Error ? reason.message : 'Unexpected error'
 
    return Response.json(message, { status: 500 })
  }
}