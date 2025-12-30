DevPost Submission Form: Field-by-Field Guide (ENHANCED)
Copy-paste ready answers for your DevPost submission Challenge: Confluent Challenge Prize Pool: $25,000 (1st: $12,500, 2nd: $7,500, 3rd: $5,000)

📝 BASIC INFORMATION
Project Title
ScholarStream: AI-Powered Financial Opportunity Hub
Tagline (140 characters max)
Real-time AI platform using Confluent Kafka + Flink + Vertex AI to help students discover scholarships & hackathons in 2-5 seconds—not hours.
What challenge(s) are you submitting for?
✅ Confluent Challenge
🔗 LINKS
Project URL (Hosted)
https://scholarstream-frontend-opdnpd6bsq-uc.a.run.app
GitHub Repository URL
https://github.com/Muhammadurasheed/scholarstream-ai3
Demo Video URL (YouTube/Vimeo, 3 min max)
<!-- TODO: Record and add your 3-minute demo video -->
https://www.youtube.com/watch?v=YOUR_VIDEO_ID
🛠️ BUILT WITH (Select/Enter Technologies)
Confluent Technologies
Confluent Cloud (Apache Kafka)
Confluent Flink SQL (Stream Processing)
Schema Registry
Google Cloud Technologies
Google Cloud Run
Google Cloud Functions
Vertex AI Gemini 2.0 Flash
Vertex AI Text Embeddings (text-embedding-004)
Firestore (Vector Search Ready)
Firebase Authentication
Languages & Frameworks
Python / FastAPI
TypeScript / React
Playwright (Stealth Crawling)
WebSocket (Real-Time)
Chrome Extension APIs (Manifest V3)
📖 STORY SECTION
Inspiration (Recommended: 200-400 words)
March 2025. Everything fell apart.
I'm Rasheed, a petroleum engineering student at the University of Ibadan, Nigeria. I was on track to graduate in December 2025 with a 3.4 GPA. I led Google Developer Student Clubs Mobile, volunteered as a teacher. On paper—the "ideal scholarship candidate."
Then my family's income dropped 60%. My school fee deadline passed. I watched it go, helpless—sitting at home instead of in class.
THE FRUSTRATING TRUTH:
I had skills to earn money. I'd been coding since 2021—React, Python, building real projects. But I didn't know opportunities existed:
• Never heard of Devpost, Gitcoin, or bug bounties
• Didn't know students win $5,000 in weekend hackathons
• Didn't know about $500 bounties for open-source contributions
These weren't hidden. They were right there, waiting. I just didn't know where to look.
After deferring, I discovered an ecosystem: $50,000 hackathon prizes, scholarships for first-generation students I perfectly qualified for, bounties I could complete in an afternoon.
THE SHOCKING STATISTICS:
• $2.9 BILLION in scholarships goes unclaimed annually (U.S. Dept of Education)
• Billions more in hackathon prizes and bounties scattered across 10,000+ websites
• Tens of millions miss opportunities because deadlines are fragmented
The Confluent Challenge asked: "Demonstrate how real-time data unlocks real-world challenges with AI."
My answer: Information asymmetry in education funding is a REAL problem. Students defer not because they lack talent—but because they lack discovery. ScholarStream transforms opportunity discovery from scheduled polling to real-time streaming where:
• Confluent Kafka streams raw opportunities
• Confluent Flink SQL classifies, filters, and categorizes in real-time
• Vertex AI enriches with structured eligibility and vector embeddings
• WebSocket pushes personalized matches instantly
I built ScholarStream because I refuse to let another student say: "I deferred my education because I didn't know."
What it does (Recommended: 300-500 words)
ScholarStream is the first AI-powered financial opportunity hub combining CONFLUENT KAFKA + FLINK for real-time stream processing with VERTEX AI for intelligent enrichment.
🔥 CONFLUENT FLINK SQL STREAM PROCESSING:
Our Flink SQL jobs run continuously in Confluent Cloud, performing:
1. PLATFORM DETECTION:
   SELECT url, CASE 
     WHEN url LIKE '%devpost.com%' THEN 'DevPost'
     WHEN url LIKE '%dorahacks.io%' THEN 'DoraHacks'
     WHEN url LIKE '%mlh.io%' THEN 'MLH'
   END as platform FROM cortex.filtered.v1
2. GEO CLASSIFICATION:
   Nigeria-specific, US-only, Global, or Regional opportunities identified automatically.
3. OPPORTUNITY TYPE CATEGORIZATION:
   Hackathon, Bounty, Scholarship, Grant—classified in real-time for frontend filtering.
4. DEADLINE FILTERING:
   Expired opportunities purged from streams automatically. Only active opportunities reach users.
