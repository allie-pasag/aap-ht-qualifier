# Allie Pasag — High-Ticket Qualifier App
## Full Build Specification (v2.0 — Final)
**Brand:** askalliepasag.com
**Stack:** Next.js (App Router) · Tailwind CSS · Supabase · Anthropic API (claude-sonnet-4-6) · Vercel · GHL (via webhook)

---

## 1. CONTEXT

### What the App Does
A standalone diagnostic app for coaches and course creators that asks 6 branching questions, uses AI to generate a personalized readiness report based on their answers, and books them into a strategy call — giving the prospect instant clarity on exactly where they are, what's actually holding them back, and what they need to do next, so every lead arrives already diagnosed, pre-framed on investment, and ready to have the right conversation.

### Who It's For
Coaches and course creators at any stage — from no offer yet to validated offer needing infrastructure.

### What the Prospect Gets
- A personalized readiness report written by AI in Allie's voice
- Their specific situation named and reflected back to them
- An honest diagnosis of what's actually holding them back
- A price anchor so they arrive on the call pre-framed
- A direct path to book a strategy call

### MVP Flow
Standalone landing page → full-width hero with CTA → 6-step branching quiz → AI loading screen (3-5 seconds) → personalized result card → strategy call booking

---

## 2. HOW IT WORKS — START TO FINISH

This is the complete concept of what happens from the moment a prospect lands on the page to the moment they book a call.

**Step 1 — Land**
The prospect arrives on a standalone full-width landing page. No nav links. No distractions. One job: get them to start the quiz. They see a headline, a subheadline, and a CTA button.

**Step 2 — Enter Identity**
They fill in first name, last name, and email. This is captured before the quiz begins so no lead is lost even if they drop off mid-quiz.

**Step 3 — Answer 6 Branching Questions**
The quiz asks one question at a time. Their answers branch the path — not everyone sees the same questions. The layout shifts to a split view: fixed sidebar left (logo, photo, tagline, progress dots) and question right. The page never reloads.

**Step 4 — Cortex Routes Them**
The moment they hit submit, the server reads their answers and runs them through the decision tree. It identifies their client type (1-5 or a live-offer variant) and assigns them to a bucket (A, B, or C). This happens silently, server-side.

**Step 5 — AI Generates Their Report**
The server calls the Anthropic API (claude-sonnet-4-6) with:
- Their answers
- The language layer (what each answer means diagnostically)
- Their bucket and client type
- Allie's voice instructions

The AI writes a personalized headline, situation summary, and diagnosis. This takes 3-5 seconds. A loading screen plays while it generates.

**Step 6 — Result Card Displays**
The result card appears with their first name, AI-generated copy, a 2x2 status tile grid, a price anchor, and a CTA to book a strategy call.

**Step 7 — Data Stored and Webhook Fires**
All answers, AI output, bucket, client type, and price anchor are stored in Supabase. A webhook fires to GHL immediately to create the lead record and tag them by client type.

**Step 8 — They Book**
The CTA routes them to a strategy call booking page. They arrive pre-diagnosed, pre-framed on price, and knowing what to expect on the call.

---

## 3. CLIENT TYPES, GATES, BUCKETS, AND PRICING

### The 3 Gates

The cortex passes every prospect through three gates in sequence. Gates are not individual questions — they are the combined read of multiple answers.

**GATE 1 — Offer Clarity Gate**
Question: Where are they with their offer right now?
- Multiple ideas, can't decide → identifies Client Type 1. Stop here. Route to Bucket A.
- One skill, not packaged → move to sub-gate: have they solved it for someone?
  - Done it for free or not yet → identifies Client Type 2. Route to Bucket A.
  - Done it for pay → pass to Gate 2.
- Has an offer, actively selling → pass to Gate 2.

**GATE 2 — Results Gate**
Question: Is it converting the way they want?
- Yes consistently → pass to Gate 3.
- Somewhat or No → move to Gate 3 to confirm infrastructure status.

