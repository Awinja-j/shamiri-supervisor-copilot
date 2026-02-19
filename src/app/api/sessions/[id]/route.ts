import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('Fetching sessions from database...');
    
    const sessions = await prisma.session.findMany({
      include: {
        fellow: {
          select: { name: true },
        },
        analyses: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        riskFlags: {
          where: { resolved: false },
        },
      },
      orderBy: [
        { sessionDate: 'desc' },
      ],
    });

    console.log(`Found ${sessions.length} sessions in database`);

    const formatted = sessions.map(session => ({
      id: session.id,
      fellowName: session.fellow.name,
      groupId: session.groupId,
      sessionDate: session.sessionDate,
      durationMinutes: session.durationMinutes,
      status: session.riskFlags.length > 0 
        ? 'Flagged for Review' 
        : session.analyses.length > 0 
          ? 'Safe' 
          : 'Pending',
      hasAnalysis: session.analyses.length > 0,
      riskLevel: session.riskFlags.length > 0
        ? session.riskFlags[0].severity
        : 'none',
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    );
  }
}