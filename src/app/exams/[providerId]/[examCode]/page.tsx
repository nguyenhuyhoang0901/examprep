import { getExamData } from "@/lib/exam/getExamData"
import { getPreviewQuestions } from "@/lib/exam/getPreviewQuestions"
import QuestionCard from "@/components/exam/QuestionCard"
import BuyButton from "@/components/exam/BuyButton"
import ExamClient from "@/components/exam/ExamClient"
import { notFound } from "next/navigation"
import { getActivePrice } from "@/lib/discount/getActivePrice" 

type ExamPageProps = {
  params: Promise<{
    providerId: string
    examCode: string
  }>
}

export default async function ExamPage({ params }: ExamPageProps) {
  const { providerId, examCode } = await params
  if (!providerId || !examCode) notFound()

  const exam = await getExamData(providerId, examCode)
  const previewQuestions = await getPreviewQuestions(
    providerId,
    examCode,
    30
  )
  
  const { finalPrice, isOnSale, originalPrice } = getActivePrice(exam)

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {exam.title}
      </h1>

      {/* ⚠️ Preview KHÔNG render ở server */}
      {/* Preview / Full sẽ do ExamClient quyết định */}

      <ExamClient
        providerId={providerId}
        examCode={examCode}
        price={exam.price}
        finalPrice={finalPrice} 
        isOnSale={isOnSale}
        totalQuestions={exam.totalQuestions}
        previewQuestions={previewQuestions}
      />
    </main>
  )
  /*
  const previewQuestions = await getPreviewQuestions(
    providerId,
    examCode,
    30
  )

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{exam.title}</h1>

      <h2 className="font-semibold mb-4">Preview Questions</h2>

      {previewQuestions.map((q, i) => (
        <QuestionCard
          key={q.id}
          index={i + 1}
          question={q}
        />
      ))}

      <ExamClient
        providerId={providerId}
        examCode={examCode}
        price={exam.price}
      />
    </main>
  )
  */
}
