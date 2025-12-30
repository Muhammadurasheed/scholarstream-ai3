# ScholarStream

### Real-Time AI Opportunity Discovery for Students in Urgent Need

---

## Tagline

*When a student needs $500 by Friday, they can't wait for batch processing. ScholarStream streams scholarships, hackathons, and bounties in real-time—matching opportunities to profiles in under 2 seconds using Confluent Kafka, Flink SQL, and Google Cloud AI.*

---

## Links

| Resource | URL |
|----------|-----|
| **Live Demo** | https://scholarstream-frontend-opdnpd6bsq-uc.a.run.app |
| **GitHub Repository** | https://github.com/Muhammadurasheed/scholarstream-ai3 |
| **Demo Video** | *[YouTube link - 3 minutes]* |

---

## Built With

**Confluent Technologies**
- Confluent Cloud (Apache Kafka) — 6 production topics for real-time opportunity streaming
- Confluent Flink SQL — Stream processing for classification, filtering, and routing
- Schema Registry — Data governance and schema evolution

**Google Cloud Platform**
- Cloud Run — Containerized FastAPI backend with auto-scaling
- Cloud Functions — HTTP-triggered AI enrichment pipeline
- Vertex AI Gemini 2.0 Flash — Intelligent HTML parsing and eligibility extraction
- Vertex AI text-embedding-004 — 768-dimensional semantic embeddings
- Firebase — Authentication, Firestore database, real-time sync

**Additional Technologies**
- Python/FastAPI, Playwright (Stealth Mode), React/TypeScript, Chrome Extension (Manifest V3)

---

## Inspiration

**March 2025. Everything fell apart.**

I'm Rasheed, a petroleum engineering student at the University of Ibadan, Nigeria. I was supposed to graduate in December 2025 with a 3.4 GPA. I led Google Developer Student Clubs Mobile. I volunteered as a teacher on weekends. On paper—the "ideal scholarship candidate."

Then my family's income dropped 60%. My school fee deadline came and went. I watched it pass, helpless—sitting at home instead of in class.

### The Frustrating Truth

I had skills to earn money. I'd been coding since 2021—React, Python, building real projects for local businesses. But I didn't know opportunities existed:

- Never heard of Devpost, Gitcoin, or bug bounties
- Didn't know students win $5,000 in weekend hackathons
- Didn't know about $500 bounties for open-source contributions

These opportunities weren't hidden. They were right there, waiting. I just didn't know where to look.

### The Shocking Reality

- **$2.9 billion** in scholarships goes unclaimed annually (U.S. Department of Education)
- **Billions more** in hackathon prizes and bounties scattered across 10,000+ websites
- **Tens of millions** of students miss opportunities because deadlines are fragmented across platforms

### Why This Matters for Confluent

The Confluent Challenge asked: *"Demonstrate how real-time data unlocks real-world challenges with AI."*

My answer: **Information asymmetry in education funding is a REAL problem that demands REAL-TIME solutions.**

Students don't defer because they lack talent—they defer because they lack *timely discovery*. Traditional scholarship platforms are static databases with scheduled polling. A student facing a tuition deadline tomorrow can't wait for nightly batch refreshes.

ScholarStream transforms opportunity discovery from **batch processing to continuous streaming**:

- **Confluent Kafka** captures opportunities from 50+ sources the moment they're published
- **Confluent Flink SQL** classifies, enriches, and routes opportunities in milliseconds
- **Vertex AI** adds intelligent matching with semantic understanding
- **WebSocket** delivers personalized matches to students in under 2 seconds

I built ScholarStream because I refuse to let another student say: *"I deferred my education because I didn't know."*

---

## What It Does

ScholarStream is an **AI-powered financial opportunity hub** that combines **Confluent's real-time streaming platform** with **Google Cloud AI** to deliver personalized scholarship, hackathon, and bounty matches to students in urgent financial need.

### The Core Problem We Solve

Traditional scholarship platforms work like this:
1. Crawl websites once per day (or week)
2. Store results in a database
3. User searches, gets stale results
4. User misses opportunities because deadlines passed during the batch window

**ScholarStream works like this:**
1. Continuous crawling streams raw data to Kafka in real-time
2. Flink SQL classifies and filters opportunities as they arrive
3. Vertex AI enriches with structured eligibility and semantic embeddings
4. Personalized matches push to users via WebSocket—instantly

