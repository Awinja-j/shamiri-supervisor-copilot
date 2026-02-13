// scripts/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const THERAPY_TRANSCRIPTS = [
  {
    fellowName: "Amara Okonkwo",
    groupId: "GRP-001",
    date: new Date("2024-02-10T14:00:00"),
    duration: 55,
    transcript: `[00:00] Fellow Amara: Good afternoon everyone! Welcome to our Growth Mindset session. How is everyone feeling today?

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

[07:30] Fellow Amara: Let me ask the group - what's something difficult you're working on right now?

[08:00] Student 1: I'm trying to improve my English writing.

[08:15] Student 4: I want to get better at public speaking but I get so nervous.

[09:00] Fellow Amara: These are great examples. The fact that you're trying, even when it's hard, means your brain is in growth mode. Student 4, that nervousness? That's actually your brain working hard to adapt to a challenge.

[10:45] Fellow Amara: Now, I want everyone to think about this: when you say "I'm bad at math" or "I can't do public speaking" - what if you added one word? "I'm bad at math... yet." "I can't do public speaking... yet."

[11:30] Student 3: Oh, that feels different!

[11:45] Fellow Amara: Right? It opens up possibility. It reminds you that abilities can be developed.

[15:00] Fellow Amara: Let's do an activity. I want each of you to share one "fixed mindset" thought you've had about yourself, and we'll rephrase it together with a growth mindset.

[16:00] Student 2: I'm just not a math person.

[16:15] Fellow Amara: Okay, how could we rephrase that?

[16:30] Student 1: "I'm not a math person yet, but I can improve with practice"?

[16:45] Fellow Amara: Beautiful! See how that changes the story?

[25:00] Fellow Amara: Before we finish, I want to check - does everyone understand what Growth Mindset means?

[25:20] Student 3: It means we can get smarter and better at things if we work hard.

[25:35] Student 4: And that failing is part of learning, not the end.

[26:00] Fellow Amara: Yes! You both got it. Remember, the brain is like a muscle - it grows stronger with use.

[27:00] Fellow Amara: Thank you all for such thoughtful participation today. I'm really proud of how you engaged with this topic.`
  },
  {
    fellowName: "Kwame Mensah",
    groupId: "GRP-002",
    date: new Date("2024-02-11T10:00:00"),
    duration: 48,
    transcript: `[00:00] Fellow Kwame: Hello everyone, let's start.

[00:15] Fellow Kwame: Today we talk about Growth Mindset. Growth Mindset is when you believe you can get better at things. Fixed Mindset is when you think you can't change.

[01:00] Fellow Kwame: Your brain is like a muscle. When you learn, it grows. Scientists have proven this with MRI scans.

[02:30] Fellow Kwame: There was a study by Carol Dweck at Stanford University in 2006 that showed students who were taught Growth Mindset performed better than those who weren't.

[03:15] Student 1: Can I ask a question?

[03:20] Fellow Kwame: Wait, let me finish explaining first.

[04:00] Fellow Kwame: So the key things about Growth Mindset are: one, abilities can be developed. Two, effort matters. Three, learning from failure is important. Four, challenges are opportunities.

[05:30] Fellow Kwame: Does everyone understand?

[05:45] Student 2: I think so...

[06:00] Fellow Kwame: Good. Moving on to the next part of our curriculum.

[06:30] Fellow Kwame: In your workbooks, there's an exercise on page 12. Please complete questions 1 through 5 about identifying fixed versus growth mindset statements.

[10:00] Fellow Kwame: Is everyone done? 

[10:15] Student 3: Not yet, can we have more time?

[10:20] Fellow Kwame: We need to stay on schedule. Let's review the answers.

[15:00] Student 1: I'm confused about question 3.

[15:10] Fellow Kwame: Which part? The question is clear. A growth mindset person would say "I can learn this" not "I'm bad at this."

[20:00] Fellow Kwame: Okay, so to summarize: Growth Mindset good, Fixed Mindset bad. Your brain can grow. Work hard and you'll improve.

[21:00] Student 4: What if you work hard but still fail?

[21:15] Fellow Kwame: Then you didn't work hard enough or you need to try a different strategy. The point is to keep trying.

[22:00] Student 4: But sometimes...

[22:05] Fellow Kwame: Let me finish. The research is very clear on this. Effort equals results.

[25:00] Fellow Kwame: Any other questions? No? Good.

[26:00] Fellow Kwame: Remember for next week, read Chapter 3 in your workbooks about applying Growth Mindset to academics.

[27:00] Fellow Kwame: See you all next session.`
  },
  {
    fellowName: "Zainab Hassan",
    groupId: "GRP-003",
    date: new Date("2024-02-12T15:30:00"),
    duration: 62,
    transcript: `[00:00] Fellow Zainab: Habari everyone! Good afternoon!

[00:20] Students: Habari!

[00:35] Fellow Zainab: How are we all doing today? I see some tired faces!

[01:00] Student 1: We had sports practice this morning, I'm exhausted.

[01:15] Fellow Zainab: Ah, thank you for sharing that. Even though you're tired, you still showed up. That actually connects perfectly to what we're learning today.

[02:00] Fellow Zainab: Today we're going to explore something called Growth Mindset. But before I explain, I want to hear from you - has anyone ever felt like they're just "not good" at something?

[02:40] Student 2: Me. I'm terrible at science.

[02:55] Student 3: I can't draw to save my life.

[03:10] Student 4: Math is impossible for me.

[03:30] Fellow Zainab: Wow, okay. Thank you all for being so honest. Can I tell you something? Five years ago, I thought I was "not a reading person." I avoided books like a plague.

[04:00] Fellow Zainab: But then something changed. Want to know what?

[04:15] Student 1: What happened?

[04:25] Fellow Zainab: I learned that my brain is actually like a muscle. The more I use it, the stronger it gets. When I read difficult books, even though it was frustrating, my brain was building new connections.

[05:20] Fellow Zainab: This is what we call Growth Mindset - it's the belief that your abilities aren't fixed. They can grow and develop through hard work and dedication.

[06:00] Student 2: So you're saying I can get good at science?

[06:15] Fellow Zainab: What do you think? Based on what I just shared?

[06:35] Student 2: Maybe... if I practice more?

[06:50] Fellow Zainab: Yes! And it's not just about practicing more - it's about believing that the practice actually changes your brain. Because it does!

[08:00] Fellow Zainab: Let me ask - Student 3, you said you can't draw. Have you ever learned any skill that was hard at first but got easier?

[08:30] Student 3: Um... I learned to braid hair. At first, my braids were so messy!

[08:45] Fellow Zainab: Exactly! And now?

[08:50] Student 3: Now I can do cornrows, box braids, all of it.

[09:10] Fellow Zainab: That's Growth Mindset in action! Your "drawing brain" can develop the same way your "braiding brain" did. What do you all think about that?

[10:00] Student 4: It makes sense but math still feels impossible.

[10:20] Fellow Zainab: I hear you. It FEELS impossible. That feeling is real and valid. But what if we added one little word - "Math feels impossible... yet."

[10:50] Student 4: Yet?

[11:00] Fellow Zainab: Yet means you're on a journey. You haven't mastered it yet, but you can. How does that feel different?

[11:25] Student 4: Less... final? Like there's still hope?

[11:40] Fellow Zainab: Yes! Exactly! That's the power of Growth Mindset.

[15:00] Fellow Zainab: Now, I want to do something interactive. Let's talk about failure. Student 1, you mentioned being exhausted from sports practice - do you ever mess up during practice?

[15:35] Student 1: All the time! I miss shots, trip over the ball...

[15:50] Fellow Zainab: And what happens after you mess up?

[16:05] Student 1: Coach tells me to try again and focus on what went wrong.

[16:20] Fellow Zainab: Perfect! Your coach understands that failure is where learning happens. When you miss a shot, your brain is collecting data - "okay, that angle didn't work, let me adjust."

[17:30] Fellow Zainab: This is really important everyone - failure isn't the opposite of success. It's part of success. The effort you put in, even when you fail, is what makes your brain grow stronger.

[20:00] Fellow Zainab: Let me check in - is this making sense to everyone? Does anyone need me to explain any part differently?

[20:30] Student 2: I think I get it. It's like... we're not stuck being "bad" at things?

[20:50] Fellow Zainab: Yes! You're not stuck. None of you are stuck. You might be at the beginning of your journey with something, but with effort and the right strategies, you can develop those abilities.

[22:00] Fellow Zainab: Student 3, can you explain Growth Mindset in your own words?

[22:25] Student 3: It's believing that you can get better at things if you work hard and don't give up when it's difficult?

[22:45] Fellow Zainab: Beautiful! You got it. Anyone want to add anything?

[23:10] Student 4: And our brains actually change and grow when we learn new things, like a muscle getting stronger.

[23:30] Fellow Zainab: Perfect! You all understand this so well.

[25:00] Fellow Zainab: Before we wrap up, I want each of you to think of one thing you've been telling yourself you "can't" do. In your mind, I want you to add "yet" to the end of it.

[26:00] Fellow Zainab: This week, I want you to notice when you have a fixed mindset thought - "I'm bad at this" - and practice changing it to "I'm not good at this yet, but I can improve."

[27:30] Fellow Zainab: Thank you all for such wonderful participation today. I'm really grateful for your honesty and engagement. You made this such a rich discussion!

[28:00] Students: Thank you!

[28:15] Fellow Zainab: See you next week, and remember - your brains are growing every day!`
  },
  // RISK FLAG EXAMPLES
  {
    fellowName: "David Mwangi",
    groupId: "GRP-004",
    date: new Date("2024-02-13T09:00:00"),
    duration: 52,
    transcript: `[00:00] Fellow David: Good morning everyone, welcome back.

[00:30] Fellow David: Today we continue with Growth Mindset. Who remembers what we talked about last week?

[01:15] Student 1: That we can get better at things with practice.

[01:30] Fellow David: Good! Yes, your abilities can grow. Now let's dive deeper.

[05:00] Fellow David: I want to hear from each of you - what's something challenging you're facing right now?

[05:45] Student 2: School is really stressful. I have so many exams coming up.

[06:00] Fellow David: Okay, that's normal exam stress. Anyone else?

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

[15:00] Fellow David: So remember everyone, Growth Mindset means believing you can change and improve. Even when things feel dark, you can grow from the challenge.

[20:00] Fellow David: Let's do the workbook exercise on page 15. Student 3, please also complete it.

[25:00] Fellow David: Alright, let's review answers...

[30:00] Session continues with curriculum discussion...`
  },
  {
    fellowName: "Grace Achieng",
    groupId: "GRP-005",
    date: new Date("2024-02-14T13:00:00"),
    duration: 58,
    transcript: `[00:00] Fellow Grace: Hello everyone! Welcome to our Growth Mindset session.

[02:00] Fellow Grace: Today I want to start by asking - has anyone felt stuck or limited by labels people have given you?

[03:00] Student 1: My teachers always say I'm a slow learner.

[03:20] Fellow Grace: Thank you for sharing that. That must be really hard to hear. How does it make you feel?

[03:45] Student 1: Like I'm stupid and will never catch up.

[04:10] Fellow Grace: I'm so glad you shared that feeling with me. It sounds really painful. Can I tell you something about labels like "slow learner"?

[05:00] Fellow Grace: Labels like that are about where you are right now, not where you can go. Your brain has incredible ability to grow and change. This is what we call neuroplasticity.

[06:30] Fellow Grace: Has anyone here learned something new recently that was difficult at first?

[07:00] Student 2: I learned to cook ugali. At first, I kept burning it!

[07:20] Fellow Grace: Perfect example! And now?

[07:30] Student 2: Now I make it perfectly every time.

[07:50] Fellow Grace: So your brain learned! It formed new pathways. The same thing happens with academic subjects. Your brain is like a muscle - the more you exercise it, the stronger it gets.

[10:00] Fellow Grace: This is the core of Growth Mindset - believing that your abilities can develop through dedication and hard work.

[12:00] Fellow Grace: Student 1, when your teacher calls you a "slow learner" - what if you thought of yourself as a "thorough learner" instead? Someone who takes time to deeply understand?

[12:45] Student 1: I never thought of it that way...

[13:00] Fellow Grace: The effort you put in matters more than how fast you get there. Can you think of something you're good at now that was hard before?

[13:40] Student 1: I'm really good at taking care of my younger siblings now, but at first, I had no idea what to do.

[14:00] Fellow Grace: Exactly! You developed that ability. Your academic abilities can develop the same way.

[18:00] Fellow Grace: Now I want everyone to think about this - when you encounter something difficult, what's your first thought?

[18:45] Student 3: Usually "this is too hard" or "I can't do this."

[19:00] Fellow Grace: That's honest, thank you. What if we reframed it to "this is hard, but I can learn strategies to handle it"?

[20:00] Fellow Grace: The difference is huge. One closes the door, the other opens it.

[25:00] Fellow Grace: Let me make sure everyone understands - can someone explain Growth Mindset in their own words?

[25:30] Student 2: It's believing we can get better and smarter with practice and effort?

[25:50] Fellow Grace: Yes! And what's the key thing about our brains?

[26:10] Student 1: They're like muscles that grow when we use them?

[26:25] Fellow Grace: Perfect! You both got it.

[30:00] Fellow Grace: Before we finish, I want to do a quick activity. Everyone close your eyes and think of one thing you've been avoiding because you think you're "not good at it."

[31:00] Fellow Grace: Now, in your mind, tell yourself "I'm not good at this YET, but with effort, I can improve."

[32:00] Fellow Grace: How did that feel different?

[32:30] Student 3: It felt like there was more possibility.

[32:50] Fellow Grace: Exactly! That's the power of Growth Mindset.

[35:00] Fellow Grace: Thank you all for such thoughtful participation today. I really appreciate how you engaged with vulnerability and honesty. That takes courage, and it's how we learn best.

[36:00] Fellow Grace: Remember this week - when you face challenges, remind yourself that your brain is growing. The struggle is where the learning happens.

[37:00] Students: Thank you!`
  },
  {
    fellowName: "John Kimani",
    groupId: "GRP-006",
    date: new Date("2024-02-15T11:00:00"),
    duration: 45,
    transcript: `[00:00] Fellow John: Okay everyone, let's begin. Growth Mindset session.

[01:00] Fellow John: Growth Mindset is very simple. It means you can get smarter if you try hard. Fixed Mindset means you think you can't change.

[02:30] Fellow John: Carol Dweck invented this concept. She's a psychologist at Stanford.

[03:00] Student 1: Can you explain more?

[03:10] Fellow John: I just did. Your brain is like a muscle. Exercise it and it grows.

[04:00] Student 2: But what if you really are bad at something?

[04:15] Fellow John: Then you're not trying hard enough. Growth Mindset says anyone can do anything with effort.

[05:30] Student 3: I failed chemistry three times. I've tried really hard.

[06:00] Fellow John: Maybe chemistry isn't for you. Some people are just better at different things.

[06:30] Student 3: But you just said anyone can do anything?

[06:45] Fellow John: Yes, but realistically, you have to play to your strengths.

[07:30] Student 4: I'm confused now.

[07:45] Fellow John: It's not that complicated. Just believe in yourself and work hard.

[10:00] Fellow John: Now, there's also something called "grit" which is related to Growth Mindset. It means perseverance.

[11:00] Fellow John: And there's also resilience, which is bouncing back from failure.

[12:00] Fellow John: These are all connected concepts in positive psychology.

[13:00] Student 1: How do we actually apply this?

[13:15] Fellow John: By having a positive attitude.

[14:00] Student 2: What if someone has depression? Can they just have a positive attitude?

[14:30] Fellow John: Well, depression is a medical condition. You should see a doctor for that. Maybe try antidepressants.

[15:00] Student 2: I'm not depressed, I was just asking.

[15:15] Fellow John: Oh okay. Well, if you were, you'd need medication probably. Growth Mindset works best for normal people.

[16:30] Fellow John: Anyway, let's get back on track. In your workbooks...

[20:00] Fellow John: Does everyone have their workbooks? Please turn to page 8.

[21:00] Fellow John: Complete the exercise where you identify growth versus fixed mindset statements.

[25:00] Fellow John: Finished? Let's review.

[26:00] Fellow John: Question 1: "I'm not good at math" - that's fixed mindset. "I can improve at math" - that's growth mindset.

[27:00] Fellow John: This is pretty straightforward stuff.

[28:00] Fellow John: Okay, we're out of time. Remember - think positively and work hard. See you next week.`
  },
  {
    fellowName: "Sarah Njeri",
    groupId: "GRP-007",
    date: new Date("2024-02-16T14:00:00"),
    duration: 60,
    transcript: `[00:00] Fellow Sarah: Good afternoon everyone! How's everyone doing today?

[00:45] Student 1: Good!

[00:50] Student 2: Tired but okay.

[01:00] Student 3: I'm alright.

[01:20] Fellow Sarah: I appreciate you all showing up even when you're tired. That actually shows something really important that we'll talk about today.

[02:00] Fellow Sarah: Before we dive in, I want to hear from you - has anyone ever thought "I'm just not smart enough" or "I'll never be good at this"?

[02:45] Multiple students: Yes! / Me! / All the time!

[03:00] Fellow Sarah: Wow, so we all have these thoughts! Thank you for being honest. Can I share a secret? I had those exact thoughts when I was your age.

[03:40] Fellow Sarah: I used to think I was terrible at math. Like, fundamentally bad at it. I would tell people "I'm just not a math person."

[04:20] Fellow Sarah: But then I learned something that changed everything. Want to know what it was?

[04:35] Students: Yes! / What?

[04:50] Fellow Sarah: I learned that my brain is actually like a muscle. When I struggle with math, my brain isn't failing - it's exercising! It's getting stronger.

[05:40] Fellow Sarah: This is called Growth Mindset. It's the belief that your abilities - whether it's math, reading, sports, art, anything - can be developed through hard work and dedication.

[06:30] Fellow Sarah: The opposite is Fixed Mindset - thinking your abilities are set in stone and can't change.

[07:15] Fellow Sarah: Let me ask you all - Student 2, you said you're tired. Why did you still come today?

[07:45] Student 2: I don't know... I wanted to be here?

[08:00] Fellow Sarah: That's effort! That's choosing to show up even when it's hard. That's Growth Mindset in action.

[09:00] Fellow Sarah: Now, when you exercise a muscle, what happens?

[09:20] Student 1: It gets sore!

[09:30] Student 3: It gets bigger and stronger.

[09:45] Fellow Sarah: Exactly! First it's uncomfortable, maybe even painful. But that discomfort is growth happening. Your brain works the same way.

[10:40] Fellow Sarah: When you're struggling with a difficult problem, and your brain feels tired and frustrated - that's not weakness. That's your brain forming new connections and getting stronger.

[12:00] Fellow Sarah: Student 3, can you think of something that was really hard for you at first, but now you can do it easily?

[12:30] Student 3: Um... reading English? When I was younger, I could barely read a sentence. Now I read novels.

[12:55] Fellow Sarah: That's beautiful! And what made the difference?

[13:10] Student 3: I practiced a lot. My mom made me read every day.

[13:30] Fellow Sarah: So your reading ability grew through practice and effort, right? You weren't born a good reader - you became one.

[14:00] Fellow Sarah: This is so important - you BECAME one. Your abilities aren't fixed at birth. They develop.

[15:30] Fellow Sarah: Let's talk about failure for a minute. Student 1, have you ever failed at something?

[16:00] Student 1: Yes, I failed my English exam last term.

[16:15] Fellow Sarah: Thank you for sharing that. I know that's not easy to talk about. How did it feel?

[16:35] Student 1: Terrible. I felt so stupid.

[16:50] Fellow Sarah: Of course you did. Failure hurts. It's supposed to hurt - we're human! But here's the thing about failure from a Growth Mindset perspective...

[17:30] Fellow Sarah: Failure isn't the end of your story. It's information. It's your brain saying "okay, that approach didn't work, let me try a different strategy."

[18:20] Fellow Sarah: Student 1, after you failed that exam, did you give up on English completely?

[18:40] Student 1: No, I studied harder and did better on the next one.

[19:00] Fellow Sarah: There it is! That's Growth Mindset! You took the failure, learned from it, and grew.

[20:00] Fellow Sarah: The effort you put in - even when you failed - that's what made your brain stronger. Not the success, but the effort.

[21:30] Fellow Sarah: Now let me check if everyone's following. Can someone explain Growth Mindset in their own words?

[22:00] Student 2: It's like... believing you can get better at stuff if you work hard?

[22:20] Fellow Sarah: Yes! What else? Anyone want to add?

[22:40] Student 3: That our brains can grow and change, like muscles.

[23:00] Fellow Sarah: Perfect! And Student 1, what about failure? What role does it play?

[23:25] Student 1: Failure is... it helps us learn? It's not the end?

[23:45] Fellow Sarah: Exactly! You all got it!

[25:00] Fellow Sarah: I want to try something now. Everyone think of something you believe you're "bad" at. Got it?

[26:00] Fellow Sarah: Now, I want you to add one word to that thought. Instead of "I'm bad at soccer," try "I'm bad at soccer... YET."

[26:45] Student 2: Oh! That feels different!

[27:00] Fellow Sarah: Right? How does it feel different?

[27:20] Student 2: Like there's still a chance? Like I'm not stuck?

[27:40] Fellow Sarah: Yes! The word "yet" is so powerful. It reminds us we're on a journey.

[28:30] Fellow Sarah: Before we wrap up, I want each of you to share one thing you want to improve at, and we'll add "yet" to it together.

[29:00] Student 1: I want to be better at math.

[29:10] Fellow Sarah: I'm not good at math... yet! What will help you get there?

[29:30] Student 1: Practice and asking for help when I'm confused.

[29:50] Fellow Sarah: Beautiful strategy! Student 2?

[30:10] Student 2: I want to be more confident speaking in class.

[30:25] Fellow Sarah: I'm not confident speaking in class... yet! And your brain will build that confidence through practice, just like a muscle.

[31:00] Fellow Sarah: This week, I want you all to notice your fixed mindset thoughts - those "I can't" or "I'm bad at" thoughts. When you notice them, add "yet" and think about what effort or strategy could help you grow.

[32:00] Fellow Sarah: Thank you all so much for your vulnerability and honesty today. You made this discussion so rich and meaningful. I'm really proud of how you showed up.

[32:45] Students: Thank you! / This was helpful!

[33:00] Fellow Sarah: Remember - your brains are growing every single day. The struggle is where the learning happens. See you next week!`
  },
  {
    fellowName: "Michael Otieno",
    groupId: "GRP-008",
    date: new Date("2024-02-17T10:30:00"),
    duration: 50,
    transcript: `[00:00] Fellow Michael: Good morning class. Let's start the session.

[00:30] Fellow Michael: Today we're learning about Growth Mindset. It's a psychological theory.

[01:15] Fellow Michael: The brain has something called neuroplasticity, which means it can form new neural pathways.

[02:00] Student 1: Can you explain that more simply?

[02:10] Fellow Michael: Neuroplasticity is the brain's ability to reorganize itself by forming new neural connections throughout life.

[02:45] Student 1: I still don't really understand...

[03:00] Fellow Michael: Okay, basically it means your brain can change. Moving on.

[04:00] Fellow Michael: Growth Mindset versus Fixed Mindset is a dichotomy proposed by Carol Dweck in her 2006 research.

[05:00] Fellow Michael: People with Growth Mindset believe in malleable intelligence. People with Fixed Mindset believe in static intelligence.

[06:00] Student 2: What does malleable mean?

[06:15] Fellow Michael: Changeable. Capable of being shaped.

[07:00] Student 3: So Growth Mindset is better?

[07:15] Fellow Michael: According to Dweck's research, yes. Students with Growth Mindset showed higher academic achievement in longitudinal studies.

[08:30] Student 1: Can you give us an example from real life?

[08:45] Fellow Michael: An example would be someone who fails a test but maintains belief in their capacity to improve through additional studying.

[09:30] Student 2: But what if they study really hard and still fail?

[09:50] Fellow Michael: Then they need to analyze their study methods and implement more effective learning strategies.

[10:30] Student 2: What if they've tried everything?

[10:45] Fellow Michael: There's always something else to try. That's the principle of Growth Mindset.

[12:00] Fellow Michael: Now, there are three key components to Growth Mindset: belief in developable abilities, value of effort over innate talent, and learning from setbacks.

[13:30] Fellow Michael: Does everyone have their notebooks? Please write these down.

[15:00] Fellow Michael: We also need to discuss the concept of "grit" which Angela Duckworth researched. It's related to Growth Mindset.

[16:00] Fellow Michael: Grit is perseverance and passion for long-term goals.

[17:00] Student 3: How do we actually use this in our lives?

[17:20] Fellow Michael: By applying the principles. When you face difficulty, remind yourself that your abilities can be developed.

[18:00] Student 3: But how specifically?

[18:15] Fellow Michael: I just explained it. Apply the principles of Growth Mindset to your academic work.

[20:00] Fellow Michael: Let me give you an assignment. For next week, identify three situations where you can apply Growth Mindset thinking.

[21:00] Student 1: Can we discuss some examples now?

[21:15] Fellow Michael: We need to stay on schedule. We still have to cover the next section.

[22:00] Fellow Michael: The neuroscience behind Growth Mindset involves the prefrontal cortex and the process of myelination...

[25:00] Student 2: This is getting confusing.

[25:15] Fellow Michael: It's important to understand the scientific foundation. Pay attention.

[27:00] Fellow Michael: To conclude, Growth Mindset is a researched-backed approach to learning and development. Implementation requires consistent application of these principles.

[28:00] Fellow Michael: Any questions? No? Good. See you next session.`
  },
  {
    fellowName: "Faith Wambui",
    groupId: "GRP-009",
    date: new Date("2024-02-18T13:30:00"),
    duration: 57,
    transcript: `[00:00] Fellow Faith: Habari everyone! Come in, come in! Get comfortable!

[00:30] Students: Habari!

[00:45] Fellow Faith: I'm so happy to see you all today. How is everyone's week going?

[01:15] Student 1: It's been hard. So much homework.

[01:30] Student 2: Same, I'm so stressed.

[01:45] Fellow Faith: It sounds like you're all carrying a lot right now. Thank you for sharing that with me. That honesty is really valuable.

[02:20] Fellow Faith: You know what? The fact that you're here, even with all that stress and homework - that tells me something important about each of you. You're showing up even when it's hard.

[03:00] Fellow Faith: Today we're going to talk about something that might actually help with that stress. It's called Growth Mindset.

[03:40] Fellow Faith: But before I explain, I want to hear from you - has anyone ever felt like they're just "not good" at something? Like it's part of who you are?

[04:20] Student 3: Me. I'm not a science person.

[04:35] Student 4: I'm terrible at sports.

[04:50] Student 1: Math and me don't get along.

[05:10] Fellow Faith: Okay, I love that you're all being so honest. Now let me ask - Student 3, when did you decide you're "not a science person"?

[05:35] Student 3: I don't know... I've just always struggled with it.

[05:50] Fellow Faith: Always, or is it that you haven't found the right way to learn it yet?

[06:15] Student 3: Hmm, I never thought about it like that.

[06:30] Fellow Faith: This is what I want to explore with you today. What if the abilities you think are fixed - like being "a science person" or "a math person" - what if they're actually skills you can develop?

[07:20] Fellow Faith: This is Growth Mindset. It's the belief that your abilities can grow and develop through dedication and hard work.

[08:00] Fellow Faith: Your brain - and this is actually scientific fact - your brain is like a muscle. When you use it, it literally gets stronger. New connections form between brain cells.

[09:00] Fellow Faith: Student 4, you said you're terrible at sports. Have you always been exactly the same at sports, or have you gotten better at any physical activity over time?

[09:35] Student 4: Well... I used to not be able to swim at all. Now I can swim pretty well.

[09:55] Fellow Faith: There it is! You developed that ability! You weren't born knowing how to swim, right?

[10:10] Student 4: No, I learned.

[10:20] Fellow Faith: Exactly. You LEARNED. And your brain and body changed to make that possible. That's Growth Mindset in action.

[11:00] Fellow Faith: The same is true for academic subjects. Student 1, you said math and you don't get along - but what if I told you that "being good at math" isn't something you're born with?

[11:40] Student 1: Really?

[11:50] Fellow Faith: Really! It's a skill you develop, just like swimming. The effort you put in actually changes your brain.

[12:40] Fellow Faith: Now, I need to be honest with you all about something. Growth Mindset doesn't mean everything is easy. It doesn't mean you won't struggle or fail.

[13:20] Fellow Faith: In fact, struggling and failing is where the most learning happens. Can someone tell me about a time you failed at something?

[14:00] Student 2: I failed my history exam last month.

[14:15] Fellow Faith: Thank you for sharing that. I know that's not easy to talk about. How did it feel?

[14:30] Student 2: Awful. I felt so dumb.

[14:45] Fellow Faith: Of course you did. That feeling is completely valid. Failure hurts. But let me ask you - what did you do after you failed?

[15:10] Student 2: I studied harder and asked my friend to help me understand the topics I missed.

[15:30] Fellow Faith: So you put in effort, you sought help, you tried again?

[15:45] Student 2: Yeah.

[15:55] Fellow Faith: That's Growth Mindset! You didn't let the failure define you. You used it as information to help you grow.

[16:40] Fellow Faith: This is really important everyone - the effort matters more than the outcome. When Student 2 studied harder after failing, their brain was growing, forming new connections.

[17:30] Fellow Faith: The grade on the next test is just one moment, but the growth that happened in their brain - that's permanent.

[18:30] Fellow Faith: Let me check if this is making sense. Can someone explain Growth Mindset in their own words?

[19:00] Student 3: It's believing that we can get better at things, not that we're stuck being bad at them?

[19:20] Fellow Faith: Yes! What else? Anyone?

[19:40] Student 4: Our brains are like muscles and grow when we use them?

[20:00] Fellow Faith: Perfect! And Student 1, what about failure? What did we learn about that?

[20:25] Student 1: That it's not the end. It's like... a chance to learn and grow?

[20:45] Fellow Faith: Exactly! You all got it!

[21:30] Fellow Faith: I want to try something now. Everyone think of one thing you've been telling yourself you're "bad" at or you're "not a ___ person." Got something in mind?

[22:15] Students: Yes / Got it / Okay

[22:30] Fellow Faith: Now, I want you to add one word. Instead of "I'm not a math person," try "I'm not a math person... yet."

[23:00] Fellow Faith: How does that feel different?

[23:20] Student 1: It feels like there's hope!

[23:35] Student 2: Like I'm not stuck.

[23:50] Fellow Faith: Yes! The word "yet" is so powerful. It reminds us we're on a journey, not at a dead end.

[24:40] Fellow Faith: Now, being on a journey means we need strategies, right? If you want to get better at something, what kinds of things can help?

[25:20] Student 3: Practice?

[25:30] Student 4: Asking for help when confused?

[25:45] Student 1: Not giving up when it's hard?

[26:00] Fellow Faith: All of these! Yes! And also - learning from mistakes, trying different approaches, being patient with yourself.

[27:00] Fellow Faith: Before we finish, I want to do one more thing. Let's go around and everyone share one thing they want to improve at, and we'll add "yet" to it together. Student 3, want to start?

[27:35] Student 3: I want to be better at science.

[27:45] Fellow Faith: Beautiful! I'm not good at science yet, and I can improve by asking questions when I'm confused and practicing the concepts.

[28:20] Student 4: I want to be more confident.

[28:35] Fellow Faith: I'm not confident yet, but I can build confidence by taking small risks and celebrating small wins.

[29:10] Fellow Faith: This is wonderful everyone. This week, I want you to notice when you have fixed mindset thoughts - those "I can't" or "I'm not good at" thoughts. When you catch yourself, add "yet" and think about what effort or strategy could help.

[30:00] Fellow Faith: Also, when things get hard - and they will, that's normal - remember that the struggle is where your brain grows. The discomfort means you're learning.

[31:00] Fellow Faith: Thank you all so much for your openness and honesty today. You made this session so meaningful. I'm really grateful for each of you.

[31:40] Students: Thank you! / This was really helpful!

[32:00] Fellow Faith: Remember - you're not stuck. You're growing. Your brains are getting stronger every day. See you next week!`
  },
  {
    fellowName: "Peter Ochieng",
    groupId: "GRP-010",
    date: new Date("2024-02-19T15:00:00"),
    duration: 44,
    transcript: `[00:00] Fellow Peter: Okay everyone, settle down. We're starting.

[00:30] Fellow Peter: Today is about Growth Mindset. You've probably heard of it before.

[01:00] Student 1: Not really, what is it?

[01:10] Fellow Peter: It's when you believe you can get smarter through effort.

[01:45] Fellow Peter: There's two types of mindsets - growth and fixed. Growth is good, fixed is bad.

[02:30] Student 2: Why is fixed mindset bad?

[02:45] Fellow Peter: Because if you have fixed mindset, you think you can't improve, so you don't try.

[03:20] Fellow Peter: Your brain is like a muscle. Use it and it gets stronger. Don't use it and it stays weak.

[04:00] Student 3: How do we make our brains stronger?

[04:15] Fellow Peter: By studying hard and not giving up.

[05:00] Student 1: What if we study hard but still don't understand?

[05:15] Fellow Peter: Then study harder.

[06:00] Student 1: But...

[06:05] Fellow Peter: Look, the concept is simple. If you put in effort, you'll improve. If you don't, you won't. That's Growth Mindset.

[07:30] Fellow Peter: Now, I'm going to give you an example. Thomas Edison failed 1,000 times before inventing the light bulb. That's Growth Mindset.

[08:30] Student 2: What kept him going?

[08:45] Fellow Peter: He believed he could do it. That's the point.

[09:30] Fellow Peter: You all need to believe in yourselves more. That's what this is about.

[10:15] Student 3: Sometimes believing doesn't feel like enough though...

[10:30] Fellow Peter: That's negative thinking. You need to stay positive.

[11:00] Student 3: I'm just saying sometimes things are really hard.

[11:15] Fellow Peter: Of course they're hard. That's when you need Growth Mindset the most.

[12:00] Fellow Peter: Okay, let's move on. In your workbooks, there's an exercise.

[13:00] Fellow Peter: Turn to page 10 and complete the matching activity. Match the growth mindset statement with the correct situation.

[15:00] Fellow Peter: Is everyone done?

[15:30] Student 1: Almost...

[15:40] Fellow Peter: Hurry up, we need to review.

[17:00] Fellow Peter: Okay, let's go through the answers. Number 1 - the growth mindset response is "I can learn from this mistake."

[18:00] Fellow Peter: Number 2 - "With practice, I'll get better."

[19:00] Fellow Peter: This is pretty straightforward stuff.

[20:00] Student 2: Can you explain more about how to actually apply this?

[20:15] Fellow Peter: Just remember - when something is hard, tell yourself you can do it with effort. That's applying it.

[21:00] Student 2: But what specific steps...

[21:10] Fellow Peter: The specific step is to have a growth mindset! I've explained this already.

[22:00] Fellow Peter: Look, you're all overthinking this. It's about attitude and effort. Be positive and work hard.

[23:00] Fellow Peter: Does everyone understand now?

[23:15] Student 3: I think so...

[23:25] Fellow Peter: Good. Remember for next week - practice having a growth mindset in your daily life.

[24:00] Fellow Peter: We're done for today. See you next session.`
  }
];

async function main() {
  console.log('🌱 Starting seed...');

  // Create supervisor
  const supervisor = await prisma.supervisor.create({
    data: {
      name: 'Dr. Kamau Mwangi',
      email: 'kamau.mwangi@shamiri.org',
    },
  });

  console.log('✅ Created supervisor:', supervisor.name);

  // Create fellows and sessions
  for (const transcript of THERAPY_TRANSCRIPTS) {
    // Create or find fellow
    const fellow = await prisma.fellow.upsert({
      where: { 
        id: transcript.fellowName.toLowerCase().replace(' ', '-')
      },
      update: {},
      create: {
        id: transcript.fellowName.toLowerCase().replace(' ', '-'),
        name: transcript.fellowName,
        cohort: '2024-Q1',
        supervisorId: supervisor.id,
      },
    });

    // Create session
    const session = await prisma.session.create({
      data: {
        fellowId: fellow.id,
        groupId: transcript.groupId,
        sessionDate: transcript.date,
        transcript: transcript.transcript,
        durationMinutes: transcript.duration,
      },
    });

    console.log(`✅ Created session for ${fellow.name} (${session.groupId})`);
  }

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });