# Shamiri Supervisor Copilot

A web-based AI-powered dashboard that amplifies a Supervisor's capacity to review therapy sessions conducted by Shamiri Fellows.

![Dashboard Preview](public/dashboard-preview.png)

## 🌍 Live Demo

**Production URL**: [shamiri-supervisor-copilot.vercel.app](https://shamiri-supervisor-copilot.vercel.app)

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

## 🔄 Human-in-the-Loop

AI is imperfect. Every AI finding can be overridden by a Supervisor:

1. Supervisor reviews AI assessment
2. Clicks **"Review & Override"**
3. Writes reasoning in notes field
4. Selects new status (Safe / Risk)
5. Override saved to `SupervisorOverride` table with full audit trail

This creates accountability and improves trust in the system.

---

## 🚀 Scaling Strategy: Serving 10 Million Youths

> *"As we scale to serve 10 million youths, our Supervisors are facing a quality assurance bottleneck."*

This is not just a technical challenge - it's a mission-critical requirement. Here's how this architecture scales:

### Current Implementation

The current system is designed for **early-scale deployment** (~1,000 active users):

| Component | Current Implementation | Capacity |
|-----------|----------------------|----------|
| **Hosting** | Vercel Serverless | Auto-scales to thousands |
| **Database** | Neon Serverless Postgres | 500MB, ~10K sessions |
| **AI Analysis** | Synchronous OpenAI calls | ~30s per analysis |
| **Caching** | None (direct DB queries) | Sufficient for demo |
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

### Specific Improvements Roadmap

#### Phase 1: 10K Users (Next 6 months)
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
```

#### Phase 2: 100K Users (6-12 months)
```markdown
- [ ] Switch to GPT-4o-mini for standard sessions
      WHY: 10x cheaper than GPT-4o, 90% as accurate
      IMPACT: Cost drops from $300K to $30K/month
      
- [ ] Batch API for bulk analysis
      WHY: OpenAI Batch API is 50% cheaper
      IMPACT: Analyze 1,000 sessions overnight at half cost
      
- [ ] Read replicas for database
      WHY: Separate read/write traffic
      IMPACT: Dashboard queries don't compete with writes
```

#### Phase 3: 1M+ Users (12-24 months)
```markdown
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
```

### Cost Projection at Scale

| Scale | Sessions/Month | Without Optimization | With Optimization |
|-------|---------------|---------------------|-------------------|
| 1K users | 10,000 | $300 | $30 |
| 10K users | 100,000 | $3,000 | $150 |
| 100K users | 1,000,000 | $30,000 | $600 |
| 1M users | 10,000,000 | $300,000 | $3,000 |

*Optimization includes: caching (80% hit rate) + GPT-4o-mini (90% of sessions) + Batch API*

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

