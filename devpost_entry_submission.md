# ScholarStream: AI-Powered Financial Opportunity Hub

## Tagline
*Real-time AI platform using Confluent Kafka + Flink + Vertex AI to help students discover scholarships, hackathons & bounties in seconds—not hours.*

---

## Inspiration

In 2019, I was a student at the University of Ibadan, Nigeria. My family couldn't afford tuition. I spent nights searching for scholarships—only to find opportunities expired, US-only, or requiring qualifications I didn't have.

One night, I found a scholarship I was perfect for. The deadline? Two days ago.

**The opportunities exist. Students just don't know they exist.**

They're scattered across DevPost, DoraHacks, MLH, Gitcoin, Intigriti, and countless platforms. ScholarStream brings them directly to students, in real-time, personalized to their profile.

---

## What It Does

### The Problem
A student in Lagos doesn't know there's a $50,000 hackathon on DevPost matching their React skills perfectly. A student in São Paulo doesn't know there's a $500 bug bounty on Intigriti for skills they learned last week.

### The Solution

**1. Real-Time Discovery**: Continuous monitoring of DevPost, DoraHacks, MLH, Taikai, HackQuest, Intigriti, and more. Every opportunity flows through Confluent Kafka, gets enriched by Vertex AI, and appears on dashboards within seconds.

**2. Semantic Matching**: 768-dimensional embeddings via `text-embedding-004`. "Frontend developer" matches "React engineer" even with zero word overlap.

**3. AI Chat Assistant**: Not a ChatGPT wrapper—a context-aware opportunity finder with **on-demand scraping**.

When you type "I need $500 by Friday":
- **Emergency Mode activates** (stress keywords detected)
- **Search criteria extracted** (types, urgency, timeline)
- **Semantic vector search** queries our embedding space
- **On-demand scraping triggers** if database is thin—`scout.execute_mission()` launches Playwright crawlers
- **Results appear in chat** (not dashboard) with the "Empathy Sandwich" technique

**4. AI Co-Pilot Chrome Extension**: The extraordinary part.

**How it works:**
1. **Navigate to any application** (DevPost, DoraHacks, MLH, Gitcoin, HackerOne, Immunefi, Kaggle)
2. **Extension scans the page**: Detects every field—labels, placeholders, character limits ("0/300"), word limits, required flags, field categories
3. **Focus on any field**: A pulsing sparkle button (✨) appears
4. **Click once**: AI generates personalized content using the **Tri-Fold Knowledge Base**:
   - Your profile (skills, background, interests)
   - Your uploaded documents (@resume, @readme, @cover_letter)
   - Current page context (platform expectations, field requirements)
5. **Content streams in real-time** with typewriter effect—respecting exact character limits
6. **Double-click to refine**: Overlay appears with "📝 More detailed", "✂️ More concise", or custom instructions. AI rewrites in place. You never leave the form.

**Platform-Specific Intelligence**: Each platform loads a specialized persona with tailored tips (DevPost judges want demo videos; DoraHacks wants on-chain components; MLH values learning journey).

**Unified Auth**: Login to ScholarStream once—extension inherits authentication automatically via custom events. Zero configuration.

---

## How We Built It

**Phase 1: Anti-Bot Detection**
Traditional scrapers (httpx, Scrapy) → Blocked. Headless Chrome → Detected. **Solution**: Playwright Stealth Mode with anti-detection scripts. DevPost, DoraHacks, MLH—all accessible.

**Phase 2: Confluent Kafka Streaming**
6 production topics. High-latency tuning for developing countries (socket timeout: 120s, message timeout: 300s). Reliable streaming from Nigeria's 200-400ms latency.

**Phase 3: Confluent Flink SQL**
Continuous stream processing: platform detection, type classification, geographic tagging, automatic expiration—all in declarative SQL.

**Phase 4: Vertex AI Enrichment**
Cloud Functions trigger on Kafka messages. Gemini 2.0 Flash extracts structured data. text-embedding-004 generates 768-dim vectors for semantic matching.

**Phase 5: Co-Pilot Extension**
FocusEngine class manages sparkle buttons, thought bubbles, and refinement overlays. Character limit detection via regex. Double-click handler for in-field refinement. Platform-specific personas with 8 supported platforms.

**Phase 6: Heartbeat Fallback**
If Confluent is unreachable, messages queue locally and retry automatically. Zero data loss.

---

## Challenges

1. **Anti-bot nightmare**: Burned through 3 approaches before Playwright Stealth worked
2. **Flink integration pivot**: Switched from direct Python consumers to Cloud Functions
3. **High-latency reality**: Aggressive timeout tuning for developing countries
4. **Empty dashboard disaster**: Defaulted to "Global" for hackathons/bounties
5. **Character limit detection**: Built regex for inconsistent patterns
6. **Double-click UX discovery**: Emerged from watching testers lose focus

---

## Accomplishments

- **True real-time**: Opportunity → dashboard in <5 seconds
- **Full Confluent stack**: Kafka (6 topics) + Flink SQL + Schema Registry
- **768-dim semantic matching**: Meaning-based, not keyword-based
- **On-demand AI scraping**: Chat triggers real-time crawlers
- **Co-Pilot Extension**: 8 platforms, field intelligence, double-click refinement, @mention documents, unified auth
- **Resilient architecture**: Heartbeat fallback ensures zero data loss
- **Shipped real product**: Deployed on Cloud Run, serving real students

---

## Built With

**Confluent**: Kafka (6 topics), Flink SQL, Schema Registry
**Google Cloud**: Cloud Run, Cloud Functions, Vertex AI Gemini, text-embedding-004, Firebase, Firestore
**Frontend**: React, TypeScript, Tailwind, Framer Motion, Chrome Extension (Manifest V3)
**Backend**: Python, FastAPI, WebSocket, Playwright Stealth

---

## Team

**Rasheed Yekini** — Solo developer, University of Ibadan, Nigeria. Built this because I lived the problem.

---

## Links

- **Live Demo**: scholarstream.lovable.app
- **Backend**: scholarstream-backend-opdnpd6bsq-uc.a.run.app
- **GitHub**: github.com/rash-dev-web/scholarstream

*The opportunities exist. Now you'll find them.*

**Bismillah. Allahu Musta'an.**
