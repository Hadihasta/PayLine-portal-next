import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@supabase/supabase-js'
import QRCode from 'qrcode'
import { serializeBigInt } from '@/lib/serializeBigIntToString'
import { generateSlug } from '@/lib/generateSlug'

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

    // -----------------------------
    // 1) Generate unique slug
    // -----------------------------
    let slug = generateSlug()

    while (true) {
      const exists = await prisma.storeTable.findUnique({
        where: { slug },
      })
      if (!exists) break
      slug = generateSlug()
    }

    // -----------------------------
    // 2) Create StoreTable TEMP DATA
    // -----------------------------
    const newTable = await prisma.storeTable.create({
      data: {
        store_id: BigInt(store_id),
        table_number,
        slug,
        qr_code: 'temp', // update later
      },
    })

    // -----------------------------
    // 3) Generate QR URL
    // -----------------------------
    const qrTargetUrl = `${process.env.QR_GENERATE_URL}/menu/${slug}`

    // -----------------------------
    // 4) Generate QR Image Buffer
    // -----------------------------
    const qrBuffer = await QRCode.toBuffer(qrTargetUrl, {
      width: 400,
      margin: 2,
    })

    // -----------------------------
    // 5) Upload QR to Supabase
    // -----------------------------
    const fileName = `qr-${slug}-${Date.now()}.png`
    const bucket = process.env.SUPABASE_BUCKET_QR!

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
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

    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(uploadData.path)

    const qrPublicUrl = publicUrlData.publicUrl

    // -----------------------------
    // 6) Update StoreTable with final QR URL
    // -----------------------------
    const updatedTable = await prisma.storeTable.update({
      where: { id: newTable.id },
      data: { qr_code: qrPublicUrl },
    })

    // -----------------------------
    // 7) Create Default Cart for This Table
    // -----------------------------
    const newCart = await prisma.cart.create({
      data: {
        store_id: BigInt(store_id),
        table_id: updatedTable.id,
        user_id: null,        // user belum ada → pakai NULL
        total_cost: 0,
      },
    })

    // -----------------------------
    // 8) Respond
    // -----------------------------
    return NextResponse.json(
      {
        message: 'Store table & default cart berhasil dibuat',
        data: serializeBigInt({
          table: updatedTable,
          cart: newCart,
          slug,
          qr_target: qrTargetUrl,
          qr_url: qrPublicUrl,
        }),
      },
      { status: 201 }
    )
  } catch (err) {
    console.error('Error creating store table:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
