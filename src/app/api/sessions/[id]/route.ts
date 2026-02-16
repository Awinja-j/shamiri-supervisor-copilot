// src/app/api/sessions/[id]/route.ts
import { NextResponse } from 'next/server';
import { MOCK_SESSIONS, MOCK_ANALYSIS } from '@/lib/mock-data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = MOCK_SESSIONS.find(s => s.id === params.id);
  
  if (!session) {
    return NextResponse.json(
      { error: 'Session not found' },
      { status: 404 }
    );
  }

  const analysis = MOCK_ANALYSIS[params.id as keyof typeof MOCK_ANALYSIS];

  return NextResponse.json({
    ...session,
    analysis,
  });
}