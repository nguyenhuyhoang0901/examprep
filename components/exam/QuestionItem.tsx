"use client"

import { useState } from "react"

export default function QuestionItem({ q, index }: any) {
  const [showAnswer, setShowAnswer] = useState(false)

  return (
    <div className="border rounded-lg p-4 mb-4">
      <p className="font-medium">
        {index}. {q.question}
      </p>

      <ul className="mt-3 space-y-1">
        {q.options.map((opt: any, i: number) => (
          <li key={i} className="text-sm">
            {String.fromCharCode(65 + i)}. {opt.text}
            {showAnswer && opt.correct && (
              <span className="text-green-600 ml-2">✔</span>
            )}
          </li>
        ))}
      </ul>

      <button
        onClick={() => setShowAnswer(!showAnswer)}
        className="mt-3 text-sm text-blue-600 hover:underline"
      >
        {showAnswer ? "Hide answer" : "Show answer"}
      </button>
    </div>
  )
}
