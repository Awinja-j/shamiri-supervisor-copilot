import { resolve } from 'path';
import { config } from 'dotenv';

const envPath = resolve(process.cwd(), '.env');
console.log('📁 Loading .env from:', envPath);

const result = config({ path: envPath });

if (result.error) {
  console.error('❌ Failed to load .env file:', result.error);
  throw result.error;
}
console.log('✅ .env loaded');
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('DATABASE_URL preview:', process.env.DATABASE_URL?.substring(0, 30) + '...');

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set after loading .env');
  console.error('Current working directory:', process.cwd());
  console.error('Looking for .env at:', envPath);
  throw new Error('DATABASE_URL environment variable is required');
}

import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaNeon(pool as any);

const prisma = new PrismaClient({
  adapter,
  log: ['error', 'warn'],
});


const TRANSCRIPTS = {
  'GRP-001': `[00:00] Fellow Amara: Good afternoon everyone! Welcome to our Growth Mindset session. How is everyone feeling today?
[00:45] Student 1: I'm okay, a bit tired from exams.
[01:12] Student 2: Same here. I failed my math test yesterday and I'm feeling really down.
[01:35] Fellow Amara: Thank you both for sharing. That feeling is completely valid. Today we're going to talk about something that might help with exactly that situation.
[02:20] Fellow Amara: Has anyone here heard the phrase "your brain is like a muscle"?
[02:45] Student 3: I think so... like you can make it stronger?
[03:00] Fellow Amara: Exactly! Just like when you exercise, your brain actually grows when you learn new things. This is called Growth Mindset - the belief that your abilities can be developed through dedication and hard work.
[04:15] Fellow Amara: So Student 2, when you failed that math test - what if I told you that your brain was actually growing from that struggle?
[05:00] Fellow Amara: The effort you put in matters more than the grade itself. Can you think of something you couldn't do before but can do now because you practiced?
[05:50] Student 2: Well... I couldn't ride a bike when I was 6, but I kept trying and now I can.
[06:15] Fellow Amara: Perfect example! You developed that ability through effort. The same is true for math.
[15:00] Fellow Amara: Before we finish, does everyone understand what Growth Mindset means?
[15:20] Student 3: It means we can get smarter if we work hard.
[15:35] Student 4: And that failing is part of learning, not the end.
[16:00] Fellow Amara: Yes! You both got it. Remember, the brain is like a muscle - it grows stronger with use. Thank you all for such thoughtful participation today!`,

  'GRP-002': `[00:00] Fellow Kwame: Hello everyone, let's start.
[00:15] Fellow Kwame: Today we talk about Growth Mindset. It is when you believe you can get better at things.
[01:00] Fellow Kwame: Your brain is like a muscle. When you learn, it grows.
[03:15] Student 1: Can I ask a question?
[03:20] Fellow Kwame: Wait, let me finish explaining first.
[04:00] Fellow Kwame: The key things are: one, abilities can be developed. Two, effort matters. Three, learning from failure is important.
[05:30] Fellow Kwame: Does everyone understand?
[05:45] Student 2: I think so...
[06:00] Fellow Kwame: Good. Moving on to the next part of our curriculum.
[15:10] Fellow Kwame: Which part? The question is clear.
[20:00] Fellow Kwame: Okay, so to summarize: Growth Mindset good, Fixed Mindset bad. Your brain can grow. Work hard and you will improve.
[21:00] Student 4: What if you work hard but still fail?
[21:15] Fellow Kwame: Then you did not work hard enough or need a different strategy.
[22:05] Fellow Kwame: Let me finish. The research is very clear on this. Effort equals results.
[25:00] Fellow Kwame: Any other questions? No? Good. See you all next session.`,

  'GRP-003': `[00:00] Fellow Zainab: Habari everyone! Good afternoon!
[00:20] Students: Habari!
[00:35] Fellow Zainab: How are we all doing today? I see some tired faces!
[01:00] Student 1: We had sports practice this morning, I'm exhausted.
[01:15] Fellow Zainab: Even though you're tired, you still showed up. That actually connects to what we're learning today.
[02:00] Fellow Zainab: Today we're going to explore something called Growth Mindset. Before I explain, has anyone ever felt like they're just "not good" at something?
[02:40] Student 2: Me. I'm terrible at science.
[02:55] Student 3: I can't draw to save my life.
[03:30] Fellow Zainab: Thank you all for being so honest. Five years ago, I thought I was not a reading person. I avoided books like a plague.
[04:25] Fellow Zainab: I learned that my brain is like a muscle. The more I use it, the stronger it gets. This is Growth Mindset - the belief that abilities can grow through hard work.
[08:00] Fellow Zainab: Student 3, you said you can't draw. Have you ever learned any skill that was hard at first but got easier?
[08:30] Student 3: Um... I learned to braid hair. At first my braids were so messy!
[09:10] Fellow Zainab: That is Growth Mindset in action! Your drawing brain can develop the same way.
[20:00] Fellow Zainab: Is this making sense to everyone?
[22:25] Student 3: It is believing that you can get better at things if you work hard and don't give up?
[23:10] Student 4: And our brains actually change when we learn, like a muscle getting stronger.
[23:30] Fellow Zainab: Perfect! You all understand this so well. Thank you for such wonderful participation today!`,

  'GRP-004': `[00:00] Fellow David: Good morning everyone, welcome back.
[05:00] Fellow David: I want to hear from each of you - what's something challenging you're facing right now?
[06:30] Student 3: I've been feeling really down lately. Like nothing I do matters.
[07:00] Fellow David: Hmm, that sounds tough. What do you mean by nothing matters?
[07:25] Student 3: I've been thinking about whether things would be better if I wasn't around. Like my family would have less stress and less financial burden.
[08:00] Fellow David: Oh... um... well, everyone feels down sometimes. That's why Growth Mindset is important! If you just change your perspective...
[08:30] Student 3: It's not really about perspective. I've been thinking about maybe taking all my mom's sleeping pills or something. I even looked up how many would be enough.
[09:15] Fellow David: Uh... okay. Well. Let me ask the group - how do we apply Growth Mindset to difficult emotions?
[10:00] Student 1: I think we just remember that hard times pass?
[10:20] Fellow David: Right! Exactly. Student 3, see? Hard times pass. You just need to think more positively.
[11:00] Student 3: But I've been feeling like this for months. I have a plan and everything.
[11:30] Fellow David: Well, that's quite serious. Have you talked to your parents?
[11:45] Student 3: No, they wouldn't understand.
[12:00] Fellow David: Okay, well... let's move on with our lesson. We need to cover the curriculum today.
[15:00] Fellow David: So remember everyone, Growth Mindset means believing you can change and improve.`,

  'GRP-005': `[00:00] Fellow Grace: Hello everyone! Welcome to our Growth Mindset session.
[02:00] Fellow Grace: Today I want to start by asking - has anyone felt stuck or limited by labels people have given you?
[03:00] Student 1: My teachers always say I'm a slow learner.
[03:20] Fellow Grace: Thank you for sharing that. That must be really hard to hear. How does it make you feel?
[03:45] Student 1: Like I'm stupid and will never catch up.
[04:10] Fellow Grace: I'm so glad you shared that. Labels like that are about where you are right now, not where you can go. Your brain has incredible ability to grow and change - this is called neuroplasticity.
[06:30] Fellow Grace: Has anyone here learned something new recently that was difficult at first?
[07:00] Student 2: I learned to cook ugali. At first I kept burning it!
[07:50] Fellow Grace: So your brain learned! It formed new pathways. This is Growth Mindset - believing abilities can develop through dedication and hard work.
[12:00] Fellow Grace: Student 1, when your teacher calls you a "slow learner" - what if you thought of yourself as a "thorough learner" instead?
[12:45] Student 1: I never thought of it that way...
[13:00] Fellow Grace: The effort you put in matters more than how fast you get there.
[25:00] Fellow Grace: Can someone explain Growth Mindset in their own words?
[25:30] Student 2: It's believing we can get better and smarter with practice and effort?
[26:10] Student 1: They're like muscles that grow when we use them?
[26:25] Fellow Grace: Perfect! You both got it. Thank you all for such thoughtful participation!`,

  'GRP-006': `[00:00] Fellow John: Okay everyone, let's begin. Growth Mindset session.
[01:00] Fellow John: Growth Mindset is very simple. It means you can get smarter if you try hard.
[02:30] Fellow John: Carol Dweck invented this concept. She's a psychologist at Stanford.
[03:00] Student 1: Can you explain more?
[03:10] Fellow John: I just did. Your brain is like a muscle. Exercise it and it grows.
[04:00] Student 2: But what if you really are bad at something?
[04:15] Fellow John: Then you're not trying hard enough.
[06:00] Student 3: I failed chemistry three times. I've tried really hard.
[06:45] Fellow John: There's always something else to try. That's the principle.
[14:30] Fellow John: Well, depression is a medical condition. You should see a doctor for that. Maybe try antidepressants.
[15:00] Student 2: I'm not depressed, I was just asking.
[15:15] Fellow John: Oh okay. Well, if you were, you'd need medication probably. Growth Mindset works best for normal people.
[16:30] Fellow John: Anyway, let's get back on track. In your workbooks...
[28:00] Fellow John: Remember - think positively and work hard. See you next week.`,

  'GRP-007': `[00:00] Fellow Sarah: Good afternoon everyone! How's everyone doing today?
[01:20] Fellow Sarah: Before we dive in, has anyone ever thought "I'm just not smart enough" or "I'll never be good at this"?
[02:45] Multiple students: Yes! / Me! / All the time!
[03:00] Fellow Sarah: Wow, we all have these thoughts! I had those exact thoughts when I was your age.
[03:40] Fellow Sarah: I used to think I was terrible at math. But then I learned something that changed everything.
[04:50] Fellow Sarah: I learned that my brain is actually like a muscle. When I struggle with math, my brain is exercising and getting stronger.
[05:40] Fellow Sarah: This is called Growth Mindset - the belief that abilities can be developed through hard work and dedication.
[08:00] Fellow Sarah: Student 2, you said you're tired. Why did you still come today?
[07:45] Student 2: I don't know... I wanted to be here?
[08:00] Fellow Sarah: That's effort! That's choosing to show up even when it's hard. That's Growth Mindset in action.
[16:00] Student 1: I failed my English exam last term.
[16:15] Fellow Sarah: Thank you for sharing that. How did it feel?
[16:35] Student 1: Terrible. I felt so stupid.
[16:50] Fellow Sarah: Failure hurts. But failure isn't the end of your story. It's information for your brain.
[19:00] Student 1: No, I studied harder and did better on the next one.
[19:00] Fellow Sarah: That's Growth Mindset! You used failure to grow.
[26:00] Fellow Sarah: Instead of "I'm bad at soccer" try "I'm bad at soccer... YET."
[26:45] Student 2: Oh! That feels different!
[32:00] Fellow Sarah: Thank you all for your vulnerability and honesty today. I'm really proud of how you showed up!`,

  'GRP-008': `[00:00] Fellow Michael: Good morning class. Let's start the session.
[00:30] Fellow Michael: Today we're learning about Growth Mindset. It's a psychological theory.
[01:15] Fellow Michael: The brain has neuroplasticity, which means it can form new neural pathways.
[02:00] Student 1: Can you explain that more simply?
[02:10] Fellow Michael: Neuroplasticity is the brain's ability to reorganize itself by forming new neural connections throughout life.
[02:45] Student 1: I still don't really understand...
[03:00] Fellow Michael: Okay, basically it means your brain can change. Moving on.
[06:00] Student 2: What does malleable mean?
[06:15] Fellow Michael: Changeable. Capable of being shaped.
[08:45] Fellow Michael: An example would be someone who fails a test but maintains belief in their capacity to improve through additional studying.
[10:45] Fellow Michael: There's always something else to try. That's the principle of Growth Mindset.
[22:00] Fellow Michael: The neuroscience behind Growth Mindset involves the prefrontal cortex and myelination...
[25:00] Student 2: This is getting confusing.
[25:15] Fellow Michael: It's important to understand the scientific foundation. Pay attention.
[27:00] Fellow Michael: To conclude, Growth Mindset is a researched-backed approach. Implementation requires consistent application of these principles.`,

  'GRP-009': `[00:00] Fellow Faith: Habari everyone! Come in, come in! Get comfortable!
[00:30] Students: Habari!
[01:15] Student 1: It's been hard. So much homework.
[01:30] Student 2: Same, I'm so stressed.
[01:45] Fellow Faith: It sounds like you're all carrying a lot right now. Thank you for sharing that with me.
[02:20] Fellow Faith: The fact that you're here, even with all that stress - that tells me something important about each of you.
[03:40] Fellow Faith: Today we're going to talk about something called Growth Mindset.
[05:10] Fellow Faith: What if the abilities you think are fixed - like being a "science person" - what if they're skills you can develop?
[07:20] Fellow Faith: This is Growth Mindset. Your brain is like a muscle. When you use it, it literally gets stronger. New connections form between brain cells.
[09:35] Student 4: Well... I used to not be able to swim at all. Now I can swim pretty well.
[09:55] Fellow Faith: There it is! You developed that ability! You weren't born knowing how to swim.
[14:30] Student 2: I failed my history exam last month.
[14:45] Fellow Faith: Thank you for sharing that. How did it feel?
[14:50] Student 2: Awful. I felt so dumb.
[15:55] Fellow Faith: So you put in effort, you sought help, you tried again. That's Growth Mindset!
[23:50] Student 4: Our brains are like muscles and grow when we use them?
[24:00] Fellow Faith: Perfect! And Student 1, what about failure?
[24:25] Student 1: That it's not the end. It's a chance to learn and grow?
[31:00] Fellow Faith: Thank you all so much for your openness today. Remember - you're not stuck. You're growing!`,

  'GRP-010': `[00:00] Fellow Peter: Okay everyone, settle down. We're starting.
[00:30] Fellow Peter: Today is about Growth Mindset. You've probably heard of it before.
[01:00] Student 1: Not really, what is it?
[01:10] Fellow Peter: It's when you believe you can get smarter through effort.
[01:45] Fellow Peter: There are two types - growth and fixed. Growth is good, fixed is bad.
[03:20] Fellow Peter: Your brain is like a muscle. Use it and it gets stronger.
[04:00] Student 3: How do we make our brains stronger?
[04:15] Fellow Peter: By studying hard and not giving up.
[05:00] Student 1: What if we study hard but still don't understand?
[05:15] Fellow Peter: Then study harder.
[06:05] Fellow Peter: Look, the concept is simple. If you put in effort, you'll improve. That's Growth Mindset.
[10:15] Student 3: Sometimes believing doesn't feel like enough though...
[10:30] Fellow Peter: That's negative thinking. You need to stay positive.
[12:00] Fellow Peter: Okay, let's move on. In your workbooks...
[21:10] Fellow Peter: The specific step is to have a growth mindset! I've explained this already.
[22:00] Fellow Peter: Look, you're all overthinking this. Be positive and work hard.
[23:25] Student 3: I think so...
[24:00] Fellow Peter: We're done for today. See you next session.`,
};