🤖 VERTEX AI + VECTOR SEARCH:
• Gemini 2.0 Flash extracts structured eligibility (GPA, majors, citizenship)
• text-embedding-004 generates 768-dimensional vectors for SEMANTIC MATCHING
• On-demand crawling: Ask "Find React hackathons with $10k prizes" and AI searches the web live
💬 INTELLIGENT CHAT ASSISTANT:
Student: "I need $500 by Friday"
AI: (queries vector embeddings for urgent + bounty + high-match)
→ Returns Gitcoin bounty, ETHGlobal hack, emergency grants—all winnable THIS WEEK
🔌 AI CO-PILOT CHROME EXTENSION (The Game Changer):
Not just auto-fill. A full context-aware application assistant:
1. UNIFIED AUTH SYNC:
   Login once on ScholarStream web app → Extension automatically inherits auth via event-based sync. No separate login required.
2. MULTI-DOCUMENT KNOWLEDGE BASE:
   Upload resume, README, cover letters. Each document becomes part of your KB.
   Use @resume or @readme in chat to tell AI exactly which docs to reference.
3. PLATFORM DETECTION:
   Extension knows if you're on DevPost, DoraHacks, MLH, Gitcoin, Kaggle.
   Provides platform-specific tips ("DevPost judges love demo videos!").
4. FIELD INTELLIGENCE:
   Detects character limits, word limits, placeholder hints, required fields.
   AI respects all constraints—never generates a 500-word essay for a 200-char field.
5. SPARKLE BUTTON (✨):
   One click generates personalized content using TRI-FOLD knowledge:
   • Your Profile (skills, GPA, background)
   • Your Documents (@mentioned files)
   • Field Context (what the specific field needs)
6. DOUBLE-CLICK REFINEMENT (Magic!):
   After AI fills a field, double-click to refine.
   Type "make it shorter" or "add more technical detail"—AI rewrites in place.