**GATE 3 — Infrastructure Gate**
Question: Do they have a live sales page or funnel?
Combined read with Gate 2:
- Converting = inconsistent or no + nothing built → Client Type 3. Route to Bucket B.
- Converting = inconsistent or no + something not working → Client Type 3. Route to Bucket B.
- Converting = yes + nothing built → Client Type 5. Route to Bucket C.
- Converting = yes + working → ask follow-up: new offer or improve?
  - New offer → Bucket C (DESIGN + Full Launch)
  - Improve existing → Bucket C (Scope TBD on call)

---

### Client Type Definitions

**CLIENT TYPE 1 — The Knowledgeable Mess**
- **Who they are:** Has 5-10+ years of experience, multiple income streams, a Notion doc full of ideas, and zero clarity on what to lead with. Has made money but can't replicate it.
- **What they have:** Some revenue, multiple directions, no packaged offer
- **What's stopping them:** Too many ideas. The market can't tell what they're known for. Until one offer is clear, building anything else just adds noise.
- **What they need:** Offer clarity before anything gets built. No infrastructure yet.
- **Gate that identifies them:** Gate 1 — answers "multiple things, can't decide"
- **Bucket:** A
- **Price anchor:** Starting from $2,500
- **AI framing:** "You know what you're good at. You just can't decide which version of it to sell."

**CLIENT TYPE 2 — The Almost Ready**
- **Who they are:** Has one clear skill, has done it free or cheaply for friends, knows there's a market, just hasn't packaged it into something sellable.
- **What they have:** One proven skill, zero infrastructure, no formal offer
- **What's stopping them:** Never packaged the skill. The proof of concept exists but the business doesn't yet.
- **What they need:** Offer clarity and packaging before any infrastructure.
- **Gate that identifies them:** Gate 1 — answers "one skill, not packaged" + "free or not yet"
- **Bucket:** A
- **Price anchor:** Starting from $2,500
- **AI framing:** "You know exactly what you want to do. You just haven't built it into something people can buy yet."

**CLIENT TYPE 3 — The Frustrated Launcher**
- **Who they are:** Has an offer they've been selling for 6-12 months. Some clients. Not enough. They blame their funnel, their copy, their niche. The real problem is the offer isn't positioned correctly.
- **What they have:** An offer, some infrastructure (page, emails, or a funnel), some clients — but inconsistent conversion
- **What's stopping them:** Something is off and it's worth finding out why before building anything else. The infrastructure won't fix a positioning problem.
- **What they need:** Offer diagnosis first. Then a targeted fix to the infrastructure based on what the diagnosis surfaces.
- **Gate that identifies them:** Gate 2 (inconsistent or no) + Gate 3 (nothing built or something not working)
- **Bucket:** B
- **Price anchor:** Starting from $2,500 (scope confirmed after diagnosis call)
- **AI framing:** "Something is off — and it's worth finding out why before you build anything else."

**CLIENT TYPE 4 — The Ceiling Hitter**
- **Who they are:** A working offer, consistent clients, but outgrown it. Undercharging. Overdelivering. The offer needs to evolve or be replaced. Infrastructure exists and works.
- **What they have:** Validated offer, working infrastructure, consistent results — but the offer has a ceiling
- **What's stopping them:** The offer can't scale. It was built for where they were, not where they're going.
- **What they need:** Offer evolution or a new offer. Then a new infrastructure layer to support it.
- **Gate that identifies them:** Gate 2 (yes, converting) + Gate 3 (working, new offer path)
- **Bucket:** C
- **Price anchor:** Starting from $6,500
- **AI framing:** "You have proof. Your system doesn't match what you've built."

**CLIENT TYPE 5 — The Ready Builder**
- **Who they are:** Validated offer, paying clients, documented results. Knows what they sell and to whom. Needs the machine built — pages, automation, tech, traffic.
- **What they have:** Validated offer, consistent results — but no infrastructure or infrastructure needs rebuild
- **What's stopping them:** Nothing offer-related. They just don't have the system yet.
- **What they need:** Full infrastructure build. No offer work needed.
- **Gate that identifies them:** Gate 2 (yes, converting) + Gate 3 (nothing built)
- **Bucket:** C
- **Price anchor:** Starting from $4,500
- **AI framing:** "You have proof. Your system doesn't match what you've built."

---

### Bucket Summary

