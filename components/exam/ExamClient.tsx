"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth/AuthProvider"
import BuyButton from "./BuyButton"
import FullQuestions from "./FullQuestions"
import QuestionCard from "./QuestionCard"

const PAGE_SIZE = 20

type Props = {
  providerId: string
  examCode: string
  price: number
  finalPrice: number
  isOnSale: boolean
  totalQuestions?: number
  previewQuestions: any[]
}

export default function ExamClient({
  providerId,
  examCode,
  price,
  finalPrice,
  isOnSale,
  previewQuestions,
  totalQuestions,
}: Props) {
  const { user, loading } = useAuth()

  const [questions, setQuestions] = useState<any[] | null>(null)
  const [allQuestions, setAllQuestions] = useState<any[]>([])
  const [preview, setPreview] = useState<any[] | null>(null)

  const [page, setPage] = useState(1)
  const [pageInput, setPageInput] = useState("")
  const [meta, setMeta] = useState<{
    page: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  } | null>(null)

  const isNotPurchased = questions === null || questions.length === 0
  const previewList = preview ?? previewQuestions

  const clampPage = (value: number) => {
    if (!meta) return 1
    return Math.min(meta.totalPages, Math.max(1, value))
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [page])

  // 🔹 FETCH PAGE (20 câu)
  useEffect(() => {
    if (!user) return

    const load = async () => {
      const token = await user.getIdToken()
      const res = await fetch(
        `/api/full-questions?providerId=${providerId}&examCode=${examCode}&page=${page}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const data = await res.json()

      if (data.expired) {
        setQuestions(null)
        setPreview(previewQuestions)
        return
      }
      if (data.hasAccess === false) {
        setQuestions(null)
        setPreview(previewQuestions)
        return
      }

      setQuestions(Array.isArray(data.questions) ? data.questions : [])
      setPreview(null)
      setMeta({
        page: data.page,
        totalPages: data.totalPages,
        hasNext: data.hasNext,
        hasPrev: data.hasPrev,
      })
      setPageInput(String(data.page))
    }

    load()
  }, [user, providerId, examCode, page])

  // 🔹 FETCH ALL (1 lần — cho navigator + search)
  useEffect(() => {
    if (!user) return

    const loadAll = async () => {
      const token = await user.getIdToken()
      const res = await fetch(
        `/api/full-questions?providerId=${providerId}&examCode=${examCode}&allIds=true`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const data = await res.json()
      if (Array.isArray(data.allQuestions)) {
        setAllQuestions(data.allQuestions)
      }
    }

    loadAll()
  }, [user, providerId, examCode])

  if (loading) return null

  // ❌ Chưa login
  if (!user) {
    return (
      <>
        <h2 className="font-semibold mb-4">Preview Questions</h2>
        {previewList.map((q, i) => (
          <QuestionCard key={`preview-${q.id ?? i}`} index={i + 1} question={q} />
        ))}
        <p className="mt-6 text-center text-gray-500">
          🔒 Log in and purchase to unlock all {totalQuestions} questions
        </p>
      </>
    )
  }

  // ❌ Chưa mua
  if (isNotPurchased) {
    return (
      <>
        <h2 className="font-semibold mb-4">Preview Questions</h2>
        {previewList.map((q, i) => (
          <QuestionCard key={`preview-${q.id ?? i}`} index={i + 1} question={q} />
        ))}
        <div className="mt-8 p-6 border rounded text-center">
          <p className="mb-4 text-gray-600">
            🔒 Purchase to unlock all {totalQuestions} questions
          </p>
          <BuyButton
            providerId={providerId}
            examCode={examCode}
            price={price}
            finalPrice={finalPrice}
            isOnSale={isOnSale}
          />
        </div>
      </>
    )
  }

  // ✅ ĐÃ MUA
  return (
    <>
      <FullQuestions
        questions={questions}
        allQuestions={allQuestions}
        page={page}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}  // 👈 truyền setPage xuống
      />

      {/* PAGINATION */}
      {meta && (
        <div className="flex flex-wrap justify-between items-center gap-4 mt-6">
          <button
            disabled={!meta.hasPrev}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 rounded bg-gray-100 text-black disabled:opacity-50"
          >
            Previous
          </button>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Page</span>
            <input
              type="number"
              min={1}
              max={meta.totalPages}
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              onBlur={() => {
                const num = Number(pageInput)
                if (!Number.isNaN(num)) setPage(clampPage(num))
                else setPageInput(String(meta.page))
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const num = Number(pageInput)
                  if (!Number.isNaN(num)) setPage(clampPage(num))
                }
              }}
              className="w-16 px-2 py-1 border rounded text-center"
            />
            <span>/ {meta.totalPages}</span>
          </div>

          <button
            disabled={!meta.hasNext}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 rounded bg-gray-100 text-black disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  )
}