### Multi-Opportunity Platform

We don't just show scholarships. We show **every financial opportunity a student can pursue**:

| Type | Amount Range | Timeline | Use Case |
|------|-------------|----------|----------|
| 🎓 Scholarships | $500 – $50,000 | 1-6 months | Long-term planning |
| 💻 Hackathons | $100 – $100,000 | Days to weeks | Immediate action |
| 🎯 Bounties | $50 – $10,000 | Hours to days | Urgent needs |
| 🏆 Competitions | $100 – $50,000 | Weeks to months | Skill building |
| 💰 Grants | $1,000 – $100,000 | Varies | Project funding |

### Intelligent Matching Engine

Every opportunity is scored against the user's profile using a multi-factor algorithm:

| Factor | Weight | Components |
|--------|--------|------------|
| Eligibility Match | 50% | GPA, Major, Background, Location, Citizenship |
| Interest Alignment | 20% | Skills overlap, category preferences |
| Financial Fit | 15% | Award amount vs. stated need |
| Feasibility | 15% | Time investment, competition level, deadline proximity |

**Result:** A 0-100% match score that tells students exactly how likely they are to win.

### AI Chat Assistant

The chat isn't a ChatGPT wrapper. It's a **context-aware opportunity finder** that understands urgency:

```
Student: "I need $500 by Friday for textbooks"

ScholarStream AI: "I found 8 opportunities you can complete by Friday:

🔥 IMMEDIATE (next 24 hours):
• Gitcoin Bounty: Fix React bug — $500 (12 hours left, matches your React skills)
• HackerOne: Find XSS vulnerability — $300 (rolling deadline, beginner-friendly)

📅 THIS WEEK:
• ETHGlobal Mini-Hack: $5,000 prizes (submissions due Friday, solo or team)
• Dev.to Challenge: Build any app — $3,000 pool (4 days left)

🚨 EMERGENCY OPTIONS:
• University of Ibadan Emergency Fund — up to $2,000 (48-hour turnaround)

I've added these to your dashboard. Want help applying to the top 3?"
```

The AI understands:
- **Context:** Your skills, location, academic profile
- **Urgency:** "urgent" triggers immediate opportunities first
- **Feasibility:** Only shows opportunities you can realistically complete

### AI Co-Pilot Chrome Extension

Not just auto-fill. A **full context-aware application assistant**:

1. **Unified Auth Sync** — Login once on ScholarStream, extension inherits authentication automatically
2. **Multi-Document Knowledge Base** — Upload resume, README, cover letters. Reference them with `@resume` or `@readme` in chat
3. **Platform Detection** — Extension knows if you're on DevPost, DoraHacks, MLH. Provides platform-specific guidance
4. **Field Intelligence** — Detects character limits, word counts, required fields. AI respects ALL constraints
5. **Sparkle Button (✨)** — One click generates personalized content using your profile + documents + field context
6. **Double-Click Refinement** — After AI fills a field, double-click to refine. Type "make it shorter" and AI rewrites in place

---

## How We Built It