| Bucket | Includes | Prescription | Price Anchor |
|---|---|---|---|
| A | Client Type 1 + 2 | Offer clarity only | Starting from $2,500 |
| B | Client Type 3 | Offer diagnosis + targeted fix | Starting from $2,500 + scope on call |
| C | Client Type 4, 5, Live variants | Full build or scope TBD | Starting from $4,500–$6,500 |

---

## 4. MEMORY (Supabase Schema)

### Table: `leads`

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key, auto-generated |
| created_at | timestamp | Auto-generated |
| first_name | text | Step 1 |
| last_name | text | Step 1 |
| email | text | Step 1 |
| offer_status | text | Step 2: multiple_ideas / one_skill / has_offer |
| most_money | text | Step 2A: one_money / all_similar / none / same_skill |
| solved_for_someone | text | Step 2B: yes_paid / yes_free / not_yet |
| converting | text | Step 3: yes / somewhat / no |
| infrastructure | text | Step 4: nothing / needs_improvement / working |
| new_or_improve | text | Step 4A: new_offer / improve |
| what_they_have | text[] | Step 5 multi-select array |
| urgency | text | Step 6: 30_days / 60_90_days / 3_6_months |
| client_bucket | text | Cortex output: A / B / C |
| client_type | text | Cortex output: 1 / 2 / 3 / 4 / 5 / live_new / live_improve |
| ai_result_headline | text | AI-generated headline |
| ai_result_summary | text | AI-generated situation summary |
| ai_result_diagnosis | text | AI-generated diagnosis |
| price_anchor | text | Displayed on result card |
| ghl_synced | boolean | Whether GHL webhook fired |

---

## 5. QUIZ — FULL COPY

### Landing Page
**Nav:** Logo left · "Find out where you are →" CTA right
**Eyebrow:** "Free diagnostic for coaches and course creators"
**Headline:** "Find out exactly where you are — and what to build next."
**Subheadline:** "Answer 6 questions. Get your personalized readiness report instantly."
**CTA:** "Get my readiness report →"
**Trust line:** "3 minutes. No pitch. No waiting."

**Below fold:**
- Allie's photo + 2-3 sentence credibility copy (coaches and course creators only)
- 3 value prop cards
- Repeat CTA
- Footer: Logo · Privacy Policy · Terms

---

### Step 1 — Identity
**Headline:** "Let's start with you."
**Subtext:** "Who are we talking to?"
- First name field
- Last name field
- Email field
- Button: "Continue →"

---

### Step 2 — Situation
**Headline:** "Where are you with your offer right now?"
**Subtext:** "Be honest. This determines everything."

| Option | Label | Description | Routes to |
|---|---|---|---|
| A | I have multiple things I do and can't decide what to lead with | Too many directions, no clear lead offer | Step 2A |
| B | I have one clear skill but haven't packaged it into something I can sell | Know what I do, haven't built the offer | Step 2B |
| C | I have an offer and I'm actively selling it or trying to | Defined, priced, in market | Step 3 |

---

### Step 2A — Which Made Most Money
*(Shows only if Step 2 = A)*
**Headline:** "Which one has made you the most money — even once?"
**Subtext:** "Follow the money. It usually knows what you don't."

| Option | Label | Routes to |
|---|---|---|
| A | One has made money but I keep second-guessing it | Client Type 1 → Bucket A |
| B | They've all made similar amounts so I can't decide | Client Type 1 → Bucket A |
| C | None of them have made money yet | Client Type 1 → Bucket A |
| D | It's really the same skill just packaged differently each time | Client Type 2 → Bucket A |

---

### Step 2B — Solved For Someone
*(Shows only if Step 2 = B)*
**Headline:** "Have you ever solved this problem for someone?"
**Subtext:** "Paid or unpaid. Real delivery counts."

| Option | Label | Routes to |
|---|---|---|
| A | Yes — and they paid me for it | Step 3 |
| B | Yes — but I did it for free | Client Type 2 → Bucket A |
| C | Not yet — it's still an idea | Client Type 2 → Bucket A |

---

### Step 3 — Results
**Headline:** "Is your offer converting the way you want it to?"
**Subtext:** "Converting means consistent, repeatable, predictable. Not just 'I've made some sales.'"

