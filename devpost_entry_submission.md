# ScholarStream: Real-Time AI Opportunity Discovery Engine

> **Confluent Challenge Submission**  
> *"Unleash the power of AI on data in motion!"*

---

## 🏆 **Project Title**
**ScholarStream: AI-Powered Real-Time Opportunity Discovery for Students in Urgent Need**

---

## 📌 **Tagline** *(140 characters)*
Real-time AI platform streaming scholarships & hackathons via Confluent Kafka + Flink + Vertex AI—matching students in 2 seconds, not days.

---

## 🔗 **Links**

| Resource | URL |
|----------|-----|
| **Live Demo** | https://scholarstream-frontend-opdnpd6bsq-uc.a.run.app |
| **GitHub Repository** | https://github.com/Muhammadurasheed/scholarstream-ai3 |
| **Demo Video** | *[YouTube link - 3 minutes]* |

---

## 🛠️ **Built With**

### Confluent Technologies
- **Confluent Cloud (Apache Kafka)** — 6 production topics streaming raw HTML, enriched opportunities, user identity, and system alerts
- **Confluent Flink SQL** — Real-time stream processing for platform detection, geo-classification, opportunity categorization, and deadline filtering
- **Schema Registry** — Schema evolution and data governance for opportunity payloads

### Google Cloud Platform
- **Google Cloud Run** — Containerized FastAPI backend with auto-scaling
- **Google Cloud Functions** — HTTP-triggered enrichment pipeline processing Kafka messages
- **Vertex AI Gemini 2.0 Flash** — Intelligent HTML parsing and eligibility extraction
- **Vertex AI text-embedding-004** — 768-dimensional semantic embeddings for personalized matching
- **Firebase Authentication** — Secure user identity and token management
- **Firebase Firestore** — Real-time database with vector search capabilities

### Additional Technologies
- **Python / FastAPI** — Async backend with WebSocket real-time delivery
- **Playwright (Stealth Mode)** — Anti-detection web crawling with human behavior simulation
- **React / TypeScript** — Production frontend with real-time WebSocket hooks
- **Chrome Extension (Manifest V3)** — AI Co-Pilot for application assistance

---

## 📖 **Inspiration**

**March 2025. Everything fell apart.**

I'm Rasheed, a petroleum engineering student at the University of Ibadan, Nigeria. I was supposed to graduate in December 2025 with a 3.4 GPA. I led Google Developer Student Clubs Mobile. I volunteered as a teacher on weekends. On paper—the "ideal scholarship candidate."

Then my family's income dropped 60%. My school fee deadline came and went. I watched it pass, helpless—sitting at home instead of in class.

### The Frustrating Truth

I had skills to earn money. I'd been coding since 2021—React, Python, building real projects. But I didn't know opportunities existed:

- Never heard of Devpost, Gitcoin, or bug bounties
- Didn't know students win $5,000 in weekend hackathons  
- Didn't know about $500 bounties for open-source contributions

These opportunities weren't hidden. They were right there, waiting. I just didn't know where to look.

### The Shocking Statistics

- **$2.9 billion** in scholarships goes unclaimed annually (U.S. Department of Education)
- **Billions more** in hackathon prizes and bounties scattered across 10,000+ websites
- **Tens of millions** of students miss opportunities because deadlines are fragmented

### Why Confluent?

The Confluent Challenge asked: *"Demonstrate how real-time data unlocks real-world challenges with AI."*

My answer: **Information asymmetry in education funding is a REAL problem.** Students don't defer because they lack talent—they defer because they lack *discovery*. Traditional scholarship platforms are databases with scheduled polling. Students in urgent need can't wait for batch refreshes.

ScholarStream transforms opportunity discovery from **scheduled polling to real-time streaming**:
- **Confluent Kafka** streams raw opportunity data from 50+ sources
- **Confluent Flink SQL** classifies, filters, and routes opportunities in real-time
- **Vertex AI** enriches with structured eligibility and semantic embeddings
- **WebSocket** pushes personalized matches to students in under 2 seconds

