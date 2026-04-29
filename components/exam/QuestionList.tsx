"use client"

import QuestionItem from "./QuestionItem"

export default function QuestionList({
  questions,
  page,
}: {
  questions: any[]
  page: number
}) {
  const start = (page - 1) * 20
  const pageQuestions = questions.slice(start, start + 20)

  return (
    <>
      {pageQuestions.map((q, i) => (
        <QuestionItem
          key={q.id}
          q={q}
          index={start + i + 1}
        />
      ))}
    </>
  )
}