| Option | Label | Routes to |
|---|---|---|
| A | Yes — people are paying consistently and I can replicate it | Step 4 |
| B | Somewhat — some sales but I can't make it happen on demand | Step 4 |
| C | No — it's not selling the way I want it to | Step 4 |

---

### Step 4 — Infrastructure
**Headline:** "Do you have a live sales page or funnel right now?"
**Subtext:** "Something built and active — not a draft, not a Notion doc."

| Option | Label | Routes to |
|---|---|---|
| A | Yes — it's live and it's working | Step 4A |
| B | I have something but it's not really working | Client Type 3 → Bucket B |
| C | Nothing built yet | Client Type 3 (if Step 3 = B/C) or Client Type 5 (if Step 3 = A) |

---

### Step 4A — New or Improve
*(Shows only if Step 4 = A)*
**Headline:** "What are you looking to do?"
**Subtext:** "Help us understand where this is going."

| Option | Label | Routes to |
|---|---|---|
| A | Build for a new offer | Bucket C — DESIGN + Full Launch |
| B | Fix or improve what I already have | Bucket C — Scope TBD |

---

### Step 5 — Infrastructure Drill-Down
*(Context only — no routing impact)*
**Headline:** "What do you currently have in place?"
**Subtext:** "Select everything that applies."
*(Multi-select checkboxes)*

- Sales page or landing page
- Email automation or sequences
- CRM or pipeline tool (GHL, HubSpot, etc.)
- Membership or course platform (Kajabi, Skool, etc.)
- Organic social presence
- Paid ads running
- None of the above

---

### Step 6 — Urgency
*(Context only — no routing impact)*
**Headline:** "When do you need this done?"
**Subtext:** "Be realistic. This affects scope and prioritization."

| Option | Label |
|---|---|
| A | As soon as possible — within 30 days |
| B | Within 60–90 days — I have some runway |
| C | Still planning — 3–6 months out |

---

## 6. AI RESULT GENERATION

### How the AI Layer Works

Every answer in the quiz feeds the AI two ways:

1. **Routing value** — used by the cortex to identify client type and bucket (processed silently, never shown)
2. **Language layer** — a diagnostic interpretation of what that answer means, passed to the AI so it can write copy that feels specific to that person

The AI never sees raw answer labels like "somewhat" or "nothing built." It sees what those answers mean. This is what makes the result feel like it was written by someone who understood them — not a quiz output.

---

### Language Layer (what each answer feeds to the AI)

**offer_status — multiple_ideas:**
"This person has multiple income streams or offer ideas and can't decide which to lead with. The market can't tell what they're known for. Until one offer is clear, building anything else just adds to the noise."

**offer_status — one_skill:**
"This person has one clear skill but hasn't packaged it into something they can sell. The ability exists. The offer doesn't yet."

**offer_status — has_offer:**
"This person has a defined offer they're actively selling or trying to sell."

**most_money — one_made_money_second_guess:**
"They already know which direction works. The hesitation is the only thing slowing them down."

**most_money — all_similar:**
"When everything feels equal, nothing gets chosen — including by their clients."

**most_money — none_made_money:**
"Pre-revenue across the board. The first job is clarity, not infrastructure."

**most_money — same_skill_diff_packaging:**
"Not confused about what they do. Confused about how to position it."

**solved_for_someone — yes_paid:**
"Someone has already paid for this — the offer is real, even if it's not packaged yet."

**solved_for_someone — yes_free:**
"The proof exists but the business doesn't yet. Delivery is proven, pricing isn't."

**solved_for_someone — not_yet:**
"Still an idea. That's not a problem — it just means we start at the beginning."

**converting — yes:**
"The offer is working. The question now is whether the infrastructure matches what they've built."

**converting — somewhat:**
"Inconsistent results almost never mean the funnel is broken. Something upstream isn't landing clearly enough for strangers to say yes without a conversation."

**converting — no:**
"If it's not converting, building more infrastructure won't fix it. The offer needs attention first."

**infrastructure — nothing:**
"No infrastructure exists yet. Clean foundation to build from."

**infrastructure — needs_improvement:**
"Something is built but it's not working. Before fixing the build, we need to know why."

**infrastructure — working:**
"Infrastructure exists and it's working. The question is whether it matches what they've built and where they're going next."

