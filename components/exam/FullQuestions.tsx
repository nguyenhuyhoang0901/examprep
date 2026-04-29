import ExamQuestions from "@/components/exam/ExamQuestions"

type Option = {
  text: string
  correct: boolean
}

type Question = {
  id: string | number
  question: string
  image?: string
  options: Option[]
}

type Props = {
  questions?: Question[]
  allQuestions?: Question[]
  page: number
  pageSize: number
  onPageChange?: (page: number) => void  // 👈 pass xuống ExamQuestions
}

export default function FullQuestions({
  questions = [],
  allQuestions = [],
  page,
  pageSize,
  onPageChange,
}: Props) {
  if (questions.length === 0) {
    return <p className="text-gray-500">No questions available.</p>
  }

  return (
    <div>
      <h2 className="font-semibold mb-4">Full Questions</h2>
      <ExamQuestions
        questions={questions}
        allQuestions={allQuestions}
        page={page}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  )
}
