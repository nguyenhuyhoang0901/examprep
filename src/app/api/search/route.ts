import { NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export async function GET() {
  try {
    // 1️⃣ Load tất cả providers
    const providersSnap = await adminDb
      .collection("providers")
      .orderBy("order")
      .get()

    const results: {
      providers: { id: string; name: string; slug: string }[]
      exams: { code: string; title: string; providerId: string; providerSlug: string; providerName: string }[]
    } = { providers: [], exams: [] }

    await Promise.all(
      providersSnap.docs.map(async (doc) => {
        const data = doc.data()
        results.providers.push({
          id: doc.id,
          name: data.name ?? doc.id,
          slug: data.slug ?? doc.id,
        })

        // 2️⃣ Load tất cả exams (cả popular true/false)
        const examsSnap = await adminDb
          .collection("providers")
          .doc(doc.id)
          .collection("exams")
          .where("isActive", "==", true)
          .get()

        examsSnap.docs.forEach((e) => {
          const exam = e.data()
          results.exams.push({
            code: exam.code ?? e.id,
            title: exam.title ?? "",
            providerId: doc.id,
            providerSlug: data.slug ?? doc.id,
            providerName: data.name ?? doc.id,
          })
        })
      })
    )

    return NextResponse.json(results, {
      headers: {
        // Cache 5 phút — data ít thay đổi
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    })
  } catch (err) {
    console.error("Search API error:", err)
    return NextResponse.json({ providers: [], exams: [] })
  }
}
