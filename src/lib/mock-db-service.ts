import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/lib/mock-db.json');

function readDB() {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

function writeDB(data: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export async function getAllSessions() {
  const db = readDB();
  return db.sessions.map((session: any) => {
    const fellow = db.fellows.find((f: any) => f.id === session.fellowId);
    const analyses = db.analyses.filter((a: any) => a.sessionId === session.id);
    const riskFlags = db.riskFlags.filter((r: any) => r.sessionId === session.id && !r.resolved);
    
    return {
      id: session.id,
      fellowName: fellow?.name || 'Unknown',
      groupId: session.groupId,
      sessionDate: new Date(session.sessionDate),
      durationMinutes: session.durationMinutes,
      status: session.status,
      hasAnalysis: analyses.length > 0,
      riskLevel: riskFlags.length > 0 ? riskFlags[0].severity : 'none',
    };
  });
}

export async function getSessionById(id: string) {
  const db = readDB();
  const session = db.sessions.find((s: any) => s.id === id);
  
  if (!session) return null;
  
  const fellow = db.fellows.find((f: any) => f.id === session.fellowId);
  const analyses = db.analyses.filter((a: any) => a.sessionId === session.id);
  const latestAnalysis = analyses[analyses.length - 1];
  
  return {
    id: session.id,
    fellowName: fellow?.name || 'Unknown',
    groupId: session.groupId,
    sessionDate: new Date(session.sessionDate),
    durationMinutes: session.durationMinutes,
    status: session.status,
    transcript: session.transcript,
    analysis: latestAnalysis ? {
      summary: latestAnalysis.summary,
      contentCoverage: {
        score: latestAnalysis.contentScore,
        evidence: latestAnalysis.contentEvidence,
        reasoning: latestAnalysis.contentReasoning,
      },
      facilitationQuality: {
        score: latestAnalysis.facilitationScore,
        evidence: latestAnalysis.facilitationEvidence,
        reasoning: latestAnalysis.facilitationReasoning,
      },
      protocolSafety: {
        score: latestAnalysis.protocolScore,
        evidence: latestAnalysis.protocolEvidence,
        reasoning: latestAnalysis.protocolReasoning,
      },
      riskAssessment: {
        flag: latestAnalysis.riskFlag,
        severity: latestAnalysis.riskSeverity,
        confidence: latestAnalysis.riskConfidence,
        quotes: latestAnalysis.riskQuotes,
        reasoning: latestAnalysis.riskReasoning,
      },
    } : null,
  };
}

export async function saveAnalysis(sessionId: string, analysis: any) {
  const db = readDB();
  
  const newAnalysis = {
    id: `analysis-${Date.now()}`,
    sessionId,
    modelVersion: 'gpt-4o',
    summary: analysis.summary,
    contentScore: analysis.contentCoverage.score,
    contentEvidence: analysis.contentCoverage.evidence,
    contentReasoning: analysis.contentCoverage.reasoning,
    facilitationScore: analysis.facilitationQuality.score,
    facilitationEvidence: analysis.facilitationQuality.evidence,
    facilitationReasoning: analysis.facilitationQuality.reasoning,
    protocolScore: analysis.protocolSafety.score,
    protocolEvidence: analysis.protocolSafety.evidence,
    protocolReasoning: analysis.protocolSafety.reasoning,
    riskFlag: analysis.riskAssessment.flag,
    riskSeverity: analysis.riskAssessment.severity,
    riskConfidence: analysis.riskAssessment.confidence,
    riskQuotes: analysis.riskAssessment.quotes || [],
    riskReasoning: analysis.riskAssessment.reasoning,
    processingTimeMs: 0,
    createdAt: new Date().toISOString(),
  };
  
  db.analyses.push(newAnalysis);
  
  const session = db.sessions.find((s: any) => s.id === sessionId);
  if (session) {
    session.status = analysis.riskAssessment.flag === 'RISK' ? 'Flagged for Review' : 'Safe';
  }
  
  if (analysis.riskAssessment.flag === 'RISK') {
    db.riskFlags.push({
      id: `risk-${Date.now()}`,
      sessionId,
      severity: analysis.riskAssessment.severity || 'moderate',
      quotes: analysis.riskAssessment.quotes || [],
      resolved: false,
      resolvedBy: null,
      resolvedAt: null,
      createdAt: new Date().toISOString(),
    });
  }
  
  writeDB(db);
  return newAnalysis;
}

export async function saveOverride(sessionId: string, data: any) {
  const db = readDB();
  
  const analyses = db.analyses.filter((a: any) => a.sessionId === sessionId);
  const latestAnalysis = analyses[analyses.length - 1];
  
  if (!latestAnalysis) {
    throw new Error('No analysis found for this session');
  }
  
  const override = {
    id: `override-${Date.now()}`,
    analysisId: latestAnalysis.id,
    supervisorId: 'supervisor-1',
    action: latestAnalysis.riskFlag === data.newStatus ? 'VALIDATE' : 'REJECT',
    previousFlag: latestAnalysis.riskFlag,
    newFlag: data.newStatus,
    notes: data.notes,
    createdAt: new Date().toISOString(),
  };
  
  db.overrides.push(override);
  
  const session = db.sessions.find((s: any) => s.id === sessionId);
  if (session) {
    session.status = data.newStatus === 'SAFE' ? 'Safe' : 'Flagged for Review';
  }
  
  const riskFlags = db.riskFlags.filter((r: any) => r.sessionId === sessionId);
  riskFlags.forEach((flag: any) => {
    if (data.newStatus === 'SAFE') {
      flag.resolved = true;
      flag.resolvedBy = 'supervisor-1';
      flag.resolvedAt = new Date().toISOString();
    } else {
      flag.resolved = false;
    }
  });
  
  writeDB(db);
  return override;
}