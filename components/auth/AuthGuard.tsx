'use client'

import { useEffect } from 'react'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (!user) window.location.href = '/login'
    })
  }, [])

  return <>{children}</>
}