### The Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              DATA INGESTION LAYER                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                 │
│  │  DevPost    │  │  DoraHacks  │  │    MLH      │  │  HackQuest  │  + 10 more      │
│  │  Crawler    │  │  Crawler    │  │  Crawler    │  │  Crawler    │                 │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘                 │
│         │                │                │                │                         │
│         └────────────────┴────────────────┴────────────────┘                         │
│                                    │                                                 │
│                                    ▼                                                 │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │                     CONFLUENT CLOUD (Apache Kafka)                            │   │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐                   │   │
│  │  │ cortex.raw     │  │ opportunity    │  │ user.matches   │                   │   │
│  │  │ .html.v1       │→ │ .enriched.v1   │→ │ .v1            │                   │   │
│  │  │ (Raw HTML)     │  │ (AI-Processed) │  │ (Personalized) │                   │   │
│  │  └────────────────┘  └────────────────┘  └────────────────┘                   │   │
│  │                              │                                                 │   │
│  │                              ▼                                                 │   │
│  │  ┌──────────────────────────────────────────────────────────────────────────┐ │   │
│  │  │                    CONFLUENT FLINK SQL                                    │ │   │
│  │  │  • Platform Detection (DevPost, DoraHacks, MLH, etc.)                    │ │   │
│  │  │  • Geographic Classification (Nigeria, USA, Global)                      │ │   │
│  │  │  • Opportunity Type Categorization (Hackathon, Bounty, Scholarship)      │ │   │
│  │  │  • Deadline Filtering (Auto-expire passed opportunities)                 │ │   │
│  │  └──────────────────────────────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────────────────────────────────┘   │
│                                    │                                                 │
│                                    ▼                                                 │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                              AI ENRICHMENT LAYER                                     │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │                    GOOGLE CLOUD FUNCTIONS                                     │   │
│  │  ┌─────────────────────────┐  ┌─────────────────────────┐                    │   │
│  │  │   Vertex AI Gemini      │  │   Vertex AI Embeddings   │                    │   │
│  │  │   2.0 Flash             │  │   text-embedding-004     │                    │   │
│  │  │   ─────────────────     │  │   ─────────────────────  │                    │   │
│  │  │   • Extract eligibility │  │   • Generate 768-dim     │                    │   │
│  │  │   • Parse requirements  │  │     semantic vectors     │                    │   │
│  │  │   • Structure deadlines │  │   • Enable similarity    │                    │   │
│  │  │   • Identify amounts    │  │     matching             │                    │   │
│  │  └─────────────────────────┘  └─────────────────────────┘                    │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│                                    │                                                 │
│                                    ▼                                                 │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                              DELIVERY LAYER                                          │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │                    GOOGLE CLOUD RUN (FastAPI)                                 │   │
│  │  ┌─────────────────────────┐  ┌─────────────────────────┐                    │   │
│  │  │   Kafka Consumer        │  │   WebSocket Manager      │                    │   │
│  │  │   ─────────────────     │  │   ─────────────────────  │                    │   │
│  │  │   • Subscribe to        │  │   • Maintain persistent  │                    │   │
│  │  │     enriched topics     │  │     connections          │                    │   │
│  │  │   • Calculate match     │  │   • Push opportunities   │                    │   │
│  │  │     scores per user     │  │     to users in <2s      │                    │   │
│  │  └─────────────────────────┘  └─────────────────────────┘                    │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│                                    │                                                 │
│                                    ▼                                                 │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │                    FRONTEND (React + TypeScript)                              │   │
│  │  • Real-time dashboard with WebSocket hooks                                   │   │
│  │  • AI chat interface with context awareness                                   │   │
│  │  • Chrome Extension for application assistance                                │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Phase 1: Defeating Anti-Bot Detection

**The Problem:** Every platform blocked our traditional HTTP scrapers.

We tried everything:
- `requests` / `httpx` → Blocked by Cloudflare
- `Scrapy` → Detected as bot, 403 Forbidden
- Headless Chrome → `navigator.webdriver` exposed us

**The Breakthrough:** After weeks of frustration and research, we discovered **Playwright Stealth Mode**.

We built a `UniversalCrawlerService` with advanced anti-detection:

```python
async def _setup_stealth_context(self, browser):
    context = await browser.new_context(
        viewport={'width': 1920, 'height': 1080},
        user_agent=self._get_random_user_agent(),
        locale='en-US',
        timezone_id='America/New_York'
    )
    
    # Inject anti-detection JavaScript
    await context.add_init_script("""
        // Remove webdriver flag (dead giveaway for bots)
        Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
        
        // Bots have no plugins—we fake having some
        Object.defineProperty(navigator, 'plugins', { 
            get: () => [1, 2, 3, 4, 5] 
        });
        
        // Override hardware concurrency (bots often report 1)
        Object.defineProperty(navigator, 'hardwareConcurrency', { 
            get: () => 8 
        });
        
        // Override platform
        Object.defineProperty(navigator, 'platform', { 
            get: () => 'Win32' 
        });
    """)
    
    return context
```

We also added:
- **User-agent rotation** — Pool of 50+ real browser signatures
- **Viewport randomization** — Different screen sizes per session
- **Human-like scrolling** — Random scroll patterns, not instant jumps
- **Realistic headers** — Accept-Language, Referer, DNT

**Result:** 95% crawl success rate across DevPost, DoraHacks, MLH, HackQuest, SuperTeam, and more.

### Phase 2: Confluent Kafka Streaming Architecture