I built ScholarStream because I refuse to let another student say: *"I deferred my education because I didn't know."*

---

## 🔥 **What It Does**

ScholarStream is the **first AI-powered financial opportunity hub** combining **Confluent Kafka + Flink** for real-time stream processing with **Vertex AI** for intelligent enrichment.

### Real-Time Stream Processing (Confluent Flink SQL)

Our Flink SQL jobs run continuously in Confluent Cloud, performing:

**1. Platform Detection:**
```sql
SELECT url, 
  CASE 
    WHEN url LIKE '%devpost.com%' THEN 'DevPost'
    WHEN url LIKE '%dorahacks.io%' THEN 'DoraHacks'
    WHEN url LIKE '%hackquest.io%' THEN 'HackQuest'
    WHEN url LIKE '%mlh.io%' THEN 'MLH'
    WHEN url LIKE '%superteam.fun%' THEN 'SuperTeam'
    ELSE 'Other'
  END AS platform
FROM cortex.raw.html.v1
```

**2. Geographic Classification:**
```sql
SELECT *,
  CASE
    WHEN LOWER(description) LIKE '%nigeria%' THEN 'Nigeria'
    WHEN LOWER(description) LIKE '%global%' OR LOWER(description) LIKE '%international%' THEN 'Global'
    WHEN LOWER(description) LIKE '%united states%' THEN 'USA'
    ELSE 'Regional'
  END AS geo_classification
FROM cortex.filtered.v1
```

**3. Opportunity Type Categorization:**
```sql
SELECT *,
  CASE
    WHEN LOWER(content) LIKE '%hackathon%' THEN 'Hackathon'
    WHEN LOWER(content) LIKE '%bounty%' THEN 'Bounty'
    WHEN LOWER(content) LIKE '%scholarship%' THEN 'Scholarship'
    WHEN LOWER(content) LIKE '%grant%' THEN 'Grant'
    ELSE 'Competition'
  END AS opportunity_type
FROM cortex.classified.v1
```

**4. Deadline Filtering (Auto-Expiration):**
```sql
INSERT INTO cortex.active.v1
SELECT * FROM cortex.enriched.v1
WHERE deadline_timestamp > UNIX_TIMESTAMP()
```

### Intelligent AI Enrichment (Vertex AI)

- **Gemini 2.0 Flash** extracts structured eligibility (GPA requirements, majors, citizenship)
- **text-embedding-004** generates 768-dimensional vectors for SEMANTIC MATCHING
- On-demand crawling: Ask *"Find React hackathons with $10k prizes"* and AI searches the web live

### Personalized Real-Time Matching

Example conversation:
```
Student: "I need $500 by Friday"

ScholarStream AI: "Found 8 opportunities you can complete by Friday:

🔥 IMMEDIATE:
• Gitcoin Bounty: Fix React bug - $500 (12 hours left, matches your React skills)
• HackerOne: Find XSS vulnerability - $300 (rolling deadline, beginner-friendly)

📅 THIS WEEK:
• ETHGlobal Mini-Hack: $5,000 prizes (submissions due Friday)
• Dev.to Challenge: Build any app - $3,000 pool (4 days left)

I've added these to your dashboard. Want help applying to the top 3?"
```

### AI Co-Pilot Chrome Extension (The Game-Changer)

Not just auto-fill. A full **context-aware application assistant**:

1. **Unified Auth Sync** — Login once on ScholarStream → Extension automatically inherits auth via event-based sync
2. **Multi-Document Knowledge Base** — Upload resume, README, cover letters. Use `@resume` or `@readme` in chat to reference specific docs
3. **Platform Detection** — Extension knows if you're on DevPost, DoraHacks, MLH. Provides platform-specific tips
4. **Field Intelligence** — Detects character limits, word limits, required fields. AI respects ALL constraints
5. **Sparkle Button (✨)** — One click generates personalized content using your profile + documents + field context
6. **Double-Click Refinement** — After AI fills a field, double-click to refine. Type "make it shorter" → AI rewrites in place

