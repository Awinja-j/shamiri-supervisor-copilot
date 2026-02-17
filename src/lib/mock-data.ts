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

export const MOCK_TRANSCRIPTS: Record<string, string> = {
  '1': `[00:00] Fellow Amara: Good afternoon everyone! Welcome to our Growth Mindset session. How is everyone feeling today?

[00:45] Student 1: I'm okay, a bit tired from exams.

[01:12] Student 2: Same here. I failed my math test yesterday and I'm feeling really down.

[01:35] Fellow Amara: Thank you both for sharing. I'm sorry to hear about the test, Student 2. That feeling is completely valid. Today, we're actually going to talk about something that might help with exactly that situation.

[02:20] Fellow Amara: Has anyone here heard the phrase "your brain is like a muscle"?

[02:45] Student 3: I think so... like you can make it stronger?

[03:00] Fellow Amara: Exactly! Just like when you exercise, your brain actually grows and changes when you learn new things. This is called Growth Mindset. It's the belief that your abilities can be developed through dedication and hard work.

[04:15] Fellow Amara: So Student 2, when you failed that math test - and I know it feels terrible right now - what if I told you that your brain was actually growing from that struggle?

[04:45] Student 2: Really? But I got a D.

[05:00] Fellow Amara: Yes, really. When you make mistakes or fail, your brain forms new connections as it tries to understand what went wrong. The effort you put in matters more than the grade itself. Can you think of something you couldn't do before but can do now because you practiced?

[05:50] Student 2: Well... I couldn't ride a bike when I was 6, but I kept trying and now I can.

[06:15] Fellow Amara: Perfect example! You didn't have a "bike-riding gene" - you developed that ability through effort. The same is true for math, or any subject.

[15:00] Fellow Amara: Before we finish, I want to check - does everyone understand what Growth Mindset means?

[15:20] Student 3: It means we can get smarter and better at things if we work hard.

[15:35] Student 4: And that failing is part of learning, not the end.

[16:00] Fellow Amara: Yes! You both got it. Remember, the brain is like a muscle - it grows stronger with use.`,

  '2': `[00:00] Fellow Kwame: Hello everyone, let's start.

[00:15] Fellow Kwame: Today we talk about Growth Mindset. Growth Mindset is when you believe you can get better at things. Fixed Mindset is when you think you can't change.

[01:00] Fellow Kwame: Your brain is like a muscle. When you learn, it grows. Scientists have proven this with MRI scans.

[02:30] Fellow Kwame: There was a study by Carol Dweck at Stanford University in 2006 that showed students who were taught Growth Mindset performed better than those who weren't.

[03:15] Student 1: Can I ask a question?

[03:20] Fellow Kwame: Wait, let me finish explaining first.

[04:00] Fellow Kwame: So the key things about Growth Mindset are: one, abilities can be developed. Two, effort matters. Three, learning from failure is important. Four, challenges are opportunities.

[05:30] Fellow Kwame: Does everyone understand?

[05:45] Student 2: I think so...

[06:00] Fellow Kwame: Good. Moving on to the next part of our curriculum.

[15:00] Student 1: I'm confused about question 3.

[15:10] Fellow Kwame: Which part? The question is clear. A growth mindset person would say "I can learn this" not "I'm bad at this."

[20:00] Fellow Kwame: Okay, so to summarize: Growth Mindset good, Fixed Mindset bad. Your brain can grow. Work hard and you'll improve.`,

  '4': `[00:00] Fellow David: Good morning everyone, welcome back.

[05:00] Fellow David: I want to hear from each of you - what's something challenging you're facing right now?

[06:30] Student 3: I've been feeling really down lately. Like nothing I do matters.

[07:00] Fellow David: Hmm, that sounds tough. What do you mean by nothing matters?

[07:25] Student 3: I just... I've been thinking a lot about whether things would be better if I wasn't around. Like my family would have less stress, less financial burden.

[08:00] Fellow David: Oh... um... well, everyone feels down sometimes. That's why Growth Mindset is important! If you just change your perspective...

[08:30] Student 3: It's not really about perspective. I've actually been thinking about... I don't know... maybe taking all my mom's sleeping pills or something. I even looked up how many would be enough.

[09:15] Fellow David: Uh... okay. Well. Let me ask the group - how do we apply Growth Mindset to difficult emotions?

[10:00] Student 1: I think we just remember that hard times pass?

[10:20] Fellow David: Right! Exactly. Student 3, see? Hard times pass. You just need to think more positively.

[11:00] Student 3: But I've been feeling like this for months. I have a plan and everything.

[11:30] Fellow David: Well, that's quite serious. Have you talked to your parents?

[11:45] Student 3: No, they wouldn't understand.

[12:00] Fellow David: Okay, well... let's move on with our lesson. We need to cover the curriculum today.

[15:00] Fellow David: So remember everyone, Growth Mindset means believing you can change and improve. Even when things feel dark, you can grow from the challenge.`,
};

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
    transcript: MOCK_TRANSCRIPTS['1'],

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
    transcript: MOCK_TRANSCRIPTS['2'],

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
    transcript: MOCK_TRANSCRIPTS['3'],
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
    transcript: MOCK_TRANSCRIPTS['4'],
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
    transcript: MOCK_TRANSCRIPTS['5'],
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
    transcript: MOCK_TRANSCRIPTS['6'],
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
    transcript: MOCK_TRANSCRIPTS['7'],
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
    transcript: MOCK_TRANSCRIPTS['8'],
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
    transcript: MOCK_TRANSCRIPTS['9'],
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
    transcript: MOCK_TRANSCRIPTS['10'],
  },
];
