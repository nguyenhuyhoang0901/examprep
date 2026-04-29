import ExamQuestions from "@/components/exam/ExamQuestions"
import QuestionCard from "@/components/exam/QuestionCard"

type Props = {
  questions: any[]
}

export default function PreviewQuestions({ questions }: Props) {
  return (
    <div>
      {questions.map((q, i) => (
        <QuestionCard
          key={q.id}
          index={i + 1}
          question={q}
        />
      ))}
    </div>
  )
}