### Real-Time Delivery Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          CONFLUENT KAFKA TOPICS                              │
├──────────────────────────────────────────────────────────────────────────────┤
│  user.identity.v1        │  User profile events (compacted)                 │
│  cortex.commands.v1      │  System commands & patrol triggers               │
│  cortex.raw.html.v1      │  Raw crawled HTML (high throughput)              │
│  opportunity.enriched.v1 │  AI-enriched structured opportunities            │
│  system.alerts.v1        │  Health monitoring & anomaly detection           │
│  user.matches.v1         │  Personalized match notifications                │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ **How We Built It**

### Phase 1: The Anti-Bot Nightmare (Defeating Detection)

Every platform blocked our traditional HTTP scrapers. DevPost, DoraHacks, SuperTeam—all returned 403 Forbidden.

**Evolution:**
- HTTP/httpx → Blocked by Cloudflare
- Scrapy → Detected as bot
- Headless Chrome → navigator.webdriver exposed
- **Stealth Playwright → SUCCESS!**

**The Breakthrough:** UniversalCrawlerService with advanced anti-detection:

```python
# Stealth JavaScript injection
await context.add_init_script("""
    // Remove webdriver flag
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    
    // Override plugins (bots have none)
    Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4, 5] });
    
    // Override hardware concurrency
    Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => 8 });
    
    // Human-like mouse movements simulated
""")
```

Plus: User-agent rotation, viewport randomization, human-like scrolling, and realistic request headers.

### Phase 2: Confluent Kafka Streaming Architecture

**6 Production Topics in Confluent Cloud:**

| Topic | Purpose | Partitions |
|-------|---------|------------|
| `user.identity.v1` | Profile sync (compacted) | 1 |
| `cortex.commands.v1` | Patrol triggers | 1 |
| `cortex.raw.html.v1` | Crawled HTML | 3 |
| `opportunity.enriched.v1` | AI-processed data | 3 |
| `system.alerts.v1` | Health monitoring | 1 |
| `user.matches.v1` | Push notifications | 1 |

**Producer Configuration (Tuned for High-Latency Network):**
```python
{
    'bootstrap.servers': CONFLUENT_BOOTSTRAP,
    'security.protocol': 'SASL_SSL',
    'sasl.mechanism': 'PLAIN',
    'acks': 'all',
    'compression.type': 'snappy',
    'linger.ms': 100,
    'socket.timeout.ms': 60000,
    'reconnect.backoff.max.ms': 15000,
}
```

### Phase 3: Confluent Flink SQL (The Real Magic)

Flink SQL jobs run in Confluent Cloud for real-time transformation:

```sql
-- Platform Detection + Type Classification (Single Pass)
INSERT INTO 'opportunity.enriched.v1'
SELECT 
  url,
  source,
  CASE
    WHEN url LIKE '%devpost.com%' THEN 'DevPost'
    WHEN url LIKE '%dorahacks.io%' THEN 'DoraHacks'
    WHEN url LIKE '%hackquest.io%' THEN 'HackQuest'
    WHEN url LIKE '%mlh.io%' THEN 'MLH'
    ELSE 'Other'
  END AS platform,
  CASE
    WHEN LOWER(html) LIKE '%hackathon%' THEN 'Hackathon'
    WHEN LOWER(html) LIKE '%bounty%' THEN 'Bounty'
    WHEN LOWER(html) LIKE '%scholarship%' THEN 'Scholarship'
    ELSE 'Other'
  END AS opportunity_type,
  CASE
    WHEN LOWER(html) LIKE '%global%' OR LOWER(html) LIKE '%international%' THEN 'Global'
    WHEN LOWER(html) LIKE '%nigeria%' THEN 'Nigeria'
    ELSE 'Regional'
  END AS geo_tag
FROM 'cortex.raw.html.v1'
```

