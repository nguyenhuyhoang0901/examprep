import { NextResponse } from "next/server"
import { adminDb, adminAuth } from "@/lib/firebase-admin"

const PAGE_SIZE = 20

export async function GET(req: Request) {
  try {
    // 🔐 AUTH
    const authHeader = req.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ requiresLogin: true })
    }

    const token = authHeader.replace("Bearer ", "")
    let decoded
    try {
      decoded = await adminAuth.verifyIdToken(token)
    } catch {
      return NextResponse.json({ requiresLogin: true })
    }

    // 📥 PARAMS
    const { searchParams } = new URL(req.url)
    const providerId = searchParams.get("providerId")
    const examCode = searchParams.get("examCode")

    if (!providerId || !examCode) {
      return NextResponse.json({ questions: [], error: "Missing params" })
    }

    // 🔒 CHECK ORDER
    const orderSnap = await adminDb
      .collection("orders")
      .where("userId", "==", decoded.uid)
      .where("providerId", "==", providerId)
      .where("examCode", "==", examCode)
      .where("status", "==", "paid")
      .orderBy("createdAt", "desc")
      .limit(1)
      .get()

    if (orderSnap.empty) {
      return NextResponse.json({ questions: [], hasAccess: false })
    }

    const order = orderSnap.docs[0].data()
    const expiresAt = order.expiresAt?.toDate()

    // ⏱ EXPIRE
    if (!expiresAt || Date.now() > expiresAt.getTime()) {
      return NextResponse.json({ questions: [], expired: true })
    }

    const questionsRef = adminDb
      .collection("providers")
      .doc(providerId)
      .collection("exams")
      .doc(examCode)
      .collection("questions_full")

    // 📋 CHẾ ĐỘ ALL — trả toàn bộ câu hỏi (cho navigator + search)
    if (searchParams.get("allIds") === "true") {
      const allSnap = await questionsRef.orderBy("id").get()
      const allQuestions = allSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      return NextResponse.json({ allQuestions })
    }

    // 🔢 TOTAL
    const totalSnap = await questionsRef.select().get()
    const totalQuestions = totalSnap.size
    const totalPages = Math.ceil(totalQuestions / PAGE_SIZE)

    const page = Math.max(1, Number(searchParams.get("page") || "1"))

    // ✅ LOAD PAGE
    const snap = await questionsRef
      .orderBy("id")
      .offset((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .get()

    const questions = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json({
      questions,
      page,
      pageSize: PAGE_SIZE,
      totalQuestions,
      totalPages,
      hasPrev: page > 1,
      hasNext: page < totalPages,
    })
  } catch (err) {
    console.error("FULL QUESTIONS ERROR:", err)
    return NextResponse.json({ questions: [], error: "Server error" })
  }
}
