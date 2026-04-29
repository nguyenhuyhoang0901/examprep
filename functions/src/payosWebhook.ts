import { onRequest } from "firebase-functions/https"
import * as crypto from "crypto"
import { adminDb } from "./firebase-admin"

const PAYOS_CHECKSUM_KEY = functions.config().payos.checksum
const VIEW_DURATION_MS = 10* 60 * 1000

export const payosWebhook = onRequest(async (req, res) => {
  async (req, res) => {
    try {
      if (req.method !== "POST") {
        return res.status(405).send("Method Not Allowed")
      }

      const { data, signature } = req.body
      if (!data || !signature) {
        return res.status(400).send("Invalid payload")
      }

      // 1️⃣ VERIFY SIGNATURE
      const rawData = JSON.stringify(data)
      const expectedSignature = crypto
        .createHmac("sha256", PAYOS_CHECKSUM_KEY)
        .update(rawData)
        .digest("hex")

      if (expectedSignature !== signature) {
        console.error("❌ Invalid signature")
        return res.status(401).send("Invalid signature")
      }

      // 2️⃣ PARSE ORDER
      const { orderCode, amount, description } = data
      const [userId, providerId, examCode] =
        description.split("|")

      // 3️⃣ IDEMPOTENT CHECK
      const snap = await adminDb
        .collection("orders")
        .where("orderCode", "==", orderCode)
        .limit(1)
        .get()

      if (!snap.empty) {
        return res.status(200).send("Already processed")
      }

      // 4️⃣ GET EXAM
      const examRef = adminDb
        .collection("providers")
        .doc(providerId)
        .collection("exams")
        .doc(examCode)

      const examSnap = await examRef.get()
      if (!examSnap.exists) {
        throw new Error("Exam not found")
      }

      const exam = examSnap.data()!

      // 5️⃣ CREATE ORDER
      await adminDb.collection("orders").add({
        userId,
        providerId,
        examCode,
        examTitle: exam.title,
        orderCode,
        amount,
        status: "paid",
        createdAt: new Date(),
        expiresAt: new Date(now + VIEW_DURATION_MS),
      })

      return res.status(200).json({ success: true })
    } catch (err) {
      console.error("payOS webhook error:", err)
      return res.status(500).send("Server error")
    }
  }
)