**Why Flink over batch processing?**
- Zero-latency classification (no batch delays)
- Declarative SQL (no complex Python logic)
- Auto-scaling in Confluent Cloud
- Native Kafka integration

### Phase 4: Vertex AI Enrichment Pipeline

Google Cloud Function triggered by Kafka-to-HTTP bridge:

```python
def enrich_opportunity(raw_message: Dict) -> Dict:
    # 1. Extract structured eligibility with Gemini
    gemini_model = GenerativeModel('gemini-2.0-flash-exp')
    eligibility = extract_eligibility_criteria(raw_data, gemini_model)
    
    # 2. Generate semantic embeddings
    embedding_model = TextEmbeddingModel.from_pretrained('text-embedding-004')
    embedding_vector = embedding_model.get_embeddings([description])[0].values
    
    # 3. Return enriched opportunity
    return {
        'id': generate_stable_id(url, title),
        'eligibility': eligibility,  # Structured GPA, majors, citizenship
        'embedding': embedding_vector,  # 768-dimensional vector
        'enriched_at': datetime.utcnow().isoformat(),
    }
```

### Phase 5: WebSocket Real-Time Delivery

FastAPI backend runs background Kafka consumer:

```python
async def consume_kafka_stream():
    consumer.subscribe([KafkaConfig.TOPIC_OPPORTUNITY_ENRICHED])
    
    while True:
        msg = await asyncio.to_thread(consumer.poll, 1.0)
        
        if msg and not msg.error():
            enriched_opportunity = json.loads(msg.value())
            
            # Calculate personalized match score for each connected user
            for user_id in manager.get_all_user_ids():
                user_profile = manager.user_profiles[user_id]
                match_score = personalization_engine.calculate_personalized_score(
                    enriched_opportunity, user_profile
                )
                
                if match_score >= 60:
                    await manager.send_personal_message(user_id, {
                        'type': 'new_opportunity',
                        'opportunity': enriched_opportunity,
                        'match_score': match_score
                    })
```

### Phase 6: The "Heartbeat" Fallback

When Kafka is unreachable (network partition), we don't lose data:

```python
async def _publish_verified(self, opp: OpportunitySchema):
    success = kafka_producer_manager.publish_to_stream(
        topic=KafkaConfig.TOPIC_OPPORTUNITY_ENRICHED,
        key=opp.id,
        value=opp.model_dump()
    )
    
    if not success:
        # Heartbeat: Direct-to-Firestore fallback
        await db.save_scholarship(opp)
        logger.info("Heartbeat Fallback: Saved to DB directly")
```

---

## 😰 **Challenges We Ran Into**

### 1. The Anti-Bot Nightmare (Biggest Challenge)

Every platform blocked our traditional HTTP scrapers. DevPost, DoraHacks, SuperTeam—all returned 403 Forbidden.

**After weeks of frustration, we evolved:**
- HTTP → Scrapy (blocked)
- Scrapy → Headless Chrome (detected)
- Headless Chrome → **Stealth Playwright (SUCCESS!)**

The breakthrough: Injecting anti-detection JavaScript that removes `navigator.webdriver`, spoofs plugins and hardware, mimics human behavior with mouse movements and scrolling.

### 2. Confluent Flink Integration Pivot

**Initial plan:** Use Pub/Sub Sink connector to trigger Cloud Functions.

**Problem:** Confluent Cloud doesn't have a Pub/Sub **SINK** connector (only Source).

**Solution:** HTTP-triggered Cloud Function with Kafka-to-HTTP bridge.

```python
# kafka_to_cloud_function.py
def main():
    consumer.subscribe([RAW_TOPIC])
    while True:
        msg = consumer.poll(1.0)
        if msg:
            requests.post(CLOUD_FUNCTION_URL, json=msg.value())
```