const FELLOWS_DATA = [
  { name: 'Amara Okonkwo', cohort: '2024-Q1' },
  { name: 'Kwame Mensah', cohort: '2024-Q1' },
  { name: 'Zainab Hassan', cohort: '2024-Q1' },
  { name: 'David Mwangi', cohort: '2024-Q1' },
  { name: 'Grace Achieng', cohort: '2024-Q1' },
  { name: 'John Kimani', cohort: '2024-Q1' },
  { name: 'Sarah Njeri', cohort: '2024-Q1' },
  { name: 'Michael Otieno', cohort: '2024-Q1' },
  { name: 'Faith Wambui', cohort: '2024-Q1' },
  { name: 'Peter Ochieng', cohort: '2024-Q1' },
];

const SESSIONS_DATA = [
  { groupId: 'GRP-001', date: '2024-02-10T14:00:00', duration: 55, status: 'Safe' },
  { groupId: 'GRP-002', date: '2024-02-11T10:00:00', duration: 48, status: 'Safe' },
  { groupId: 'GRP-003', date: '2024-02-12T15:30:00', duration: 62, status: 'Safe' },
  { groupId: 'GRP-004', date: '2024-02-13T09:00:00', duration: 52, status: 'Flagged for Review' },
  { groupId: 'GRP-005', date: '2024-02-14T13:00:00', duration: 58, status: 'Safe' },
  { groupId: 'GRP-006', date: '2024-02-15T11:00:00', duration: 45, status: 'Safe' },
  { groupId: 'GRP-007', date: '2024-02-16T14:00:00', duration: 60, status: 'Safe' },
  { groupId: 'GRP-008', date: '2024-02-17T10:30:00', duration: 50, status: 'Safe' },
  { groupId: 'GRP-009', date: '2024-02-18T13:30:00', duration: 57, status: 'Safe' },
  { groupId: 'GRP-010', date: '2024-02-19T15:00:00', duration: 44, status: 'Safe' },
];