**new_or_improve — new_offer:**
"They have a working system and want to build for a new offer. Needs both offer strategy and infrastructure."

**new_or_improve — improve:**
"They have a working system and want to improve what exists. Scope confirmed on the call."

**what_they_have — list:**
"They currently have {list} in place. This is the context for what gets built on top of, or what's missing."

**urgency — 30_days:**
"They need to move fast — scope and prioritization should reflect urgency."

**urgency — 60_90_days:**
"Enough runway to do this right without rushing."

**urgency — 3_6_months:**
"In planning mode — can be strategic about sequencing and starting point."

---

### Anthropic API Prompt Structure

**System prompt (sent server-side, never exposed to client):**

```
You are a diagnostic advisor writing on behalf of Allie Pasag (askalliepasag.com), 
a strategist for coaches and course creators.

Allie's voice: warm, direct, honest. She says hard truths in the most loving way. 
No hype. No chaos. Calm and clear. Plain English. Conversational. No em dashes.

Words to never use: journey, unlock, game-changer, seamless, leverage, 
straightforward, honestly, genuinely.

Output format: JSON only. No preamble. No markdown. Keys: headline, summary, diagnosis.
```

**User prompt (built dynamically per submission):**

```
PROSPECT: {first_name}
BUCKET: {bucket}
CLIENT TYPE: {client_type}

THEIR ANSWERS AND WHAT THEY MEAN:
- Offer status: {offer_status_label} — {language_layer_offer_status}
- Payment history: {payment_label} — {language_layer_payment}
- Converting: {converting_label} — {language_layer_converting}
- Infrastructure: {infrastructure_label} — {language_layer_infrastructure}
- What they have: {what_they_have_list} — {language_layer_what_they_have}
- Urgency: {urgency_label} — {language_layer_urgency}

Write three things:

1. HEADLINE (1 sentence, max 15 words): Names their specific situation. 
   Not generic. Makes them think "how did they know that about me."

2. SUMMARY (2-3 sentences): Reflects their answers back to them using 
   the diagnostic context above. Makes them feel deeply understood.

3. DIAGNOSIS (2-3 sentences): Names the real problem — not the symptom 
   they think it is. What's actually holding them back and why. 
   Says the hard thing in the most loving way.
```

---

### Result Card Structure

```
YOUR READINESS REPORT — {FIRST_NAME}

{AI_HEADLINE}

{AI_SUMMARY}

{AI_DIAGNOSIS}

[STATUS TILES — 2x2 grid]
Offer Status        | Validation
Conversion          | Timeline

[PRICE BLOCK]
Starting investment: {PRICE_ANCHOR}
{PRICE_NOTE}

[CTA BLOCK]
Ready to talk?
Your report has been sent to your email.
[Book your strategy call →]
No pressure. No pitch. Just a clear plan.
```

### Status Tile Values Per Bucket

**Bucket A:**
- Offer Status: Unclear
- Validation: Not yet
- Conversion: Pre-market
- Timeline: {urgency_label}

**Bucket B:**
- Offer Status: Exists
- Validation: Validated
- Conversion: Inconsistent
- Timeline: {urgency_label}

**Bucket C:**
- Offer Status: Validated
- Validation: Proven
- Conversion: Working
- Timeline: {urgency_label}

---

### Result Card Headlines (locked per bucket for AI reference)

**Bucket A — Client Type 1:**
"You know what you're good at. You just can't decide which version of it to sell."

**Bucket A — Client Type 2:**
"You know exactly what you want to do. You just haven't built it into something people can buy yet."

**Bucket B — Client Type 3:**
"Something is off — and it's worth finding out why before you build anything else."

**Bucket C — Client Type 4/5:**
"You have proof. Your system doesn't match what you've built."

---

## 7. FAQ — 8 OBJECTIONS ANSWERED

**"I don't even know if I'm ready for this. What if I'm too early?"**
That's actually the best reason to fill this out. You don't need to have everything figured out first. Just answer honestly and the report will tell you exactly where you are and what makes sense as a first step. Being early is a starting point, not a problem.

**"I've tried things before and wasted money. How is this different?"**
Most people lose money because they built things before their offer was ready. Pages, funnels, tech — all of it on a foundation that wasn't solid yet. This diagnostic is specifically designed to catch that before it happens. We won't recommend building anything until we know it will actually work.

