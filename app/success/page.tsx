import { db } from "@/lib/firebase"
import { doc, updateDoc, arrayUnion } from "firebase/firestore"
import { redirect } from "next/navigation"

type SuccessPageProps = {
  searchParams: Promise<{
    vnp_OrderInfo?: string
    vnp_ResponseCode?: string
  }>
}

export default async function Success({ searchParams }: SuccessPageProps) {
  const params = await searchParams

  // VNPay success = 00
  if (params.vnp_ResponseCode !== "00") {
    redirect("/payment-failed")
  }

  if (!params.vnp_OrderInfo) {
    throw new Error("Missing vnp_OrderInfo")
  }

  const [userId, courseId] = params.vnp_OrderInfo.split("|")

  if (!userId || !courseId) {
    throw new Error("Invalid OrderInfo format")
  }

  await updateDoc(doc(db, "users", userId), {
    courses: arrayUnion(courseId),
  })

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold text-green-600">
        Thanh toán thành công 🎉
      </h1>
    </div>
  )
}
