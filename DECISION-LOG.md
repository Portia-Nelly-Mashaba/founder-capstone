# Decision Log

At least 8 real entries. Generic entries score nothing. Use this shape:

## Decision: [what you decided]
- Context:
- Options I considered:
- What I chose and why:
- What I gave up:

---

## Decision: Gate booking behind auth, not browsing
- Context: Thabo asked to force signup before users can see anything ("growth hack"). The minimum bar requires an auth screen. We need to decide where auth sits in the user journey.
- Options I considered: (1) Full auth wall — no content until signup, as Thabo requested. (2) Auth only at booking — browse and search are open; login required when tapping Book now. (3) Optional auth throughout — login available but never required (fails the auth screen requirement).
- What I chose and why: Option 2. A marketplace with thin inventory dies if users can't see what's available. We still capture identity at the moment it matters — when someone commits to a booking. This matches how Airbnb, Turo, and similar platforms actually work.
- What I gave up: Early email capture from curious visitors who never intend to book. Thabo's "force it" growth hack is deferred in favour of conversion on real intent.

---

## Decision: CSS modules + design tokens over Tailwind
- Context: Need a styling approach before building UI. The design score rewards a distinctive identity, not a generic template look.
- Options I considered: (1) Tailwind utility classes — fast to build, risk of generic "startup template" aesthetic. (2) CSS modules with custom properties in a tokens file — more setup, but full control over a BorrowBlock-specific palette and typography. (3) Plain global CSS — simple but scales poorly across components.
- What I chose and why: CSS modules + `tokens.css`. Fraunces + DM Sans and an earthy green palette are harder to accidentally copy from a component library. Scoped module classes keep styles co-located with components as the app grows.
- What I gave up: Tailwind's speed for rapid layout iteration. Acceptable tradeoff for a small app where visual identity is 25% of the mark.

---

## Decision: Three-step booking flow with in-page state
- Context: Minimum bar requires a booking flow of at least two steps ending in confirmation. Users pick dates, review, and need a clear success state.
- Options I considered: (1) Separate routes per step (`/book/:id/dates`, `/review`) — shareable URLs, more router boilerplate. (2) Single page with step state — simpler, keeps draft data in memory without serialising to URL. (3) Modal overlay on item detail — fewer pages, but cramped on mobile and harder to keyboard-navigate.
- What I chose and why: Single `/book/:id` route with `dates → review → confirmation` steps and a progress indicator. The `BookingDraft` shape from `types.ts` maps directly to the review step. Confirmation gets a mock reference ID — enough for a founder demo without a backend.
- What I gave up: Deep-linkable mid-booking URLs and browser back-button step history (back is explicit via buttons).

---

## Decision: Mock auth in localStorage, redirect back to booking
- Context: Booking must be gated behind login per our scope pushback. No backend exists for real sessions.
- Options I considered: (1) Hard-coded "logged in" toggle for demo — fast but doesn't prove the auth screen works. (2) localStorage session with email + name — persists across refresh, testable auth screen. (3) sessionStorage only — lost on tab close, annoying for demo walkthroughs.
- What I chose and why: `AuthContext` with localStorage. `/book/:id` redirects to `/auth?redirect=...` when unauthenticated; after sign-in, user returns to the booking they started. Header shows first name + sign out.
- What I gave up: Real password validation, email verification, and security. Acceptable for a frontend-only sprint — the types and redirect pattern are ready for a real auth API.

---
- Context: Browse needs search and filters with only mock data and no backend this sprint.
- Options I considered: (1) Client-side filter on the fetched array — simple, instant feedback, easy to swap for server params later. (2) Fake API query function that accepts filter params and filters inside `fetchItems` — closer to real API shape but more indirection for the same result. (3) URL search params as source of truth — shareable filter state, more routing complexity than needed for v1.
- What I chose and why: Client-side filtering in a pure `filterItems()` utility with filter state in `BrowsePage`. The function is typed, testable, and mirrors what a future `GET /items?category=&maxDistance=` would do — only the call site changes when a backend arrives.
- What I gave up: Shareable filtered URLs and server-side pagination. Fine for ~dozens of neighbourhood listings in a prototype.

---