**"What if I fill this out and you just try to sell me something I don't need?"**
If you don't need it, we'll tell you. The report gives you an honest picture of where you are. If the call reveals that what we offer isn't the right fit for your situation, we'll say that out loud. No runaround.

**"I can't afford a big investment right now."**
Good to know before the call, not on it. The report shows you a starting investment range upfront so there are no surprises. And if the timing genuinely isn't right, we would rather say so now than take money that doesn't make sense for where you are.

**"I don't have time to build a whole funnel or system."**
You don't have to build everything at once. The report shows you what to do first and what to leave alone until you're ready. Most people are trying to do too many things at the same time and that's exactly what's slowing them down.

**"What if my offer isn't good enough to launch?"**
Then we start there. An offer that isn't ready yet is just a starting point. Knowing that before you spend money on infrastructure is honestly the most valuable thing this diagnostic can give you.

**"I've been burned by coaches and agencies before."**
That's a fair thing to bring to this. We don't promise results we can't control. What we can tell you is that we will always be honest about what you need, we build what we say we will build, and we will tell you when the answer is not yet rather than take your money anyway.

**"What actually happens on the call? Is it going to be a sales pitch?"**
No pitch and no pressure. It's thirty minutes where we look at your report together, confirm what it's telling us, and give you a clear picture of what the right next step looks like. Whether that ends up being working together or not, you will leave the call knowing something useful that you didn't know when you got on it.

---

## 8. VISION

### Brand Tokens
| Token | Value |
|---|---|
| Background | #0D0D0D |
| Sidebar background | #111111 |
| Primary accent | #E040FB (magenta) |
| Text primary | #FFFFFF |
| Text secondary | #888888 |
| Text muted | #444444 |
| Card background | #161616 |
| Card border | #222222 |
| Selected border | #E040FB |
| Selected background | rgba(224, 64, 251, 0.04) |
| Headline font | Playfair Display (serif) — 400, 500 |
| Body font | Inter (sans-serif) — 300, 400, 500 |
| Step labels | Inter uppercase, letter-spacing 0.15em |

### Page Structure
| Screen | Layout | Sidebar |
|---|---|---|
| Landing page | Full-width, no sidebar | None |
| Quiz screens | 220px fixed sidebar + flexible main | Logo + headshot + tagline + progress dots |
| Loading screen | Split layout, centered animation | Same sidebar |
| Result card | Split layout, scrollable main | Same sidebar |

### Sidebar Contents
- Logo/wordmark: askalliepasag
- Headshot: allie_.jpeg
- Tagline: "This takes 3 minutes. What you get at the end is worth it."
- Progress dots: filled = complete, ring = active, empty = remaining

### Environment Variables
```
ANTHROPIC_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GHL_WEBHOOK_URL=
```

### GHL Webhook Payload
```json
{
  "first_name": "",
  "last_name": "",
  "email": "",
  "client_type": "",
  "client_bucket": "",
  "price_anchor": "",
  "urgency": "",
  "what_they_have": [],
  "ai_result_headline": "",
  "ai_result_diagnosis": ""
}
```

### Security Rules
- All API keys in .env — never hardcoded
- Anthropic API call server-side only via Next.js API route
- Supabase service role key server-side only
- Prices and results never calculated or generated client-side

### No Vibe Coding Rule
Do not guess or assume. If any information is missing to build a component correctly, stop and ask before generating code.

---

## 9. AI CONTEXT CHECKLIST (run before every coding session)

- [ ] Declare stack: "We are building this using Next.js (App Router), Tailwind CSS, Supabase, and the Anthropic API. Deploy to Vercel."
- [ ] Feed schema: Paste the `leads` table from Section 4
- [ ] Enforce env vars: "Use .env for all API keys. Do not hardcode."
- [ ] Add constraint: "Do not guess. If something is unclear, ask before writing code."
- [ ] Name the component you're building
- [ ] State its role: Vision (UI) or Cortex (logic)?
- [ ] This file is the single source of truth. No companion file needed.

---

*Spec version 2.0 — Final — askalliepasag qualifier*
