// lib/discount/getActivePrice.ts

type ExamPricing = {
  price: number
  salePrice?: number | null
}

export function getActivePrice(exam: ExamPricing): {
  finalPrice: number
  isOnSale: boolean
  originalPrice: number
} {
  // Giờ Việt Nam (UTC+7)
  // ✅ FAKE DATE ĐỂ TEST — xóa sau khi test xong
  //const now = new Date("2025-04-04T10:00:00+07:00") // giả lập ngày 4/4
  const now = new Date(Date.now() + 7 * 60 * 60 * 1000)
  const day = now.getUTCDate()
  const month = now.getUTCMonth() + 1

  const isSpecialDay = day === month  // 1/1, 2/2, ... 12/12

  const isOnSale = isSpecialDay && !!exam.salePrice

  return {
    finalPrice: isOnSale ? exam.salePrice! : exam.price,
    isOnSale,
    originalPrice: exam.price,
  }
}
