// src/app/api/sessions/route.ts
import { NextResponse } from 'next/server';
import { MOCK_SESSIONS } from '@/lib/mock-data';

export async function GET() {
  // Simulate a small delay (real API behavior)
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return NextResponse.json(MOCK_SESSIONS);
}