This actually **SIMPLIFIED** our architecture—fewer moving parts, direct Kafka → Cloud Function → Kafka flow.

### 3. Vector Search Complexity

768-dimensional embeddings are powerful but require careful implementation:
- Truncating descriptions to 1000 chars for embedding generation
- Storing vectors in Firestore with proper indexing
- Balancing semantic similarity with exact filters (deadline, amount)

### 4. Unified Auth for Extension

Chrome extensions run in isolated contexts. Sharing auth with web app required:
```javascript
// Web app dispatches custom event
window.dispatchEvent(new CustomEvent('scholarstream-auth-sync', {
    detail: { token, user }
}));

// Extension listens and syncs to chrome.storage
window.addEventListener('scholarstream-auth-sync', (event) => {
    chrome.storage.local.set({ authToken: event.detail.token });
});
```

### 5. High-Latency Network Tuning (Nigeria → Confluent Cloud)

With 400ms RTT to Confluent Cloud, we tuned Kafka configs:
```python
{
    'socket.timeout.ms': 60000,      # 60s socket timeout
    'reconnect.backoff.max.ms': 15000,  # Max 15s between reconnects
    'fetch.min.bytes': 1024 * 1024,  # 1MB batching to amortize latency
    'session.timeout.ms': 45000,     # Extended session timeout
}
```

---

## 🏆 **Accomplishments We're Proud Of**

### Full Confluent Stack Utilization

Not just Kafka—we use **Confluent Flink SQL** for real-time stream transformation:
- Platform detection (DevPost vs DoraHacks vs MLH)
- Geographic classification (Nigeria, US, Global)
- Opportunity type categorization (Hackathon, Bounty, Scholarship, Grant)
- Deadline-based filtering (auto-expire passed opportunities)

This is **TRUE stream processing**, not batch disguised as real-time.

### 768-Dimensional Semantic Matching

We don't just keyword match. Vertex AI `text-embedding-004` generates semantic vectors:
- *"Find React hackathons"* matches *"JavaScript frontend competition"*—because they're semantically similar

### On-Demand AI Crawling

Ask the chat: *"Find blockchain grants in Q1 2026"*
- AI generates search queries
- Dispatches stealth Playwright crawlers
- Enriches results with Gemini
- Returns personalized matches—all in one conversation

### 99.98% Faster Discovery

| Metric | Traditional | ScholarStream |
|--------|-------------|---------------|
| Discovery | 6-hour batch refresh | 2-5 seconds |
| Matching | Daily recalculation | Real-time per-event |
| Delivery | Manual dashboard check | WebSocket push |

### The "Sentinel" Architecture

```
                    ┌─────────────────┐
                    │   Sentinel      │
                    │  (Patrol Mode)  │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        ┌─────────┐    ┌─────────┐    ┌─────────┐
        │ Hunter  │    │ Hunter  │    │ Hunter  │
        │ Drone 1 │    │ Drone 2 │    │ Drone 3 │
        └────┬────┘    └────┬────┘    └────┬────┘
             │              │              │
             ▼              ▼              ▼
    ┌─────────────────────────────────────────────┐
    │        cortex.raw.html.v1 (Kafka)           │
    └─────────────────────┬───────────────────────┘
                          │
                          ▼
    ┌─────────────────────────────────────────────┐
    │         Confluent Flink SQL                  │
    │   (Platform Detection, Geo Classification)   │
    └─────────────────────┬───────────────────────┘
                          │
                          ▼
    ┌─────────────────────────────────────────────┐
    │      Refinery (Vertex AI Enrichment)         │
    └─────────────────────┬───────────────────────┘
                          │
                          ▼
    ┌─────────────────────────────────────────────┐
    │     opportunity.enriched.v1 (Kafka)          │
    └─────────────────────┬───────────────────────┘
                          │
           ┌──────────────┼──────────────┐
           ▼              ▼              ▼
      ┌─────────┐   ┌─────────┐   ┌─────────┐
      │ User A  │   │ User B  │   │ User C  │
      │ (92%)   │   │ (78%)   │   │ (85%)   │
      └─────────┘   └─────────┘   └─────────┘
```

