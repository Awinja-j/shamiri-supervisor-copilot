// src/app/api/sessions/[id]/analyze/route.ts
import { NextResponse } from 'next/server';
import { analyzeSessionTranscript } from '@/lib/ai-service';
import { MOCK_SESSIONS } from '@/lib/mock-data';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const session = MOCK_SESSIONS.find(s => s.id === id);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    if (!session.transcript) {
      return NextResponse.json(
        { error: 'Session has no transcript' },
        { status: 400 }
      );
    }

    console.log(`Analyzing session ${session.groupId}...`);

    // Run AI analysis
    const analysis = await analyzeSessionTranscript(
      session.transcript,
      session.fellowName,
      session.groupId
    );

    return NextResponse.json({
      sessionId: id,
      analysis,
      analyzedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error analyzing session:', error);
    return NextResponse.json(
      { error: 'Failed to analyze session' },
      { status: 500 }
    );
  }
}