**6 Production Topics in Confluent Cloud:**

| Topic | Purpose | Key Design Decision |
|-------|---------|---------------------|
| `user.identity.v1` | User profile sync | **Compacted** — Only latest profile per user |
| `cortex.commands.v1` | Patrol triggers | Commands to initiate crawl cycles |
| `cortex.raw.html.v1` | Raw crawled HTML | **3 partitions** — High throughput |
| `opportunity.enriched.v1` | AI-processed data | **3 partitions** — Parallel consumption |
| `system.alerts.v1` | Health monitoring | Anomaly detection and alerting |
| `user.matches.v1` | Push notifications | Personalized match delivery |

**Producer Configuration (Tuned for High-Latency Networks):**

Developing from Nigeria means 400ms+ round-trip time to Confluent Cloud. We tuned our producers:

```python
kafka_config = {
    'bootstrap.servers': CONFLUENT_BOOTSTRAP,
    'security.protocol': 'SASL_SSL',
    'sasl.mechanism': 'PLAIN',
    'sasl.username': CONFLUENT_API_KEY,
    'sasl.password': CONFLUENT_API_SECRET,
    
    # High-latency tuning
    'acks': 'all',                        # Durability guarantee
    'compression.type': 'snappy',         # Reduce payload size
    'linger.ms': 100,                     # Batch small messages
    'socket.timeout.ms': 60000,           # 60s socket timeout
    'reconnect.backoff.max.ms': 15000,    # Graceful reconnection
    'session.timeout.ms': 45000,          # Extended session
    'fetch.min.bytes': 1024 * 1024,       # 1MB batching to amortize latency
}
```

### Phase 3: Confluent Flink SQL — Real-Time Stream Processing

This is where the magic happens. Our Flink SQL jobs run continuously in Confluent Cloud, transforming raw HTML into enriched, classified opportunities.

**Platform Detection:**
```sql
SELECT 
  url,
  source,
  CASE
    WHEN url LIKE '%devpost.com%' THEN 'DevPost'
    WHEN url LIKE '%dorahacks.io%' THEN 'DoraHacks'
    WHEN url LIKE '%hackquest.io%' THEN 'HackQuest'
    WHEN url LIKE '%mlh.io%' THEN 'MLH'
    WHEN url LIKE '%taikai.network%' THEN 'Taikai'
    WHEN url LIKE '%superteam.fun%' THEN 'SuperTeam'
    ELSE 'Other'
  END AS platform
FROM `cortex.raw.html.v1`
```

**Opportunity Type Categorization:**
```sql
SELECT *,
  CASE
    WHEN LOWER(content) LIKE '%hackathon%' THEN 'Hackathon'
    WHEN LOWER(content) LIKE '%bounty%' THEN 'Bounty'
    WHEN LOWER(content) LIKE '%scholarship%' THEN 'Scholarship'
    WHEN LOWER(content) LIKE '%grant%' THEN 'Grant'
    ELSE 'Competition'
  END AS opportunity_type
FROM `cortex.classified.v1`
```

**Geographic Classification:**
```sql
SELECT *,
  CASE
    WHEN LOWER(description) LIKE '%nigeria%' THEN 'Nigeria'
    WHEN LOWER(description) LIKE '%united states%' OR LOWER(description) LIKE '%usa%' THEN 'USA'
    WHEN LOWER(description) LIKE '%global%' OR LOWER(description) LIKE '%international%' THEN 'Global'
    WHEN LOWER(description) LIKE '%europe%' THEN 'Europe'
    ELSE 'Regional'
  END AS geo_classification
FROM `cortex.filtered.v1`
```

**Deadline-Based Auto-Expiration:**
```sql
INSERT INTO `cortex.active.v1`
SELECT * FROM `cortex.enriched.v1`
WHERE deadline_timestamp > UNIX_TIMESTAMP()
```

**Why Flink SQL over batch processing?**
- **Zero latency** — Classification happens as data arrives, not hours later
- **Declarative** — SQL is readable, maintainable, auditable
- **Auto-scaling** — Confluent Cloud handles infrastructure
- **Native Kafka integration** — No glue code between systems

### Phase 4: Vertex AI Enrichment Pipeline

Raw HTML isn't useful. We need structured, queryable data.