⚡ REAL-TIME DELIVERY:
• WebSocket pushes matches to dashboard in 2-5 seconds
• Toast notifications for urgent opportunities
• No refresh needed—ever
How we built it (Recommended: 300-500 words)
ARCHITECTURE: CONFLUENT KAFKA + FLINK + GOOGLE CLOUD
PHASE 1: STEALTH CRAWLING (Defeating Anti-Bot)
After traditional HTTP scraping failed (403 everywhere), we built UniversalCrawlerService:
• Playwright with webdriver flag removal
• Fingerprint spoofing (plugins, languages, hardware)
• User-agent rotation (5 realistic browser strings)
• Human-like behavior (mouse movements, scrolling)
• Deep scroll for infinite-scroll sites (DoraHacks, DevPost)
PHASE 2: CONFLUENT KAFKA STREAMING (6+ Topics)
Raw opportunities stream to Confluent Cloud:
• raw-opportunities-stream (3 partitions)
• cortex.raw.html.v1 (for HTML extraction)
• enriched-opportunities-stream (AI-processed)
• user.identity.v1 (profile events)
• cortex.commands.v1 (system commands)
PHASE 3: CONFLUENT FLINK SQL (Real-Time Transformation)
Flink SQL jobs run in Confluent Cloud for:
• INSERT INTO cortex.filtered.v1 SELECT... (platform detection)
• INSERT INTO cortex.classified.v1 SELECT... (geo + type classification)
• Deadline-based filtering (auto-expire passed deadlines)
• Deduplication via content fingerprinting
PHASE 4: GOOGLE CLOUD FUNCTION + VERTEX AI
Cloud Function triggers on Kafka messages:
1. Gemini 2.0 Flash extracts structured eligibility (JSON schema)
2. text-embedding-004 generates 768-dim vectors
3. Publishes enriched data back to Kafka
4. Vectors stored in Firestore for semantic search
PHASE 5: WEBSOCKET REAL-TIME DELIVERY
FastAPI backend runs background Kafka consumer:
• Receives enriched opportunities
• PersonalizationEngine calculates match scores
• Pushes to users via WebSocket (60+ score threshold)
• Heartbeat/ping-pong for connection health
PHASE 6: AI CO-PILOT EXTENSION
Chrome extension (Manifest V3) with:
• Content script: FocusEngine (Sparkle placement), analyzeField(), refinementOverlay
• Side panel: Multi-doc upload, @mention parsing, KB toggle
• Unified auth via window.addEventListener('scholarstream-auth-sync')
• Platform personas for context-aware assistance
FLINK SQL EXAMPLE (Running in Confluent Cloud):
```sql
INSERT INTO 'cortex.filtered.v1'
SELECT url, source,
  CASE
    WHEN url LIKE '%devpost.com%' THEN 'DevPost'
    WHEN url LIKE '%dorahacks.io%' THEN 'DoraHacks'
    WHEN url LIKE '%hackquest.io%' THEN 'HackQuest'
    WHEN url LIKE '%mlh.io%' THEN 'MLH'
    ELSE 'Other'
  END as platform,
  CASE
    WHEN LOWER(html) LIKE '%hackathon%' THEN 'Hackathon'
    WHEN LOWER(html) LIKE '%bounty%' THEN 'Bounty'
    WHEN LOWER(html) LIKE '%scholarship%' THEN 'Scholarship'
    ELSE 'Other'
  END as opportunity_type
FROM 'cortex.raw.html.v1'
TECH STACK: • Streaming: Confluent Cloud (Kafka + Flink SQL + Schema Registry) • AI: Vertex AI (Gemini 2.0 Flash + text-embedding-004) • Backend: Python, FastAPI, Playwright, confluent-kafka • Frontend: React, TypeScript, WebSocket hooks • Extension: Chrome Manifest V3, Unified Auth Sync • Deployment: Google Cloud Run, Cloud Functions

---
### Challenges we ran into (Recommended: 200-400 words)
THE ANTI-BOT NIGHTMARE (Biggest Challenge) Every platform blocked our traditional HTTP scrapers. DevPost, DoraHacks, SuperTeam—all returned 403 Forbidden. After weeks of frustration, we evolved: • HTTP → Scrapy (blocked) • Scrapy → Headless Chrome (detected) • Headless Chrome → Stealth Playwright (SUCCESS!)
The breakthrough: Injecting anti-detection JavaScript that removes navigator.webdriver, spoofs plugins and hardware, mimics human behavior with mouse movements and scrolling.

CONFLUENT FLINK INTEGRATION Initial plan: Use Pub/Sub Sink connector. Problem: Confluent Cloud doesn't have a Pub/Sub SINK (only Source).
Solution: HTTP-triggered Cloud Function with Kafka-to-HTTP bridge. This actually SIMPLIFIED architecture—fewer moving parts, direct Kafka → Cloud Function → Kafka flow.

VECTOR SEARCH COMPLEXITY 768-dimensional embeddings are powerful but require careful implementation: • Truncating descriptions to 1000 chars for embedding generation • Storing vectors in Firestore with proper indexing • Balancing semantic similarity with exact filters (deadline, amount)

UNIFIED AUTH FOR EXTENSION Chrome extensions run in isolated contexts. Sharing auth with web app required: • Custom event dispatch: window.dispatchEvent(new CustomEvent('scholarstream-auth-sync')) • localStorage polling fallback for already-loaded pages • Token refresh without WebSocket disconnection

CHARACTER LIMIT ENFORCEMENT AI loves to be verbose. Fields have hard limits (200 chars, 500 words). Solution: Post-generation truncation at word boundaries + limit detection via DOM analysis (maxlength, data-* attributes, surrounding text like "max 200 characters").

REFINEMENT UX Users needed to edit AI content without re-generating from scratch. Solution: Double-click overlay with prompt input. AI receives current content + instruction, preserves core message while applying refinement.

@MENTION DOCUMENT SELECTION With multiple docs uploaded, how does user specify which to use? Solution: FAANG-level @mention parsing. Type @resume and only that doc enters the AI prompt. No @mentions = profile-only or empty KB (user-controlled toggle).

---
### Accomplishments that we're proud of (Recommended: 200-400 words)
FULL CONFLUENT STACK UTILIZATION Not just Kafka—we use Confluent Flink SQL for real-time stream transformation: • Platform detection (DevPost vs DoraHacks vs MLH) • Geographic classification (Nigeria, US, Global) • Opportunity type categorization (Hackathon, Bounty, Scholarship, Grant) • Deadline-based filtering (auto-expire passed opportunities)
This is TRUE stream processing, not batch disguised as real-time.

768-DIMENSIONAL VECTOR EMBEDDINGS We don't just keyword match. Vertex AI text-embedding-004 generates semantic vectors. "Find React hackathons" matches "JavaScript frontend competition"—because they're semantically similar.

ON-DEMAND AI CRAWLING Ask the chat: "Find blockchain grants in Q1 2025" AI generates search queries, dispatches stealth crawlers, enriches results with Gemini, returns personalized matches—all in one conversation turn.

UNIFIED AUTH SYNC (Zero Config) Login to ScholarStream web app → Extension automatically inherits token via custom events. No extension-specific login. No OAuth popups. Just seamless.

MULTI-DOC @MENTION KNOWLEDGE BASE Upload 5 documents. Use @resume @readme @coverletter in chat. AI uses ONLY those specific docs—FAANG-level knowledge base control.

DOUBLE-CLICK REFINEMENT MAGIC After Sparkle fills a field, double-click to refine. Type "make it more personal" → AI rewrites in place, preserving facts while applying style.

CHARACTER/WORD LIMIT DETECTION Extension analyzes every field: • maxlength attribute • data-max-length • Surrounding text ("max 200 characters") • Placeholder hints

AI respects ALL constraints. Never generates 500 words for a 200-char field.

PLATFORM-SPECIFIC PERSONAS On DevPost: "Focus on demo video—3x more views" On DoraHacks: "Emphasize on-chain components" On Gitcoin: "Highlight public goods impact for QF"

99.98% FASTER DISCOVERY Traditional: 6-hour scheduled refresh ScholarStream: 2-5 seconds end-to-end

---
### What we learned (Recommended: 200-400 words)
FLINK SQL IS POWERFUL FOR CLASSIFICATION We initially planned complex Python logic for opportunity categorization. Flink SQL made it declarative: CASE WHEN url LIKE '%devpost%' THEN 'DevPost' END Running directly on Confluent Cloud—no server management.

VECTOR EMBEDDINGS CHANGE MATCHING Keyword search: "React" only matches "React" Semantic search: "React" matches "JavaScript frontend framework" 768-dim embeddings from text-embedding-004 enable true semantic opportunity matching.

ANTI-BOT DETECTION IS SOPHISTICATED Websites check: • navigator.webdriver flag • Canvas fingerprinting • Plugin signatures • Mouse movement patterns Stealth Playwright with human simulation was the only solution that worked.

UNIFIED AUTH > SEPARATE LOGIN Users hate logging in twice. Our custom event sync: window.addEventListener('scholarstream-auth-sync') Made extension auth invisible—just works.

@MENTIONS ARE INTUITIVE Instead of complex file selectors, simple @filename syntax. Users already know it from Slack, GitHub, Twitter.

REFINEMENT > REGENERATION Users don't want to lose good content. Double-click refinement lets them tweak AI output without starting over. "Make it shorter" preserves the facts, just condenses.

LIMITS MUST BE ENFORCED AI will write 1000 words if you let it. We: • Detect field constraints via DOM analysis • Pass limits to AI prompt • Post-process truncate at word boundaries • Show warnings in thought bubble

PLATFORM CONTEXT MATTERS Generic advice fails. Platform-specific personas: • Research judging criteria • Study winning submissions • Embed tips in AI prompts This is what makes Sparkle feel magical.

EVENT-DRIVEN > POLLING The mental shift from "check every 6 hours" to "react to events" fundamentally improved UX. Flink + Kafka made this possible.

CONFLUENT CLOUD + GCP = PERFECT COMBO Confluent for streaming, GCP for AI. Schema Registry, Flink SQL, Gemini, Cloud Run—all worked together beautifully.

---
### What's next for ScholarStream (Recommended: 150-300 words)
IMMEDIATE PRIORITIES:

ENHANCED FLINK SQL JOBS • Anomaly detection (sudden deadline changes) • Trending opportunities (spike in applications) • User behavior streaming (click → apply → win pipeline)

FIRESTORE VECTOR SEARCH (PRODUCTION) Embeddings are generated. Next: Enable native vector search in Firestore for sub-100ms semantic queries across 100k+ opportunities.

MOBILE APP WITH PUSH NOTIFICATIONS 80% of students browse on phones. React Native app with: • Real-time Kafka-backed push notifications • "Gates Scholarship just opened—you're a 92% match!"

APPLICATION TRACKER Draft → Submitted → In Review → Won/Lost Track every application with Flink-powered status updates.

COMMUNITY FEATURES • Success stories from winners • Peer application review • Team formation for hackathons

SCALE & SUSTAINABILITY:

MORE DATA SOURCES • University financial aid pages • Foundation grants (Gates, Bezos) • Corporate scholarship programs • International opportunities (UK, Canada, EU)

FLINK ML INTEGRATION Train models on: • Which opportunities users apply to • What profiles win which scholarships • Predict win probability per user-opportunity pair

PARTNERSHIPS Universities, hackathon organizers, scholarship foundations. ScholarStream as the discovery layer for the entire ecosystem.

THE MISSION CONTINUES: Every line of code brings us closer to a world where no student defers education because they didn't know help existed.

---
## 🏷️ ADDITIONAL FIELDS
### Team Members
Rasheed Yekini - Solo Developer Petroleum Engineering Student, University of Ibadan, Nigeria GDSC Mobile Lead • Volunteer Teacher

### License
MIT License (Open Source)

---
## ✅ SUBMISSION CHECKLIST
- [ ] Project title and tagline completed
- [ ] Project URL (hosted demo) added
- [ ] GitHub repository URL (public, with LICENSE file) added
- [ ] Demo video URL (YouTube/Vimeo, ≤3 minutes) added
- [ ] Challenge selected: Confluent Challenge
- [ ] All story sections filled out
- [ ] Built With technologies listed (Confluent Kafka, Flink SQL, Vertex AI)
- [ ] Team members listed
- [ ] Reviewed all content for typos
---
**🤲 Bismillah. May your submission be blessed with success!**