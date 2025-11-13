import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@supabase/supabase-js'
import QRCode from 'qrcode'
import { serializeBigInt } from '@/lib/serializeBigIntToString'

// Inisialisasi Supabase pakai service role key (hanya untuk server)
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { store_id, table_number } = body

    if (!store_id || !table_number) {
      return NextResponse.json({ message: 'store_id dan table_number wajib diisi' }, { status: 400 })
    }

    // 1️⃣ Buat dulu data tabel di database
    const newTable = await prisma.storeTable.create({
      data: {
        store_id: BigInt(store_id),
        table_number,
        qr_code: `temp-${store_id}-${table_number}-${Date.now()}`, // nanti diupdate setelah QR-nya diupload
      },
    })

    // 2️⃣ Generate URL yang akan disematkan di QR code
    const qrTargetUrl = `${process.env.NEXT_PUBLIC_API_URL}/menu/${newTable.id}`

    // 3️⃣ Generate QR code jadi buffer (gambar PNG)
    const qrBuffer = await QRCode.toBuffer(qrTargetUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    })

    // 4️⃣ Upload hasil QR ke Supabase Storage (bucket public)
    const fileName = `qr-${store_id}-${table_number}-${Date.now()}.png`
    // const { data: uploadData, error: uploadError } = await supabase.storage
    //   .from(process.env.SUPABASE_BUCKET_QR!) // misal bucket-nya bernama 'qrcodes'
    //   .upload(fileName, qrBuffer, {
    //     contentType: 'image/png',
    //     cacheControl: '3600',
    //     upsert: false,
    //   })

    // if (uploadError) {
    //   console.error('Upload error:', uploadError)
    //   return NextResponse.json({ message: 'Gagal upload QR ke Supabase', error: uploadError.message }, { status: 500 })
    // }

    // 5️⃣ Ambil public URL
    // const { data: publicUrlData } = supabase.storage.from(process.env.SUPABASE_BUCKET_QR!).getPublicUrl(uploadData.path)

    // const qrPublicUrl = publicUrlData.publicUrl

    // 6️⃣ Update field `qr_code` di database
    // const updatedTable = await prisma.storeTable.update({
    //   where: { id: newTable.id },
    //   data: { qr_code: qrPublicUrl },
    // })

    return NextResponse.json(
      {
        message: 'Store table berhasil dibuat dan QR code terupload',
        data: serializeBigInt({
          // ...updatedTable,
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