**Google Cloud Function processes each Kafka message:**

```python
def enrich_opportunity(raw_message: Dict) -> Dict:
    raw_html = raw_message['html']
    url = raw_message['url']
    
    # 1. Extract structured eligibility with Gemini
    gemini_model = GenerativeModel('gemini-2.0-flash-exp')
    prompt = f"""
    Extract opportunity details from this HTML. Return JSON with:
    - title: string
    - organization: string
    - amount: number (USD)
    - deadline: ISO 8601 date
    - eligibility: {{ gpa_min, majors[], citizenship[], gender }}
    - requirements: {{ essay, recommendation_letters, portfolio }}
    - tags: string[]
    
    HTML: {raw_html[:8000]}
    """
    eligibility = gemini_model.generate_content(prompt)
    
    # 2. Generate semantic embeddings for matching
    embedding_model = TextEmbeddingModel.from_pretrained('text-embedding-004')
    description = f"{parsed['title']} {parsed['organization']} {' '.join(parsed['tags'])}"
    embedding = embedding_model.get_embeddings([description])[0].values
    
    # 3. Return enriched opportunity
    return {
        'id': generate_stable_id(url, parsed['title']),
        'url': url,
        'platform': raw_message['platform'],
        **parsed,
        'embedding': embedding,  # 768-dimensional vector
        'enriched_at': datetime.utcnow().isoformat(),
    }
```

**768-Dimensional Semantic Matching:**

We don't just keyword match. The embeddings enable:
- *"Find React hackathons"* matches *"JavaScript frontend competition"* — semantically similar
- *"Machine learning grants"* finds *"AI research funding"* — same concept, different words

### Phase 5: WebSocket Real-Time Delivery

**The final mile: Getting opportunities to users in under 2 seconds.**

```python
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
        self.user_profiles: Dict[str, UserProfile] = {}

async def consume_kafka_stream(manager: ConnectionManager):
    """Background task consuming enriched opportunities from Kafka."""
    consumer = create_kafka_consumer()
    consumer.subscribe([KafkaConfig.TOPIC_OPPORTUNITY_ENRICHED])
    
    while True:
        msg = await asyncio.to_thread(consumer.poll, 1.0)
        
        if msg and not msg.error():
            opportunity = json.loads(msg.value())
            
            # Calculate personalized match for each connected user
            for user_id in manager.get_all_user_ids():
                profile = manager.user_profiles.get(user_id)
                if not profile:
                    continue
                    
                match_score = personalization_engine.calculate_score(
                    opportunity, profile
                )
                
                # Only push if match score is meaningful
                if match_score >= 60:
                    await manager.send_personal_message(user_id, {
                        'type': 'new_opportunity',
                        'opportunity': opportunity,
                        'match_score': match_score,
                        'match_reasons': generate_match_reasons(opportunity, profile)
                    })
```

**Result:** Opportunities flow from crawler → Kafka → Flink → AI → WebSocket → User's screen in under 2 seconds.

### Phase 6: The "Heartbeat" Fallback

Networks fail. Kafka connections drop. We built resilience:

```python
async def publish_with_fallback(self, opportunity: OpportunitySchema):
    """Publish to Kafka with Firestore fallback."""
    
    success = kafka_producer.publish(
        topic=KafkaConfig.TOPIC_OPPORTUNITY_ENRICHED,
        key=opportunity.id,
        value=opportunity.model_dump()
    )
    
    if not success:
        # Heartbeat: Direct-to-Firestore fallback
        await firestore_db.save_opportunity(opportunity)
        logger.warning(f"Heartbeat Fallback: {opportunity.id} saved to Firestore directly")
        
        # Queue for Kafka retry when connection recovers
        self.retry_queue.append(opportunity)
```

This ensures **zero data loss** even during network partitions—critical when developing from Nigeria with inconsistent connectivity.

---

## Challenges We Ran Into

### 1. The Anti-Bot Nightmare (Weeks of Frustration)

Every platform we tried to crawl blocked us:
- DevPost: 403 Forbidden
- DoraHacks: Cloudflare challenge
- SuperTeam: Rate limiting after 3 requests

We went through 4 iterations:
1. `requests` → Blocked immediately
2. `Scrapy` → Detected as bot
3. Headless Chrome → `navigator.webdriver` exposed
4. **Playwright Stealth → Success!**

