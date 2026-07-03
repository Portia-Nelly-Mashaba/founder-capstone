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

## Decision: (3)
