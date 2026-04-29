import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from 'firebase-admin/auth'

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await getAuth().verifyIdToken(token)

  return NextResponse.json({ courses: [] })
}