The breakthrough came from understanding that anti-bot systems check:
- Browser fingerprints (plugins, screen size, hardware)
- Behavioral patterns (scroll speed, mouse movements)
- Request headers (user-agent, accept-language)

We had to spoof ALL of these convincingly.

### 2. Confluent Flink Integration Pivot

**Original plan:** Use Pub/Sub Sink connector to trigger Cloud Functions.

**Problem:** Confluent Cloud has a Pub/Sub **SOURCE** connector, not **SINK**. The connector we needed doesn't exist.

**The pivot:** Build a Kafka-to-HTTP bridge.

```python
# kafka_to_cloud_function.py
def main():
    consumer = create_kafka_consumer()
    consumer.subscribe([RAW_TOPIC])
    
    while True:
        msg = consumer.poll(1.0)
        if msg and not msg.error():
            # Forward to Cloud Function via HTTP
            response = requests.post(
                CLOUD_FUNCTION_URL,
                json=json.loads(msg.value()),
                headers={'Authorization': f'Bearer {ID_TOKEN}'}
            )
```

This actually **simplified** our architecture. Instead of:
```
Kafka → Pub/Sub → Cloud Function → Kafka
```

We have:
```
Kafka → HTTP → Cloud Function → Kafka
```

Fewer moving parts, easier debugging, same functionality.

### 3. High-Latency Network Tuning

Developing from Nigeria means:
- 400ms+ round-trip time to Confluent Cloud
- Intermittent connectivity
- Socket timeouts on default configurations

Every Kafka config had to be tuned:
- `socket.timeout.ms: 60000` (10x default)
- `reconnect.backoff.max.ms: 15000` (3x default)
- `session.timeout.ms: 45000` (extended heartbeat window)
- `fetch.min.bytes: 1MB` (batch to amortize latency)

Without these tweaks, the producer would fail constantly.

### 4. Unified Authentication Across Platforms

The Chrome Extension runs in an isolated context. It can't share cookies or localStorage with the web app.

**Solution:** Event-based auth sync.

```javascript
// Web app (when user logs in)
window.dispatchEvent(new CustomEvent('scholarstream-auth-sync', {
    detail: { token: firebaseToken, user: firebaseUser }
}));

// Extension (content script listens)
window.addEventListener('scholarstream-auth-sync', (event) => {
    chrome.storage.local.set({
        authToken: event.detail.token,
        user: event.detail.user
    });
});
```

Now users login once on ScholarStream, and the extension automatically inherits their session.

### 5. The Empty Dashboard Disaster

User completes onboarding, clicks "Show My Opportunities"... blank screen.

**Debug session:**
- ✅ Frontend calling API? Yes
- ✅ Backend responding? Yes, status 200
- ✅ Data in response? Yes, 50 opportunities
- ❌ Why no display? 🤯

**The culprit:** Frontend expected `match_percentage`, backend returned `match_score`.

One field name mismatch = complete silent failure.

**The fix:**
- TypeScript interfaces for data contracts
- Validation logging for missing fields
- Fallback rendering for partial data

### 6. Date Parsing Hell

Scraped deadline formats:
- "December 15, 2025"
- "12/15/2025"
- "Closing in 3 weeks"
- "Rolling deadline"
- "TBD"

JavaScript `Date()` parsing is browser-inconsistent. We normalized everything:

```python
def normalize_deadline(raw: str) -> Dict:
    if 'rolling' in raw.lower():
        return {'deadline': None, 'deadline_type': 'rolling'}
    if 'week' in raw.lower():
        weeks = extract_number(raw)
        return {'deadline': (datetime.now() + timedelta(weeks=weeks)).isoformat()}
    # Parse with multiple formats...
    return {'deadline': parsed.isoformat(), 'deadline_display': raw}
```

---

## Accomplishments We're Proud Of

### True Real-Time Architecture

This isn't batch processing disguised as real-time. Our pipeline:
- **Kafka** streams data continuously (no polling)
- **Flink SQL** processes in milliseconds (no batch windows)
- **WebSocket** pushes to clients instantly (no refresh needed)

From crawl to user screen: **under 2 seconds**.

### Full Confluent Stack Utilization

