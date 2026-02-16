// src/lib/mock-data.ts

export const MOCK_SUPERVISOR = {
  id: '1',
  name: 'Dr. Kamau Mwangi',
  email: 'kamau@shamiri.org',
};

export const MOCK_FELLOWS = [
  { id: '1', name: 'Amara Okonkwo', cohort: '2024-Q1' },
  { id: '2', name: 'Kwame Mensah', cohort: '2024-Q1' },
  { id: '3', name: 'Zainab Hassan', cohort: '2024-Q1' },
  { id: '4', name: 'David Mwangi', cohort: '2024-Q1' },
  { id: '5', name: 'Grace Achieng', cohort: '2024-Q1' },
];

export const MOCK_SESSIONS = [
  {
    id: '1',
    fellowId: '1',
    fellowName: 'Amara Okonkwo',
    groupId: 'GRP-001',
    sessionDate: new Date('2024-02-10T14:00:00'),
    durationMinutes: 55,
    status: 'Safe' as const,
    hasAnalysis: true,
    riskLevel: 'none' as const,
  },
  {
    id: '2',
    fellowId: '2',
    fellowName: 'Kwame Mensah',
    groupId: 'GRP-002',
    sessionDate: new Date('2024-02-11T10:00:00'),
    durationMinutes: 48,
    status: 'Safe' as const,
    hasAnalysis: true,
    riskLevel: 'none' as const,
  },
  {
    id: '3',
    fellowId: '3',
    fellowName: 'Zainab Hassan',
    groupId: 'GRP-003',
    sessionDate: new Date('2024-02-12T15:30:00'),
    durationMinutes: 62,
    status: 'Safe' as const,
    hasAnalysis: true,
    riskLevel: 'none' as const,
  },
  {
    id: '4',
    fellowId: '4',
    fellowName: 'David Mwangi',
    groupId: 'GRP-004',
    sessionDate: new Date('2024-02-13T09:00:00'),
    durationMinutes: 52,
    status: 'Flagged for Review' as const,
    hasAnalysis: true,
    riskLevel: 'severe' as const,
  },
  {
    id: '5',
    fellowId: '5',
    fellowName: 'Grace Achieng',
    groupId: 'GRP-005',
    sessionDate: new Date('2024-02-14T13:00:00'),
    durationMinutes: 58,
    status: 'Safe' as const,
    hasAnalysis: true,
    riskLevel: 'none' as const,
  },
  {
    id: '6',
    fellowId: '1',
    fellowName: 'Amara Okonkwo',
    groupId: 'GRP-006',
    sessionDate: new Date('2024-02-15T14:00:00'),
    durationMinutes: 50,
    status: 'Processing' as const,
    hasAnalysis: false,
    riskLevel: 'none' as const,
  },
  {
    id: '7',
    fellowId: '2',
    fellowName: 'Kwame Mensah',
    groupId: 'GRP-007',
    sessionDate: new Date('2024-02-16T11:00:00'),
    durationMinutes: 45,
    status: 'Safe' as const,
    hasAnalysis: true,
    riskLevel: 'none' as const,
  },
  {
    id: '8',
    fellowId: '3',
    fellowName: 'Zainab Hassan',
    groupId: 'GRP-008',
    sessionDate: new Date('2024-02-17T16:00:00'),
    durationMinutes: 53,
    status: 'Safe' as const,
    hasAnalysis: true,
    riskLevel: 'none' as const,
  },
  {
    id: '9',
    fellowId: '4',
    fellowName: 'David Mwangi',
    groupId: 'GRP-009',
    sessionDate: new Date('2024-02-18T10:00:00'),
    durationMinutes: 48,
    status: 'Safe' as const,
    hasAnalysis: true,
    riskLevel: 'none' as const,
  },
  {
    id: '10',
    fellowId: '5',
    fellowName: 'Grace Achieng',
    groupId: 'GRP-010',
    sessionDate: new Date('2024-02-19T13:30:00'),
    durationMinutes: 60,
    status: 'Safe' as const,
    hasAnalysis: true,
    riskLevel: 'none' as const,
  },
];

export const MOCK_ANALYSIS = {
  '1': {
    summary: 'Fellow Amara delivered an excellent Growth Mindset session with strong engagement and clear explanations. She effectively used examples and checked for student understanding.',
    contentCoverage: {
      score: 3,
      evidence: [
        'Line 45: Explained brain plasticity clearly',
        'Line 102: Asked students for examples',
        'Line 150: Used "brain is like a muscle" metaphor',
      ],
      reasoning: 'Fellow covered all key concepts of Growth Mindset and ensured students understood through interactive discussion.',
    },
    facilitationQuality: {
      score: 3,
      evidence: [
        'Line 20: "Thank you for sharing that"',
        'Line 85: Asked open-ended questions',
        'Line 130: Validated student feelings',
      ],
      reasoning: 'Fellow demonstrated excellent facilitation with empathy, open questions, and student validation.',
    },
    protocolSafety: {
      score: 3,
      evidence: [
        'Stayed focused on Growth Mindset curriculum',
        'Redirected side conversations appropriately',
        'No unauthorized advice given',
      ],
      reasoning: 'Fellow adhered perfectly to the protocol without straying into unauthorized territory.',
    },
    riskAssessment: {
      flag: 'SAFE',
      confidence: 0.98,
    },
  },
  '4': {
    summary: 'URGENT: Session contains explicit self-harm disclosure with detailed plan. Student expressed suicidal ideation with method and intent. Fellow did not appropriately handle the crisis.',
    contentCoverage: {
      score: 2,
      evidence: [
        'Line 30: Mentioned Growth Mindset concept',
        'Line 45: Attempted to explain brain plasticity',
      ],
      reasoning: 'Fellow mentioned the concept but the session was derailed by a crisis that was not properly managed.',
    },
    facilitationQuality: {
      score: 1,
      evidence: [
        'Line 95: Dismissed serious disclosure',
        'Line 110: Failed to pause and address crisis',
        'Line 120: Moved on with curriculum inappropriately',
      ],
      reasoning: 'Fellow failed to appropriately respond to a student in crisis, prioritizing curriculum over student safety.',
    },
    protocolSafety: {
      score: 1,
      evidence: [
        'Line 85: Student disclosed suicidal ideation with plan',
        'Line 100: Fellow minimized the disclosure',
        'Line 115: No escalation to supervisor',
      ],
      reasoning: 'CRITICAL VIOLATION: Fellow received explicit disclosure of self-harm with detailed plan but failed to follow crisis protocol.',
    },
    riskAssessment: {
      flag: 'RISK',
      severity: 'severe',
      confidence: 0.99,
      quotes: [
        'Student 3: "I\'ve been thinking about whether things would be better if I wasn\'t around...maybe taking all my mom\'s sleeping pills...I even looked up how many would be enough."',
        'Student 3: "I have a plan and everything."',
      ],
    },
  },
};