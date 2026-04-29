"use client"
import { useState, useCallback, useEffect, useRef } from "react"
import QuestionCard from "./QuestionCard"

export default function ExamQuestions({
  questions,
  allQuestions = [],
  page,
  pageSize,
  onPageChange,
}: {
  questions: any[]
  allQuestions?: any[]
  page: number
  pageSize: number
  onPageChange?: (page: number) => void  // 👈 callback đổi page từ ExamClient
}) {
  const [showAll, setShowAll] = useState(false)
  const [answered, setAnswered] = useState<Set<string | number>>(new Set())
  const [search, setSearch] = useState("")
  const pendingScrollId = useRef<string | number | null>(null)

  const fullList = allQuestions.length > 0 ? allQuestions : questions
  const startIndex = (page - 1) * pageSize

  const normalizeText = (html: string): string => {
    if (typeof window === "undefined") return html.toLowerCase()
    const tmp = document.createElement("div")
    tmp.innerHTML = html
    return (
      tmp.textContent
        ?.toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim() ?? ""
    )
  }

  const isSearching = search.trim().length > 0
  const searchResults = isSearching
    ? fullList.filter(
        (q) =>
          normalizeText(q.question).includes(normalizeText(search)) ||
          q.options?.some((o: any) =>
            normalizeText(o.text).includes(normalizeText(search))
          )
      )
    : []

  const displayedQuestions = isSearching ? searchResults : questions

  const handleAnswered = useCallback((id: string | number) => {
    setAnswered((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  // Sau khi questions (page mới) load xong → scroll đến câu đang pending
  useEffect(() => {
    if (pendingScrollId.current === null) return
    const qId = pendingScrollId.current
    pendingScrollId.current = null
    setTimeout(() => {
      document
        .querySelector(`[data-qid="${qId}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }, [questions]) // trigger khi questions thay đổi (page mới load)

  const scrollToQuestion = (qId: string | number) => {
    // Nếu đang search → clear search trước
    if (isSearching) {
      setSearch("")
    }

    // Tính câu này thuộc page nào
    const globalIndex = fullList.findIndex((q) => q.id === qId)
    if (globalIndex === -1) return

    const targetPage = Math.floor(globalIndex / pageSize) + 1

    if (targetPage === page) {
      // Câu thuộc page hiện tại → scroll trực tiếp
      setTimeout(() => {
        document
          .querySelector(`[data-qid="${qId}"]`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, isSearching ? 150 : 0)
    } else {
      // Câu thuộc page khác → đổi page, đánh dấu pending scroll
      pendingScrollId.current = qId
      onPageChange?.(targetPage)
    }
  }

  const answeredCount = answered.size

  return (
    <div className="flex gap-6">

      {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0">

        {/* Search bar */}
        <div className="mb-5">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              🔍
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search all questions and answers..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         bg-white shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400
                           hover:text-gray-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1.5 text-center italic">
            {isSearching
              ? `Found ${searchResults.length} / ${fullList.length} questions`
              : `Unsearched`}
          </p>
        </div>

        {/* Controls */}
        <div className="text-center mb-5">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white text-sm
                       hover:bg-gray-800 transition"
          >
            {showAll ? "Hide all answers" : "Show all answers"}
          </button>
        </div>

        {/* Questions */}
        {displayedQuestions.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-sm">No questions match your search.</p>
            <button
              onClick={() => setSearch("")}
              className="mt-3 text-blue-500 text-sm underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          displayedQuestions.map((q, i) => (
            <div key={q.id} data-qid={q.id} className="scroll-mt-20">
              <QuestionCard
                index={
                  isSearching
                    ? fullList.findIndex((x) => x.id === q.id) + 1
                    : startIndex + i + 1
                }
                question={q}
                showAllAnswers={showAll}
                onAnswered={() => handleAnswered(q.id)}
              />
            </div>
          ))
        )}
      </div>

      {/* ── NAVIGATOR ────────────────────────────────────────────────── */}
      <div
        className="hidden lg:block w-44 flex-shrink-0"
        style={{ alignSelf: "flex-start", position: "sticky", top: "80px" }}
      >
        <div
          className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm
                      max-h-[80vh] overflow-y-auto"
        >
          <p className="text-xs font-semibold text-gray-500 mb-2 text-center tracking-wide uppercase">
            📌 Navigator
          </p>

          {/* Progress */}
          <div className="mb-3">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Answered</span>
              <span>{answeredCount} / {fullList.length}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div
                className="bg-green-400 h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: fullList.length
                    ? `${(answeredCount / fullList.length) * 100}%`
                    : "0%",
                }}
              />
            </div>
          </div>

          {/* Grid — TẤT CẢ câu */}
          <div className="grid grid-cols-5 gap-1">
            {fullList.map((q, i) => {
              const isAnswered = answered.has(q.id)
              const isCurrentPage = questions.some((pq) => pq.id === q.id)
              const isInSearch = isSearching && searchResults.some((sq) => sq.id === q.id)

              return (
                <button
                  key={q.id}
                  onClick={() => scrollToQuestion(q.id)}
                  title={`Question ${i + 1}`}
                  className={`py-1 text-xs rounded text-center font-medium transition ${
                    isAnswered
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : isInSearch
                      ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      : isCurrentPage
                      ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="mt-3 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-3 h-3 rounded bg-green-100 border border-green-300 inline-block" />
              Answered
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-3 h-3 rounded bg-blue-100 border border-blue-300 inline-block" />
              Search hit
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-3 h-3 rounded bg-gray-200 border border-gray-300 inline-block" />
              Current page
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-3 h-3 rounded bg-gray-50 border border-gray-200 inline-block" />
              Other page
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
