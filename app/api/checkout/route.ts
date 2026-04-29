// app/api/checkout/route.ts

import { PayOS } from "@payos/node"
import { NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"
import { getExamData } from "@/lib/exam/getExamData"      // ✅ thêm
import { getActivePrice } from "@/lib/discount/getActivePrice"  // ✅ thêm

const payos = new PayOS({
  clientId: process.env.PAYOS_CLIENT_ID!,
  apiKey: process.env.PAYOS_API_KEY!,
  checksumKey: process.env.PAYOS_CHECKSUM_KEY!,
})

export async function POST(req: Request) {
  // ✅ Bỏ amount khỏi destructure
  const { providerId, examCode, userId } = await req.json()

  console.log("📦 Checkout request:", { providerId, examCode, userId })

  if (!providerId || !examCode || !userId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  // ✅ Tự lấy giá từ DB — không tin client
  const exam = await getExamData(providerId, examCode)
  const { finalPrice } = getActivePrice(exam)

  console.log("💰 Final price:", finalPrice)

  const orderCode = Number(String(Date.now()).slice(-8))

  await adminDb.collection("pending_orders").doc(String(orderCode)).set({
    userId,
    providerId,
    examCode,
    amount: finalPrice,   // ✅ lưu giá thật
    createdAt: new Date(),
  })

  try {
    const paymentLink = await payos.paymentRequests.create({
      orderCode,
      amount: finalPrice,   // ✅ giá thật từ server
      description: examCode.slice(0, 25),
      cancelUrl: process.env.PAYOS_CANCEL_URL!,
      returnUrl: process.env.PAYOS_RETURN_URL!,
      items: [
        {
          name: String(examCode).slice(0, 25),
          quantity: 1,
          price: finalPrice,  // ✅
        },
      ],
    })

    console.log("✅ Payment link created:", paymentLink.checkoutUrl)
    return NextResponse.json({ url: paymentLink.checkoutUrl })

  } catch (error) {
    await adminDb.collection("pending_orders").doc(String(orderCode)).delete()
    console.error("❌ payOS error:", error)
    return NextResponse.json({ error: "Tạo link thanh toán thất bại" }, { status: 500 })
  }
}
