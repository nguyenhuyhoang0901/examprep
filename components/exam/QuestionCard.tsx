"use client"

import { useState, useEffect } from "react"

type Option = {
  text: string
  correct: boolean
}

type Question = {
  id: number | string
  question: string // ⚠️ HTML string
  image?: string
  options: Option[]
}

type Props = {
  index: number
  question: Question
  showAllAnswers?: boolean
  onAnswered?: () => void
}

export default function QuestionCard({
  index,
  question,
  showAllAnswers = false,
  onAnswered,
}: Props) {
  const [selected, setSelected] = useState<number[]>([])
  const [showAnswer, setShowAnswer] = useState(false)

  const isMulti =
    question.options.filter(o => o.correct).length > 1

  /* sync showAll */
  useEffect(() => {
    setShowAnswer(showAllAnswers)
  }, [showAllAnswers])

  const onSelect = (oi: number) => {
    setSelected(prev => {
      let next: number[]
      if (isMulti) {
        next = prev.includes(oi)
          ? prev.filter(x => x !== oi)
          : [...prev, oi]
      } else {
        next = [oi]
      }
      setTimeout(() => onAnswered?.(), 0) //onAnswered?.()
      return next
    })
  }

  const getOptionClass = (oi: number) => {
    if (!showAnswer) {
      return selected.includes(oi)
        ? "bg-blue-50 border-blue-400"
        : ""
    }

    if (selected.includes(oi) && question.options[oi].correct)
      return "bg-green-100 border-green-500"

    if (selected.includes(oi) && !question.options[oi].correct)
      return "bg-red-100 border-red-500"

    if (!selected.includes(oi) && question.options[oi].correct)
      return "bg-blue-100 border-blue-500"

    return ""
  }

  return (
    <div
      id={`q-${index}`}
      className="border rounded-lg p-4 mb-6 scroll-mt-20 bg-white"
    >
      <h3 className="font-semibold mb-2">
        Question {index}
      </h3>

      {/* ✅ QUESTION HTML (img, br, etc.) */}
      <div
        className="mb-4 prose max-w-none text-sm"
        dangerouslySetInnerHTML={{
          __html: question.question,
        }}
      />

      {/* (optional) legacy image field */}
      {question.image && (
        <img
          src={question.image}
          alt={`Question ${index}`}
          className="mb-4 rounded max-w-full"
        />
      )}

      <ul className="space-y-2">
        {question.options.map((opt, i) => {
          const checked = selected.includes(i)
      
          return (
            <li
              key={i}
              onClick={() => onSelect(i)}
              className={`
                p-3 border rounded cursor-pointer
                flex gap-3 items-start
                hover:bg-gray-50
                ${getOptionClass(i)}
              `}
            >
              {/* 🔘 RADIO / CHECKBOX */}
              <input
                type={isMulti ? "checkbox" : "radio"}
                checked={checked}
                readOnly
                className="mt-1 pointer-events-none"
              />
      
              {/* OPTION LABEL */}
              <div className="flex gap-2">
                <span className="font-semibold">
                  {String.fromCharCode(65 + i)}.
                </span>
      
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: opt.text,
                  }}
                />
              </div>
            </li>
          )
        })}
      </ul>

      <button
        onClick={() => setShowAnswer(v => !v)}
        className="mt-3 px-3 py-1 text-sm rounded bg-gray-600 text-white"
      >
        {showAnswer ? "Hide answer" : "Show answer"}
      </button>
    </div>
  )
}
