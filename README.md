# Shamiri Supervisor Copilot

A web-based AI-powered dashboard that amplifies a Supervisor's capacity to review therapy sessions conducted by Shamiri Fellows.

![Dashboard Preview](public/dashboard-preview.png)

## 🌍 Live Demo

**Production URL**: [https://shamiri-supervisor-copilot-u7yx-3rvrpi5ot.vercel.app/session/1](https://shamiri-supervisor-copilot-u7yx-3rvrpi5ot.vercel.app/session/1)

**Demo Credentials**:
- Email: `kamau@shamiri.org`
- Password: `demo123`

---

## 🎯 What This Solves

At Shamiri, Fellows (18-22 year old lay providers) deliver group therapy sessions to young people across Kenya. Supervisors are responsible for reviewing these sessions to ensure quality and safety - but they cannot listen to every single 1-hour recording.

The Shamiri Supervisor Copilot uses Generative AI to:
- Automatically analyze session transcripts
- Score Fellows on 3 quality metrics
- Flag sessions with safety concerns (self-harm, crisis)
- Allow Supervisors to validate or override AI findings

This transforms a Supervisor's capacity from reviewing **5 sessions/week** to **50+ sessions/week**.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 15 (App Router) | React framework with server components |
| **Language** | TypeScript | Type safety across the entire codebase |
| **Styling** | Tailwind CSS | Utility-first responsive styling |
| **Database** | PostgreSQL (Neon) | Serverless Postgres for sessions, fellows, analyses |
| **ORM** | Prisma | Type-safe database queries with migrations |
| **AI** | OpenAI GPT-4o | Session transcript analysis |
| **Validation** | Zod | Structured AI output validation |
| **Deployment** | Vercel | Serverless hosting with edge network |

---

## ⚙️ Setup & Installation

### Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- A [Neon](https://neon.tech) account (free tier works)
- An [OpenAI](https://platform.openai.com) API key

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/shamiri-supervisor-copilot.git
cd shamiri-supervisor-copilot
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:
```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://username:password@ep-xxx.neon.tech/dbname?sslmode=require"

# AI
OPENAI_API_KEY="sk-proj-your-key-here"

# Auth
NEXTAUTH_SECRET="your-random-secret-string"
NEXTAUTH_URL="http://localhost:3000"
```

#### Getting Your Credentials:

**Neon Database URL:**
1. Go to [console.neon.tech](https://console.neon.tech)
2. Create a new project
3. Copy the **Connection String** from the dashboard
4. Paste it as `DATABASE_URL`

**OpenAI API Key:**
1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Click **Create new secret key**
3. Copy and paste as `OPENAI_API_KEY`

**NextAuth Secret:**
```bash
# Generate a random secret
openssl rand -base64 32
```

### 4. Set Up the Database
```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Seed with sample data
npm run seed
```

### 5. Start the Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

Login with:
- **Email**: kamau@shamiri.org
- **Password**: demo123

---

## 🗄️ Database Schema
```
Supervisor
    │
    └── Fellow (many)
            │
            └── Session (many)
                    │
                    ├── AIAnalysis (many - tracks history)
                    ├── RiskFlag (many)
                    └── SupervisorOverride (many)
```

### Models:

**Supervisor** - The person using this dashboard
```
id, name, email, createdAt
```

**Fellow** - The lay provider conducting sessions
```
id, name, cohort, supervisorId
```

**Session** - A recorded therapy session
```
id, fellowId, groupId, sessionDate, transcript, durationMinutes, status
```

**AIAnalysis** - Structured AI output for a session
```
id, sessionId, modelVersion
contentScore, contentEvidence, contentReasoning
facilitationScore, facilitationEvidence, facilitationReasoning
protocolScore, protocolEvidence, protocolReasoning
riskFlag, riskSeverity, riskConfidence, riskQuotes
```

**SupervisorOverride** - Human-in-the-loop decisions
```
id, analysisId, supervisorId, action, previousFlag, newFlag, notes
```

---

## 🤖 AI Analysis Engine

### How It Works

When a Supervisor clicks "Run AI Analysis" on a session:
```
1. Transcript sent to GPT-4o with structured prompt
        ↓
2. AI evaluates 3 quality metrics (scored 1-3)
        ↓
3. AI performs risk assessment (SAFE or RISK)
        ↓
4. Output validated against Zod schema
        ↓
5. Result saved to PostgreSQL
        ↓
6. UI updates with scores, evidence, and risk flags
```

## 🔄 Human-in-the-Loop: Supervisor Override

AI is not perfect. Every AI assessment can be reviewed and overridden by a Supervisor to ensure accuracy and build trust.

### How It Works
```
AI flags session as RISK
    ↓
Supervisor reviews transcript and AI reasoning
    ↓
Supervisor disagrees: "This is a false positive"
    ↓
Clicks "Review & Override"
    ↓
Provides written justification
    ↓
Changes status to SAFE
    ↓
Override saved to database with full audit trail
```

### Why This Matters

**Accountability**: Every override is tracked with:
- Who made the decision
- When it was made  
- Why they disagreed with the AI
- What the previous status was
- What the new status is

**Trust**: Supervisors remain in control - the AI is a tool, not a decision-maker.

**Continuous Improvement**: Override data can be used to:
- Identify patterns in AI errors
- Fine-tune the model
- Improve prompt engineering
- Reduce false positives over time

### Example Scenario

**AI Assessment:**
```
🚨 RISK DETECTED
Quote: "I've been thinking about ending it all"
Confidence: 95%
```

**Supervisor Review:**
The supervisor reads the full transcript and discovers the student was discussing the ending of a novel for their literature class assignment.

**Override:**
```
Action: REJECT (AI was wrong)
Previous Status: RISK
New Status: SAFE
Notes: "Student was discussing the book 'The Great Gatsby' 
        for their English class. No actual self-harm intent. 
        Context matters - this is why human review is essential."
```

**Result:**
- Session status updated to "Safe"
- Risk flag marked as resolved
- Override logged for audit and training purposes
- Supervisor's decision documented for accountability

### Database Schema

Every override creates a `SupervisorOverride` record:
```typescript
{
  id: "override_123",
  analysisId: "analysis_abc",      // Links to AI analysis
  supervisorId: "supervisor_1",    // Who made the call
  action: "REJECT",                // VALIDATE | REJECT | MODIFY
  previousFlag: "RISK",            // What AI said
  newFlag: "SAFE",                 // What supervisor decided
  notes: "Student discussing fiction, not reality",
  createdAt: "2024-02-19T10:30:00Z"
}
```

This creates a complete audit trail for compliance and quality assurance.

### API Endpoint
```
POST /api/sessions/{sessionId}/override

Request Body:
{
  "newStatus": "SAFE" | "RISK",
  "notes": "Explanation for override decision"
}

Response:
{
  "success": true,
  "override": {
    "id": "...",
    "action": "REJECT",
    "previousFlag": "RISK",
    "newFlag": "SAFE"
  },
  "sessionStatus": "Safe"
}
```

---

### Quality Metrics

**Metric 1: Content Coverage** - Did the Fellow teach Growth Mindset?
- `3 (Complete)`: Explained concept, gave examples, checked understanding
- `2 (Partial)`: Mentioned concept but didn't engage deeply
- `1 (Missed)`: Failed to cover Growth Mindset

**Metric 2: Facilitation Quality** - How did they deliver it?
- `3 (Excellent)`: Warm, empathetic, open questions, validated feelings
- `2 (Adequate)`: Polite but transactional, minimal engagement
- `1 (Poor)`: Dominated conversation, interrupted students

**Metric 3: Protocol Safety** - Did they stay within boundaries?
- `3 (Adherent)`: Stayed on curriculum, handled distractions well
- `2 (Minor Drift)`: Got distracted but returned to topic
- `1 (Violation)`: Gave unauthorized medical/relationship advice

### Risk Detection

The AI flags sessions as `RISK` **only** when there is explicit mention of:
- Self-harm with plan or intent
- Suicide with specificity
- Abuse currently happening

This high threshold is intentional - false positives desensitize supervisors.

---

## 🚀 Scaling Strategy: Serving 10 Million Youths

> *"As we scale to serve 10 million youths, our Supervisors are facing a quality assurance bottleneck."*

Here's how this architecture scales:

### Current Implementation

The current system is designed for **early-scale deployment** (~1,000 active users):

| Component | Current Implementation | Capacity |
|-----------|----------------------|----------|
| **Hosting** | Vercel Serverless | Auto-scales to thousands |
| **Database** | Neon Serverless Postgres | 500MB, ~10K sessions |
| **AI Analysis** | Synchronous OpenAI calls | ~30s per analysis |
| **Auth** | Simple credential check | 1 supervisor |

### Bottlenecks at 10M Users

As Shamiri scales, three bottlenecks will emerge:
```
1. AI COST EXPLOSION
   10M sessions × $0.03/analysis = $300,000/month
   
2. DATABASE OVERLOAD  
   10K supervisors × 50 queries/hour = 500K queries/hour
   
3. AI LATENCY
   30 second analysis blocks supervisor workflow
```

### Future Architecture for 10M Users
```
┌─────────────────────────────────────────────────┐
│           VERCEL EDGE NETWORK                   │
│     (175+ global locations, Kenya included)     │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│              NEXT.JS APP LAYER                  │
│  • Server Components (zero client JS overhead) │
│  • Edge Functions (runs close to Nairobi)      │
│  • Optimistic UI updates                       │
└─────────────────────────────────────────────────┘
        ↓                ↓                ↓
┌──────────────┐  ┌────────────┐  ┌─────────────┐
│    REDIS     │  │  POSTGRES  │  │  JOB QUEUE  │
│  (Upstash)   │  │   (Neon)   │  │  (Inngest)  │
│              │  │            │  │             │
│ • Session    │  │ • All data │  │ • AI jobs   │
│   list cache │  │ • Indexes  │  │ • Retries   │
│ • Analysis   │  │ • Pooling  │  │ • Batch     │
│   cache(24h) │  │            │  │   analysis  │
└──────────────┘  └────────────┘  └─────────────┘
                                        ↓
                               ┌─────────────────┐
                               │   OPENAI API    │
                               │ • GPT-4o-mini   │
                               │   (cost saving) │
                               │ • Batch API     │
                               │   (50% cheaper) │
                               └─────────────────┘
```

### Specific Improvements 

```markdown
- [ ] Redis caching (Upstash)
      WHY: Reduce database load by 80%
      IMPACT: Dashboard loads in <100ms instead of 500ms
      
- [ ] Background job queue (Inngest)
      WHY: AI analysis takes 30s - don't block the UI
      IMPACT: Supervisor gets instant "queued" response
      
- [ ] Database connection pooling (PgBouncer)
      WHY: Neon has connection limits
      IMPACT: Handle 1,000 concurrent supervisors

- [ ] Switch to GPT-4o-mini for standard sessions
      WHY: 10x cheaper than GPT-4o, 90% as accurate
      IMPACT: Cost drops from $300K to $30K/month
      
- [ ] Batch API for bulk analysis
      WHY: OpenAI Batch API is 50% cheaper
      IMPACT: Analyze 1,000 sessions overnight at half cost
      
- [ ] Read replicas for database
      WHY: Separate read/write traffic
      IMPACT: Dashboard queries don't compete with writes

- [ ] Fine-tuned model on Shamiri data
      WHY: Custom model trained on real session data
      IMPACT: 10x cheaper, more accurate, culturally aware
      
- [ ] Multilingual support (Swahili, Kikuyu, Luo)
      WHY: Kenya is multilingual, sessions include code-switching
      IMPACT: More accurate analysis of real transcripts
      
- [ ] Offline-first mobile app
      WHY: Rural Kenya has unreliable internet
      IMPACT: Fellows can record sessions offline, sync later
      
- [ ] Real-time audio transcription
      WHY: Manual transcript creation is a bottleneck
      IMPACT: Automatic transcription eliminates data entry

- [ ] Use OpenAI streaming API + Vercel streaming helpers
      WHY: AI analysis is a single blocking call (15-30 seconds)
      IMPACT: Real-time progress updates ("Analyzing content... 33%")
```

### African Context Considerations

Scaling for Shamiri is not just about technology - it's about context:
```markdown
- LOW BANDWIDTH: UI optimized for 2G/3G connections
  Current: Minimal JS bundle, no heavy images
  Future: Progressive loading, offline support

- CODE SWITCHING: Kenyan sessions mix English + Swahili
  Current: AI prompt acknowledges African context
  Future: Fine-tuned model trained on Kenyan speech patterns

- MOBILE FIRST: Supervisors use smartphones, not laptops
  Current: Responsive Tailwind CSS
  Future: Dedicated mobile app (React Native)

- POWER RELIABILITY: Intermittent electricity in rural areas
  Current: Auto-save analysis results
  Future: Offline-capable PWA with background sync
```

---

## 🤝 AI Collaboration Report

As required by the assignment, here is a transparent breakdown of AI usage:

### Code Generated with AI Assistance (~60%)

| Component | AI Tool Used | What Was Generated |
|-----------|-------------|-------------------|
| Prisma schema | Claude | Initial model design |
| API routes | Cursor/Copilot | Boilerplate structure |
| Tailwind UI | Claude | Component styling |
| Zod schemas | Claude | Validation schemas |
| Seed data | Claude | Synthetic transcripts |

### Hand-Written Code (~40%)

| Component | Why Hand-Written |
|-----------|----------------|
| AI prompt engineering | Business logic - must understand deeply |
| Risk detection thresholds | Safety-critical - cannot delegate |
| Database query optimization | Performance - requires domain knowledge |
| Auth flow | Security-critical - requires careful review |
| Scaling architecture | Architecture decisions require expertise |

### Verification Process

Every AI-generated piece of code was verified by:

1. **TypeScript strict mode** - All code passes type checking
2. **Manual review** - Read every line before accepting
3. **Testing** - Ran locally and verified output
4. **Security check** - Reviewed for injection, auth bypass risks
5. **Logic validation** - Verified business logic matches requirements

### Key Learning

> *"I used AI to move fast on boilerplate, but hand-coded all business logic. This ensures I deeply understand every system decision and can defend them in a technical interview."*

---

## 📁 Project Structure
```
shamiri-supervisor-copilot/
├── prisma/
│   ├── schema.prisma          # Database models
│   └── migrations/            # SQL migration history
├── scripts/
│   └── seed.ts                # Database seeding script
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── login/
│   │   │   │       └── route.ts
│   │   │   └── sessions/
│   │   │       ├── route.ts          # GET all sessions
│   │   │       └── [id]/
│   │   │           ├── route.ts      # GET single session
│   │   │           └── analyze/
│   │   │               └── route.ts  # POST trigger analysis
│   │   ├── dashboard/
│   │   │   └── page.tsx       # Main supervisor dashboard
│   │   ├── login/
│   │   │   └── page.tsx       # Login page
│   │   ├── session/
│   │   │   └── [id]/
│   │   │       └── page.tsx   # Session detail + AI analysis
│   │   └── page.tsx           # Root redirect
│   └── lib/
│       ├── ai-service.ts      # OpenAI integration
│       ├── analysis-schema.ts # Zod validation schemas
│       ├── auth.ts            # Authentication logic
│       ├── mock-data.ts       # Development mock data
│       └── prisma.ts          # Database client
├── .env                       # Environment variables (not committed)
├── vercel.json                # Vercel deployment config
└── README.md                  # This file
```

---

## 🔒 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ Yes | Neon PostgreSQL connection string |
| `OPENAI_API_KEY` | ✅ Yes | OpenAI API key for analysis |
| `NEXTAUTH_SECRET` | ✅ Yes | Random string for session encryption |
| `NEXTAUTH_URL` | ✅ Yes | Your deployment URL |

---

## License