---

## 📚 **What We Learned**

### Flink SQL is Powerful for Classification

We initially planned complex Python logic for opportunity categorization. Flink SQL made it declarative:
```sql
CASE WHEN url LIKE '%devpost%' THEN 'DevPost' END
```
Running directly on Confluent Cloud—no server management.

### Vector Embeddings Change Matching

| Approach | Query | Matches |
|----------|-------|---------|
| Keyword | "React" | Only "React" |
| Semantic | "React" | "JavaScript frontend", "UI framework", "TypeScript web app" |

768-dim embeddings from `text-embedding-004` enable true semantic opportunity matching.

### Anti-Bot Detection is Sophisticated

Websites check:
- `navigator.webdriver` flag
- Canvas fingerprinting
- Plugin signatures
- Mouse movement patterns

Stealth Playwright with human simulation was the only solution that worked.

### Event-Driven > Polling

The mental shift from *"check every 6 hours"* to *"react to events"* fundamentally improved UX. Flink + Kafka made this possible.

### Confluent Cloud + GCP = Perfect Combo

- Confluent for streaming (Kafka, Flink, Schema Registry)
- GCP for AI (Gemini, Embeddings, Cloud Run)

All worked together beautifully—zero vendor lock-in concerns.

---

## 🚀 **What's Next for ScholarStream**

### Immediate Priorities

**Enhanced Flink SQL Jobs:**
- Anomaly detection (sudden deadline changes)
- Trending opportunities (spike in applications)
- User behavior streaming (click → apply → win pipeline)

**Firestore Vector Search (Production):**
Embeddings are generated. Next: Enable native vector search in Firestore for sub-100ms semantic queries across 100k+ opportunities.

**Mobile App with Push Notifications:**
80% of students browse on phones. React Native app with:
- Real-time Kafka-backed push notifications
- *"Gates Scholarship just opened—you're a 92% match!"*

### Scale & Sustainability

**More Data Sources:**
- University financial aid pages
- Foundation grants (Gates, Bezos)
- Corporate scholarship programs
- International opportunities (UK, Canada, EU)

**Flink ML Integration:**
Train models on:
- Which opportunities users apply to
- What profiles win which scholarships
- Predict win probability per user-opportunity pair

**Partnerships:**
Universities, hackathon organizers, scholarship foundations—ScholarStream as the discovery layer for the entire ecosystem.

---

## 👨‍💻 **Team**

**Rasheed Yekini** — Solo Developer  
Petroleum Engineering Student, University of Ibadan, Nigeria  
GDSC Mobile Lead • Volunteer Teacher

---

## 📄 **License**

MIT License (Open Source)

---

## 🤲 **Final Reflection**

Every line of code is written with the memory of sitting at home since March 2025, watching my graduation slip away.

Every feature is designed for the student who's refreshing their bank account at 2 AM, wondering how they'll pay tuition tomorrow.

Every optimization is for the student on a slow internet connection in a developing country, trying to load opportunities that could change their life.

**ScholarStream exists so that no student has to say:**

*"I deferred my education because I didn't know."*

Now they'll know. Now they'll find. Now they'll win.

---

## ✅ **Submission Checklist**

- [x] Project title and tagline completed
- [x] Project URL (hosted demo) added
- [x] GitHub repository URL (public, with LICENSE file) added
- [ ] Demo video URL (YouTube/Vimeo, ≤3 minutes) added
- [x] Challenge selected: Confluent Challenge
- [x] All story sections filled out
- [x] Built With technologies listed (Confluent Kafka, Flink SQL, Vertex AI)
- [x] Team members listed
- [x] Reviewed all content for typos

---

*Bismillah. May this submission be blessed with success.*

**For students. By students. Always.**