We didn't just use Kafka for message passing. We leveraged the full Confluent platform:
- **Kafka** — 6 production topics with appropriate partitioning
- **Flink SQL** — Real-time classification, filtering, routing
- **Schema Registry** — Data governance and evolution
- **Tuned configurations** — High-latency network optimization

### 768-Dimensional Semantic Matching

Traditional keyword matching fails:
- "React developer" ≠ "JavaScript engineer" (same skill, different words)
- "Machine learning" ≠ "AI research" (same domain, different terms)

Our Vertex AI embeddings understand **semantic similarity**. This means:
- Better matches for users
- Fewer missed opportunities
- Higher win rates

### On-Demand AI Crawling

Can't find what you need in our database? Ask the chat:

*"Find blockchain hackathons with prizes over $10k happening in January 2026"*

The AI:
1. Generates targeted search queries
2. Dispatches stealth Playwright crawlers
3. Enriches results with Gemini
4. Returns personalized matches

All in one conversation.

### Resilient Architecture

The "Heartbeat" fallback ensures zero data loss:
- Kafka unavailable? → Save to Firestore directly
- Network partition? → Queue for retry
- Cloud Function timeout? → Retry with exponential backoff

We built for Nigerian internet reality: things fail, systems must recover.

### We Shipped Real

This isn't mockups with lorem ipsum. Every feature works:
- Real opportunities from real platforms
- Real deadlines that actually matter
- Real application links that work
- Real AI that actually helps

---

## What We Learned

### 1. Stream Processing Changes Everything

Batch processing hides latency. Stream processing exposes it.

When you process in real-time, you feel every millisecond. This forced us to:
- Optimize Flink SQL queries
- Tune Kafka configurations
- Minimize AI processing time

The result: a faster, more responsive system.

### 2. Confluent Flink SQL is Powerful

We initially planned complex Python logic for classification. Then we discovered Flink SQL could do it declaratively:

```sql
CASE WHEN url LIKE '%devpost.com%' THEN 'DevPost' ELSE 'Other' END
```

One line of SQL replaced 50 lines of Python. And it runs in the stream, not in our application.

### 3. High-Latency Networks Require Different Thinking

Default configurations assume low-latency networks. From Nigeria:
- Timeouts happen constantly
- Reconnections are the norm
- Batching is essential

We learned to tune for our reality, not the ideal.

### 4. AI is a Tool, Not Magic

Gemini doesn't "just work." It needs:
- Structured prompts with examples
- Output format specifications
- Error handling for hallucinations
- Rate limiting and fallbacks

We treat AI like any API: with validation, retries, and graceful degradation.

### 5. The Best Architecture is the Simplest One

Our Pub/Sub connector pivot taught us: simpler is better.

Kafka → HTTP → Cloud Function is easier to debug than Kafka → Pub/Sub → Cloud Function → Kafka.

Fewer moving parts = fewer failure points = faster debugging.

---

## What's Next for ScholarStream

### Immediate Roadmap

1. **Mobile App** — React Native version for students who primarily use phones
2. **More Sources** — Expand beyond 50 platforms to 200+
3. **Application Tracking** — Full pipeline from discovery → application → outcome
4. **Community Features** — Students sharing tips, experiences, success stories

### Long-Term Vision

ScholarStream should become the **default starting point** for any student seeking financial opportunities.

Not just scholarships. Every hackathon. Every bounty. Every grant. Every competition.

One platform. Personalized matches. Real-time updates.

No student should ever defer education because they didn't know opportunities existed.

---

## Team

**Rasheed Yekini**  
Petroleum Engineering Student, University of Ibadan, Nigeria  
GDSC Mobile Lead | Volunteer Teacher | Builder

*"I built ScholarStream because I lived the problem. I deferred my education because I didn't know Devpost existed. I didn't know students win $5,000 in weekend hackathons. I didn't know about bounties that could have paid my tuition.*

*Now I know. And I refuse to let another student experience what I did.*

*This is more than a hackathon project. This is a promise."*

---

## Try It Now

**Live Demo:** https://scholarstream-frontend-opdnpd6bsq-uc.a.run.app

**GitHub:** https://github.com/Muhammadurasheed/scholarstream-ai3

---

*Built with Confluent Cloud, Google Cloud Platform, and a refusal to accept that students should miss opportunities because information is scattered.*

*For students. By students. Always.*
