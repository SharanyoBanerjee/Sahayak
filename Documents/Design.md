# Design: Sahayak (Neo-Brutalist)

## 1. Direction
Card-based neo-brutalism. Thick black outlines, hard offset shadows (zero blur), flat loud colors on a cream page, big bold type. Every block is a card. Every card has a job.

The vibe: a food label crossed with a sticker sheet. Friendly and loud, but the numbers stay readable. Users are farmers and small processors, so illustration does more work than jargon.

## 2. Tokens
```css
:root {
  --ink: #111111;
  --paper: #FFF8E7;      /* page */
  --card: #FFFFFF;
  --green: #3DDC84;      /* good fit, primary action */
  --tomato: #FF5A4E;     /* poor fit, warnings */
  --sun: #FFD23F;        /* highlights, medium fit */
  --sky: #6EC5FF;        /* info, data labels */
  --lilac: #C7A6FF;      /* badges */
  --border: 3px solid var(--ink);
  --shadow: 6px 6px 0 var(--ink);
  --shadow-hover: 9px 9px 0 var(--ink);
  --radius: 14px;
}
```
Rules: no gradients, no blur shadows, no opacity tricks on borders. Text is always `--ink` on light fills (contrast passes AA).

## 3. Typography
Load **Plus Jakarta Sans** (400, 600, 800) and **JetBrains Mono** (500) from Google Fonts. Fallbacks: `system-ui, sans-serif` and `ui-monospace, monospace`.

| Use | Font | Size / weight |
|---|---|---|
| Hero and H1 | Plus Jakarta Sans | 44px / 800, tight leading |
| H2 | Plus Jakarta Sans | 28px / 800 |
| Card title | Plus Jakarta Sans | 20px / 800 |
| Body | Plus Jakarta Sans | 16px / 500 |
| Labels | Plus Jakarta Sans | 13px / 800, uppercase, +0.04em tracking |
| Numbers and specs | JetBrains Mono | 500, big (28px+) for key values |

## 4. Core components
```css
.card {
  background: var(--card);
  border: var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  transition: transform .12s, box-shadow .12s;
}
.card:hover { transform: translate(-3px, -3px); box-shadow: var(--shadow-hover); }
.btn:active { transform: translate(6px, 6px); box-shadow: 0 0 0 var(--ink); }
```
- **Button:** `--green` fill, ink border, hard shadow. Pressing it "sinks" into the page.
- **Input:** white, 3px ink border, square-ish (8px radius). Focus: `--sun` background plus a 4px ink outline.
- **Badge:** pill, 2px border, flat color. Icon plus text, never color alone.
- **Toggle (Dry / Fresh):** two chunky segments, active one is `--green` with a shadow.
- **FitBar:** thick (16px) ink-bordered track. Fill: green above 70, sun 40 to 70, tomato below 40. Label sits on the bar ("55.6% FIT").
- **RequirementStrip:** four number tiles, each a different flat color (green, sun, sky, lilac), mono numbers at 32px.
- **ResultCard:** rank sticker (#1 in a rotated circle, -6deg), material name, illustration of the structure, spec grid, FitBar, "Why this?" button.

## 5. Illustration
Flat SVG, 3px ink outlines, 2 to 3 fill colors per drawing, slightly wobbly is fine. Draw inline so they can animate. Keep each under ~2 KB.

1. **Commodity icons.** Tomato, biscuit, chips bag, mango, spinach. Shown in the dropdown and as a big sticker beside the form. Swaps when the commodity changes.
2. **"Breathing pack" diagram** (the hero visual). A pack with the produce inside. O2 arrows drift in, CO2 arrows drift out. Arrow count and speed follow the derived OTR, so a tight barrier film looks visibly different from a breathable one. This is the demo's best moment.
3. **Film layer stack.** Each result card shows the structure as stacked colored strips (e.g. PET / metallised layer / PE seal), labelled.
4. **Empty and error states.** A sad open box for "no film fits", a magnifier over a box for empty results.
5. **Mascot (optional).** A small smiling box character in the header. Skip it if time is short.

## 6. Loading animations
Never show a blank panel. On submit:

1. **Engine stepper card.** Four steps tick in one after another, each with a checkmark that pops (scale 0 to 1.2 to 1):
   - Reading your food
   - Working out barrier targets
   - Matching 8 materials
   - Writing the reasons
2. **Skeleton result cards.** Same card shape, `--sun` and white diagonal stripes sliding (`background-position` animation, 1s linear loop). Hard shadow stays.
3. **Bouncing box** in the corner while waiting (3-frame CSS translateY).
4. Results arrive with the entrance animation from section 7.

Minimum display time is 600ms so the stepper is readable even when the API answers instantly. (The engine is fast, so without this the animation flashes past.)

## 7. Scroll and entrance animations
Use CSS plus one small `IntersectionObserver` hook. No animation library.

- **Reveal on scroll.** Cards start at `opacity: 0; transform: translateY(32px) rotate(-1deg)`, then snap to rest with a slight overshoot (`cubic-bezier(.2, 1.4, .4, 1)`, 450ms). Stagger siblings by 80ms.
- **FitBar fill.** Width animates from 0 to its value when the card scrolls into view.
- **Number count-up.** Barrier targets count up over 700ms when visible.
- **Sticky RequirementStrip.** Sticks under the header while the user scrolls through results, so the targets stay visible next to each material.
- **Section headers.** Slide in from the left with a highlighter bar (`--sun`) that wipes across behind the text.
- **Parallax stickers.** Two or three decorative stickers (star, wheat, circle) drift at different speeds using `transform` only.

```ts
// useReveal.ts
import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.classList.add("in");
        io.disconnect();
      }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
```
```css
.reveal { opacity: 0; transform: translateY(32px) rotate(-1deg); }
.reveal.in { opacity: 1; transform: none;
  transition: all .45s cubic-bezier(.2, 1.4, .4, 1); }
@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal.in { transition: none; opacity: 1; transform: none; }
  * { animation: none !important; }
}
```
Animate only `transform` and `opacity` (cheap on phones).

## 8. Layout
- Max width 1200px, 12-column grid, 24px gaps.
- Header: full-width ink-bordered bar, logo sticker left, status pill right.
- Desktop: form card on the left (sticky), results on the right. Under 900px it stacks and the strip becomes horizontal scroll.
- Presets ("Fresh tomato", "Biscuits") sit as big sticker buttons above the form.
- Cards may tilt 0.5 to 1deg for personality, but never inputs or tables.

## 9. Copy and trust
- Drop the "BIS & FAO Standard Compliant" badge. Nothing in the engine is certified, and a judge who asks will find that out. Use "Every value linked to a source" instead, which is true and checkable.
- Replace "Thermodynamic & Biological Equilibrium" with "Gas balance for respiring produce".
- Keep every "Sourced" and "Estimated" tag. They're the honest part.

## 10. Accessibility
- Ink on light fills only, contrast above 4.5:1
- Focus ring: 4px ink outline, always visible
- Motion off when `prefers-reduced-motion` is set
- Color is never the only signal (labels on FitBar and badges)
- Illustrations get `aria-hidden` unless they carry data, and the breathing-pack diagram has a text summary beside it