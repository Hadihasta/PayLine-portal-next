import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@supabase/supabase-js'
import QRCode from 'qrcode'
import { serializeBigInt } from '@/lib/serializeBigIntToString'
import { generateSlug } from '@/lib/generateSlug'

// Supabase service key (server only)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { store_id, table_number } = body

    if (!store_id || !table_number) {
      return NextResponse.json(
        { message: 'store_id dan table_number wajib diisi' },
        { status: 400 }
      )
    }

    // 1️⃣ Generate SLUG unik
    let slug = generateSlug()

    // pastikan slug tidak duplicate
    while (true) {
      const exists = await prisma.storeTable.findUnique({
        where: { slug },
      })
      if (!exists) break
      slug = generateSlug()
    }

    // 2️⃣ Simpan store table dengan slug
    const newTable = await prisma.storeTable.create({
      data: {
        store_id: BigInt(store_id),
        table_number,
        slug,
        qr_code: 'temp', // akan diupdate nanti
      },
    })

    // 3️⃣ URL untuk dimasukkan ke QR
    const qrTargetUrl = `${process.env.QR_GENERATE_URL}/menu/${slug}`

    // 4️⃣ Generate QR sebagai buffer
    const qrBuffer = await QRCode.toBuffer(qrTargetUrl, {
      width: 400,
      margin: 2,
    })

    // 5️⃣ Upload QR ke Supabase Storage
    const fileName = `qr-${slug}-${Date.now()}.png`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET_QR!)
      .upload(fileName, qrBuffer, {
        contentType: 'image/png',
        cacheControl: '3600',
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json(
        { message: 'Gagal upload QR ke Supabase', error: uploadError.message },
        { status: 500 }
      )
    }

    // 6️⃣ Ambil public URL
    const { data: publicUrlData } = supabase.storage
      .from(process.env.SUPABASE_BUCKET_QR!)
      .getPublicUrl(uploadData.path)

    const qrPublicUrl = publicUrlData.publicUrl

    // 7️⃣ Update record dengan QR final
    const updatedTable = await prisma.storeTable.update({
      where: { id: newTable.id },
      data: { qr_code: qrPublicUrl },
    })

    return NextResponse.json(
      {
        message: 'Store table berhasil dibuat',
        data: serializeBigInt({
          ...updatedTable,
          slug,
          qr_target: qrTargetUrl,
        }),
      },
      { status: 201 }
    )
  } catch (err) {
    console.error('Error creating store table:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