async function main() {
  console.log('\n🌱 Starting database seed...\n');

  // Clean existing data
  console.log('Cleaning existing data...\n');
  await prisma.supervisorOverride.deleteMany();
  await prisma.riskFlag.deleteMany();
  await prisma.aIAnalysis.deleteMany();
  await prisma.session.deleteMany();
  await prisma.fellow.deleteMany();
  await prisma.supervisor.deleteMany();
  console.log('Database cleaned\n');

  // Create supervisor
  console.log('Creating supervisor...');
  const supervisor = await prisma.supervisor.create({
    data: {
      name: 'Dr. Kamau Mwangi',
      email: 'kamau@shamiri.org',
    },
  });
  console.log(`Created supervisor: ${supervisor.name}\n`);

  console.log('Creating fellows and sessions...');
  for (let i = 0; i < FELLOWS_DATA.length; i++) {
    const fellowData = FELLOWS_DATA[i];
    const sessionData = SESSIONS_DATA[i];

    const fellow = await prisma.fellow.create({
      data: {
        name: fellowData.name,
        cohort: fellowData.cohort,
        supervisorId: supervisor.id,
      },
    });

    const transcript = TRANSCRIPTS[sessionData.groupId as keyof typeof TRANSCRIPTS];

    const session = await (prisma.session as any).create({
      data: {
        fellowId: fellow.id,
        groupId: sessionData.groupId,
        sessionDate: new Date(sessionData.date),
        durationMinutes: sessionData.duration,
        status: sessionData.status,
        transcript,
      },
    });

    console.log(`✅ ${fellow.name} → ${session.groupId} (${session.status})`);
  }

  console.log('Seed completed successfully!');
  console.log(`Summary:
  - 1 Supervisor created
  - ${FELLOWS_DATA.length} Fellows created
  - ${SESSIONS_DATA.length} Sessions created
  - ${SESSIONS_DATA.filter(s => s.status === 'Flagged for Review').length} Flagged sessions
  `);
}

main()
  .catch((e) => {
    console.error('\nSeed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });