# Prime Clean — Cleanliness & Compliance Scorecard: System & Process

## 1. The Scorecard Rubric

100 points, split across 5 categories worth 20 points each. Every category has 5-6 checklist items rated **Good / Fair / Needs Attention** (Good = full points, Fair = 60%, Needs Attention = 0). This is the same rubric built into the tool below.

**Restrooms & Supply Levels (20 pts)** — Toilets/urinals/sinks visibly clean, no buildup (5) · Floors dry, no odor (5) · Trash emptied, liners in place (4) · Supplies stocked — soap, paper, sanitizer (4) · Mirrors & fixtures streak-free (2)

**High-Touch Surface Disinfection (20 pts)** — Door handles & push plates (4) · Light switches (3) · Elevator buttons/handrails (3) · Shared equipment surfaces — copier, kiosk, phones (4) · Reception desk/counters (3) · Stairwell handrails (3)

**Floor Care & Entryways (20 pts)** — Entry mats clean, no debris (4) · Carpets vacuumed, no visible stains (5) · Hard floors swept & mopped, no residue (5) · Baseboards & corners free of buildup (3) · Glass entry doors streak-free (3)

**Trash, Recycling & Common Areas (20 pts)** — Bins emptied, liners replaced (5) · Recycling properly sorted (3) · Break room/kitchenette wiped down (5) · Windowsills & surfaces dust-free (4) · General clutter & organization (3)

**OSHA & Compliance-Relevant Items (20 pts)** — Chemicals labeled & securely stored (5) · Safety Data Sheets accessible on site (4) · Wet-floor signage protocol in place (3) · Emergency exits & pathways unobstructed (4) · Fire extinguisher access unblocked (4)

**Score bands:** 90-100 Excellent · 75-89 Good · 60-74 Needs Attention · Below 60 Poor — same bands used on the website's offer section and in the tool, so the message is consistent everywhere a prospect encounters it.

---

## 2. The Tool

I built this rubric into a working field tool Jackie can use on her phone or a tablet during the walkthrough: **[Prime Clean Walkthrough Scorecard]** — the link is attached to this message as a Cowork artifact, so it's already live and bookmarkable.

How it works, in practice:

- She enters the business name, contact, city, and facility type, then works through the 5 categories, tapping Good / Fair / Needs Attention for each item — big touch targets, no typing required except optional notes.
- A live score updates in the header the whole time, so she can see where the facility is trending before she even finishes.
- She can attach a few reference photos per category directly from her phone's camera (these stay on her device — nothing uploads automatically).
- When every item is rated, "Generate Client Report" builds a branded, client-facing report: overall score and band, a bar chart of the 5 category scores, a findings list (anything rated Fair or Needs Attention, plus her notes), and the attached photos.
- From there she has two options: **Download Report** saves it as a polished, self-contained HTML file she can open, print to PDF, or attach to an email — and **Open Email Draft** builds a plain-text email (subject + body, summarizing the score and inviting a quote conversation) that she can copy into Gmail/Outlook or try opening directly in her mail app.

It's intentionally self-contained and device-local — no login, no server, no data leaving her phone until she chooses to download or send something. That was a deliberate choice, explained below.

---

## 3. Your question: can AI score the photos and email the client automatically?

Short answer: **partially, today — fully, eventually, but I'd keep a human in the loop even then.** Here's the honest breakdown of what's realistic at each stage, so you can decide how far to take this.

