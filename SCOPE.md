# Sprint Scope — Founder Capstone

**Product (working name):** BorrowBlock  
**Sprint goal:** A trustworthy v1 where a neighbour can find a tool nearby and complete a booking — without dark patterns or half-built features.

This document answers the three questions we must settle before writing code. It is the backbone of `FOUNDER-RESPONSE.md`.

---

## 1. What ships this sprint

These features earned their place because they complete the core user journey and meet the brief's minimum bar.

| Feature | What "done" looks like |
|---------|------------------------|
| **Browse / home screen** | Lists available items near the user. Cards show photo (or placeholder), title, category, price/free, distance when known. Feels active through real data, not fake signals. |
| **Search** | Text search across item title and description. Instant or lightly debounced; works on mobile. |
| **Filters (3)** | Category, free vs paid, max distance. All three actually filter the list — not decorative UI. |
| **Item detail** | Photos (or placeholder), full description, owner name and rating (or "New lender"), price, distance, prominent **Book now** button. Paused items visible but not bookable. |
| **Booking flow (2+ steps)** | Step 1: pick dates. Step 2: review summary + agree to terms. Ends on a clear confirmation screen with a mock booking reference. |
| **Auth** | Sign up / log in screen. **Required only to complete a booking** — not to browse or search. Mock auth (local state / localStorage); no backend. |
| **Responsive + accessible** | Usable on phone. Keyboard-navigable: tab through filters and cards, Enter to open detail, visible focus states. |
| **Typed data layer** | Use and extend `src/data/types.ts`. Mock fetch via `fetchItems()`. Handle every awkward case in the mock data (no photo, no price, null rating, paused, removed, null distance). |
| **Deployment** | Live public URL (Vercel or Netlify). Link in README. Tested in a fresh browser before submit. |

**Core loop we're optimising for:**

```
Land on browse → search/filter → open item → book now → sign in → pick dates → confirm → done
```

---

## 2. What we refuse

These are explicit **no**s. Building them correctly would still be the wrong product decision.

### Refuse: Fake urgency countdown ("3 people are looking at this item right now!!")

**Why:** This is a dark pattern. The number would be fabricated — we have no real-time backend and almost no users. Fake scarcity trains users to distrust the product. If an investor or early user discovers it's made up, it damages Thabo's credibility more than it helps conversion.

**What we do instead:** Show honest signals only — e.g. item count in the area, "Listed this week" on recent posts, owner rating when it exists.

---

### Refuse: Signup wall before seeing anything

**Why:** Thabo framed this as a "growth hack" to capture emails. For a marketplace with no inventory yet, blocking the browse experience kills the exact moment we need — someone discovering that a drill exists 1.2 km away. People who can't see value won't sign up; people who see value will sign up to book.

**What we do instead:** Open browse and search to everyone. Gate **booking** behind auth — that's when we genuinely need identity and contact details.

---

## 3. What we reshape or defer

### Reshape: "Make it feel ALIVE / look busy"

**Thabo's intent:** New users should trust the platform has activity.

**Our version:** Use truthful activity from real mock data — "7 tools available near you", category chips with counts, "Recently listed" badges on items posted in the last 7 days. No invented viewers, no fake notification spam.

**Tradeoff:** Less dramatic than fake urgency. More sustainable and defensible to investors.

---

### Reshape: "Better than Airbnb"

**Thabo's intent:** Premium first impression.

**Our version:** One distinctive visual identity (warm, community-focused — not a generic template). Strong typography, intentional empty states, polished cards. We're not cloning Airbnb; we're building something that feels local and trustworthy.

---

### Defer: Messaging between borrower and owner

**Why:** Needs a backend, moderation, and safety considerations. A fake chat UI that doesn't work would be worse than nothing.

**Next sprint:** In-app messaging or at minimum click-to-contact after booking is confirmed.

---

### Defer: Full offline support + real-time updates

**Why:** Real offline requires service workers, sync strategy, and conflict resolution. Real-time requires WebSockets or similar. Neither is feasible without a backend in one sprint.

**What we ship:** Async mock fetch with loading states — structured as if a real API is coming.

---

### Defer: Map view

**Why:** Map libraries add weight and complexity. Distance filter + "1.2 km away" text serves the same user need for v1.

**Next sprint:** Map pin view once we have geocoded listings from a real API.

---

### Defer: Wishlist, referral codes, dark mode, write-reviews

**Why:** None are on the minimum bar. Each is a feature slice that would dilute polish on the core loop.

**Partial keep:** Display owner **rating** from existing data (`rating: number | null`). No UI to submit a review yet.

---

## 4. Out of scope (explicit)

- Backend / database
- Payment processing
- Real email verification
- Push notifications
- Native mobile app
- Multi-language support (unless curveball issued at submission)

---

## 5. Success criteria (how we know we're done)

- [ ] `npm install && npm run dev` works from a clean clone
- [ ] `npm run typecheck` passes — no `any`, no `@ts-ignore`
- [ ] Browse: search + 3 filters all work
- [ ] Detail: all edge cases handled (no photo, free, no rating, paused)
- [ ] Booking: 2 steps + confirmation; blocked when not logged in
- [ ] Auth: signup/login works; does not block browse
- [ ] Responsive on mobile; keyboard-navigable
- [ ] Deployed live URL in README
- [ ] `FOUNDER-RESPONSE.md`, `DECISION-LOG.md` (8+ entries), `AI-USAGE.md` (3+ entries) complete
- [ ] Loom recorded (≤ 5 min)

---

## 6. Summary for Thabo (draft — will polish in FOUNDER-RESPONSE.md)

> Thabo — I focused the sprint on the loop that proves the idea: **find a tool near you, inspect it, book it.** Search, filters, detail, booking, and login are in. I pushed back on the signup wall and the fake viewer countdown — both would hurt trust at launch. Messaging, maps, offline, and referrals are queued for the next sprint once we have real users and a backend. What you're getting is a small number of things done properly, not a long list of half-built features.
