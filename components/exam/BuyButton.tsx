"use client"

import { useAuth } from "@/components/auth/AuthProvider"

type Props = {
  providerId: string
  examCode: string
  price: number       // giá gốc — chỉ để hiển thị gạch ngang
  finalPrice: number  // ✅ thêm
  isOnSale: boolean   // ✅ thêm
}

export default function BuyButton({ providerId, examCode, price, finalPrice, isOnSale }: Props) {
  const { user, loading } = useAuth()

  if (loading) return null

  if (!user) {
    return (
      <button
        className="bg-gray-400 text-white px-6 py-3 rounded font-semibold"
        onClick={() => alert("Please log in")}
      >
        Log in to purchase
      </button>
    )
  }

  const handleBuy = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providerId,
          examCode,
          userId: user.uid,
          // ❌ Bỏ amount — server tự tính từ DB
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.url) {
        alert(data.error || "Unable to create a payment link. Please try again.")
        return
      }

      window.location.href = data.url
    } catch (err) {
      console.error(err)
      alert("Connection error. Please try again.")
    }
  }

  return (
    <div className="flex flex-col items-center gap-3 text-center">
  
      {/* Badge khuyến mãi */}
      {isOnSale && (
        <span className="bg-red-100 text-red-600 text-sm font-semibold px-3 py-1 rounded-full">
          🎉 Today’s promotional price!
        </span>
      )}
  
      {/* Giá */}
      <div className="flex items-center justify-center gap-3">
        {isOnSale && (
          <span className="line-through text-gray-400 text-base">
            {price.toLocaleString("vi-VN")}₫
          </span>
        )}
        <span className="text-xl font-bold text-red-500">
          {finalPrice.toLocaleString("vi-VN")}₫
        </span>
      </div>
  
      {/* Button nhỏ hơn + căn giữa */}
      <button
        onClick={handleBuy}
        className="bg-blue-600 text-white px-4 py-2 text-sm rounded font-semibold w-auto min-w-[140px]"
      >
        Buy dump
      </button>
  
    </div>
  )
}