### Tier 1 — What the tool above does right now (zero cost, live today)
Jackie scores the facility herself using the checklist (that's the actual assessment — a facility manager trusts a human judgment call more than an unreviewed AI verdict on their building anyway). The tool does the math, formats the report, and prepares the email. She reviews it and hits send herself. This is the fastest path to "every walkthrough gets a professional, branded report," and it's already built.

### Tier 2 — AI-assisted scoring, available now through a Cowork session like this one
This is the part that's genuinely available today without building anything new: if Jackie takes her walkthrough photos and drops them into a shared Google Drive folder (or forwards them by email), a Cowork session with Gmail/Drive connected — like this one — can review the photos against this exact rubric, draft a suggested score and narrative per category, and even draft the client email. A person on your team then reviews it for accuracy before it goes out. This is a real, working option this week if you want to try it: connect Drive and/or Gmail to a Cowork session, and I (or whoever runs that session) can turn a folder of walkthrough photos into a drafted report the same way I just built the rubric and tool. I'd treat this as an assist for busy weeks, not a replacement for Jackie's own eyes on-site — but it's real.

### Tier 3 — Fully automated: photo in, score and email out, no human step
This is where I'd push back a little, not because it's technically impossible (it isn't — a vision-capable AI can flag dust, stains, clutter, missed trash, etc. from a photo reasonably well) but because of what happens when it's wrong. If an automated system scores a facility "Excellent" from a photo that happens to be well-lit and misses a real problem, or flags a competitor-cleaned facility as "Poor" based on a bad-angle photo, that report goes out under Prime Clean's name with your certifications attached to it. A wrong automated score is a much bigger liability than a slow manual one — it's the kind of thing that costs you credibility with exactly the facility managers you're trying to win over. My recommendation: even a "fully automated" version should have a lightweight human-approval step before anything reaches a client (see Phase roadmap below) — the automation should draft, not send.

If you do want to build toward Tier 3, here's roughly what it takes: a small backend service (photos upload from Jackie's phone via a simple app or web form), a vision-capable AI model call per photo to detect specific issues against the rubric, a database to store walkthrough history per client, and an email-sending service (e.g., SendGrid or the Gmail API) triggered on approval. That's a real, scoped software project — I'd estimate low-to-mid four figures and a few weeks with a freelance developer or a no-code platform (see the roadmap), not something to build blind. Given where the business is today, I'd treat this as a "once outreach volume justifies it" investment, not a day-one requirement.

### Recommended path
Start with Tier 1 (live now) so every walkthrough gets a consistent, professional report immediately. Use Tier 2 opportunistically — on a heavy week, or for a batch of walkthroughs, run photos through a Cowork session for an AI-drafted first pass that Jackie or the office reviews before sending. Only invest in Tier 3 once you're doing enough walkthroughs per week that the manual report-writing step is actually the bottleneck — at that point, a no-code automation layer (Jotform or Tally for the intake form, paired with Zapier or Make.com to auto-email a templated report on submission, with the AI-scoring step added later) gets you most of the way there without a custom app.

---

## 4. Process for Jackie & the Prime Clean Team

**Before the walkthrough**
1. Confirm the appointment with the contact name, business name, and address (from the contact form or outreach email).
2. Open the Walkthrough Scorecard tool on your phone before you arrive — takes a few seconds, no login needed.

**During the walkthrough (15-20 minutes)**
3. Fill in the business name, contact, city, facility type, and your name at the top.
4. Walk each of the 5 areas in order — restrooms, high-touch surfaces, floors & entryways, trash & common areas, OSHA/compliance items — rating each checklist item Good / Fair / Needs Attention as you go. Don't overthink borderline calls: if you'd hesitate to call it "Good" out loud to the facility manager, it's Fair at best.
5. Add a one-line note on anything a client would want explained in plain language (e.g., "recycling bins mixed with trash in the break room").
6. Snap a photo for anything you rate Fair or Needs Attention — these become the evidence in the report, and they're the most persuasive part of it.

**Right after the walkthrough (2 minutes, ideally before you leave the parking lot)**
7. Tap "Generate Client Report" and read it over once — does the score and tone feel fair and accurate?
8. Tap "Download Report to Send" and save it.
9. Tap "Open Email Draft," personalize the greeting if needed, and send it to the contact — same day, ideally same hour. Attach the downloaded report file so the client gets the photos and full detail, not just the summary text.

**Same day, back at the office**
10. If the score was 75+ (Good/Excellent) and there's no immediate quote conversation, log it as a warm lead for a follow-up touch in 60-90 days (see the marketing plan's contract-renewal timing tactic).
11. If the score was under 75, this is your best opening for the written-quote conversation — reference the specific findings directly ("the report flagged three things — happy to walk through what fixing those would look like on a regular contract").
12. Forward a copy of every sent report to a shared team email or folder (e.g., a "Walkthroughs" label in Gmail, or a shared Drive folder) so there's a running record the whole team can reference — the tool itself doesn't keep a company-wide log by design (data stays on Jackie's device until she sends it), so this manual forward is what turns individual walkthroughs into a searchable company record until/unless you build a Tier 3 system with a real database.

**Weekly**
13. Review the week's reports together — look for patterns (which categories score lowest across prospects, which cities are yielding the most walkthroughs) and feed that back into the outreach targeting.
