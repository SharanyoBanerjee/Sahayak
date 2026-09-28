# Design: Sahayak (Minimal Vintage, Monochrome)

## 1. Direction
A technical datasheet, not a toy. Warm paper, one ink color, hairline rules, serif headings, engraving-style line drawings. Think old laboratory handbook or a well-set standards document, rebuilt as a dashboard.

Users are packaging and QA people at companies. Numbers, units and sources come first. Decoration never competes with them.

Three rules:
1. **One hue.** Everything is a tint or shade of warm ink on paper.
2. **Quiet.** Hairline borders, no loud fills, no tilt, no stickers.
3. **Precise.** Aligned grids, tabular numerals, units on every number.

## 2. Tokens
```css
:root {
  /* one hue (warm sepia ink), stepped by lightness */
  --paper:   #F3EEE4;   /* page */
  --card:    #FAF7F0;   /* cards */
  --wash:    #E9E2D3;   /* subtle fills, table stripes */
  --rule:    #CFC5B3;   /* hairlines */
  --mute:    #857A6A;   /* secondary text */
  --ink-2:   #4A4036;   /* body text */
  --ink:     #241E18;   /* headings, primary buttons */

  --radius: 4px;
  --hair: 1px solid var(--rule);
  --frame: 1px solid var(--ink);
  --lift: 0 1px 0 var(--rule), 0 8px 20px -14px rgba(36, 30, 24, .35);
}
```
No second hue anywhere, including status. Status uses shape and label (section 5). Text on paper or card always uses `--ink-2` or `--ink` (contrast above 7:1).

## 3. Typography
| Use | Font | Spec |
|---|---|---|
| Page title, card titles | **Newsreader** (serif) | 500, 28 / 20px, slight negative tracking |
| UI and body | **Plus Jakarta Sans** | 400 / 500, 15px |
| Labels | Plus Jakarta Sans | 600, 11px, uppercase, +0.08em tracking |
| Numbers, units, specs | **IBM Plex Mono** | 500, tabular figures |

Fallbacks: `Georgia, serif`, `system-ui, sans-serif`, `ui-monospace, monospace`.

Big derived numbers (barrier targets) are 30px mono with the unit in 12px `--mute` beneath. Figure and table captions are set in small caps: "Fig. 1  Gas exchange, respiring produce".

## 4. Cards
```css
.card {
  background: var(--card);
  border: var(--hair);
  border-radius: var(--radius);
  box-shadow: var(--lift);
  padding: 24px;
}
.card--framed { border: var(--frame); outline: 1px solid var(--rule); outline-offset: 3px; } /* vintage double rule */
.card__label { font: 600 11px/1 var(--sans); letter-spacing: .08em; text-transform: uppercase; color: var(--mute); }
```
- Section header inside a card: label on the left, a hairline running to the right edge, small "Fig." or "Table" tag on the right.
- Use the double-rule frame only on the main result card and the hero diagram. Everything else is a plain hairline card.
- Hover on interactive cards: border goes `--ink`, no movement.

## 5. Components
- **Button (primary):** `--ink` fill, `--paper` text, 4px radius, no shadow. Hover: `--ink-2`. Secondary: transparent, 1px ink border.
- **Input:** `--card` fill, hairline border, mono value, small unit suffix inside on the right. Focus: 1px ink border plus 2px outline in `--rule`.
- **Segmented control (Dry / Fresh):** two cells sharing one frame, active cell is ink-filled.
- **Requirement tiles:** four cards in a row: label, big mono number, unit. All the same tone, separated by hairlines, like a spec table.
- **Fit indicator (no color):**
  - Bar: 8px track (`--wash`), fill is solid `--ink` for pass.
  - **Pass:** solid fill, check icon, text "Meets targets"
  - **Marginal:** fill with diagonal hatching, text "Partial fit"
  - **Fail:** empty track with a cross icon, text "Fails CO₂ limit"
  - The percentage always appears as text beside the bar.
- **Badge:** 1px border, transparent, 11px uppercase label. "SOURCED" solid ink, "ESTIMATED" outlined.
- **Data table:** hairline rows, zebra with `--wash`, mono numerals right-aligned, units in the header.
- **Rank marker:** small "No. 1" in serif italic, no circle, no rotation.

### Ranking rule (design and engine agree)
Materials that violate a hard limit (CO₂ tolerance, max OTR, max WVTR) never rank above ones that meet it. Failing materials appear below a divider labelled "Did not meet requirements", each with its reason.

## 6. Illustration
Engraving and technical-plate style. **Single-weight line, 1.25px, ink stroke, no fills** except hatching and stipple for shade. All drawn as inline SVG so strokes can animate.

1. **Commodity plates.** A fine line drawing per commodity (tomato, biscuit, chips pouch, mango, leafy greens) with a hatched shadow. Shown small beside the dropdown, with a tiny caption ("Solanum lycopersicum" for the tomato, if you want the botanical touch).
2. **Gas exchange schematic** (hero figure). A cross-section of a pack: produce drawn as a line plate inside, dimension lines with arrows, labelled O₂ in and CO₂ out. Arrow count and length follow the derived OTR. Captioned "Fig. 1". Labels sit outside the drawing on leader lines, so nothing overlaps the artwork.
3. **Film cross-section.** Each result shows its structure as stacked hatched layers with labels on leader lines (e.g. PET 12 µm, metallised layer, PE seal 40 µm), drawn to relative thickness.
4. **Empty and error states.** A single line drawing of an open carton with a caption. No characters.

No mascots, faces, stickers or decorative shapes.

## 7. Motion (restrained)
Motion explains state changes. It never entertains.

**Loading**
- On submit, a thin progress rule runs across the top of the results card.
- A step list under it lights up in order with a hairline tick: "Reading inputs", "Deriving barrier targets", "Screening 8 materials", "Composing rationale". Minimum total 500ms so it's readable.
- Placeholder cards are hairline outlines with `--wash` bars that fade between 60% and 100% opacity (1.2s ease-in-out, looping).
- The gas schematic draws itself on load using `stroke-dashoffset` (700ms).

**Scroll and entrance** (CSS plus one `IntersectionObserver` hook, no library)
- Cards fade in and rise 10px, 300ms `ease-out`, staggered 60ms.
- Fit bars fill from 0 when visible (500ms).
- Requirement numbers count up over 500ms when visible.
- Requirement tiles stay sticky under the header on scroll, so targets remain visible beside each material.
- Section rules draw left to right as their section enters.

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
.reveal { opacity: 0; transform: translateY(10px); }
.reveal.in { opacity: 1; transform: none; transition: opacity .3s ease-out, transform .3s ease-out; }
@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal.in { opacity: 1; transform: none; transition: none; }
  * { animation: none !important; }
}
```
Animate only `transform`, `opacity` and SVG stroke properties.

## 8. Layout
- Max width 1240px, 12-column grid, 24px gutters, 8px spacing unit.
- Header: paper background, serif wordmark, a 1px ink rule beneath. Right side: source-linking note and engine status as plain text with a small dot (filled = ready).
- Two columns on desktop: inputs on the left (sticky), results on the right. Under 960px they stack.
- Reference cases ("Fresh tomato", "Crisp biscuits") are two quiet text buttons in a slim bar above the form, not big banners.
- Numbered sections in the form ("1. Commodity", "2. Composition") in small caps.

## 9. Copy
Professional and plain. No exclamation marks, no cutesy microcopy.
- "Contrasting demo cases" becomes "Reference cases"
- "Breathing Pack" becomes "Gas exchange schematic"
- Keep "Every value linked to a source" and the SOURCED / ESTIMATED tags. Don't add compliance or certification claims the data can't back.
- Every number shows its unit. Every result shows why it passed or failed.

## 10. Accessibility
- Contrast at least 7:1 for text, 4.5:1 for UI lines that carry meaning
- Status never depends on color: icon, hatch pattern and text label together
- 2px focus outline always visible
- Motion off under `prefers-reduced-motion`
- Illustrations are `aria-hidden` unless they carry data. The gas schematic has a text summary next to it.
- Print stylesheet: paper background off, ink on white, so a recommendation can be exported to PDF as a clean spec sheet later.

## 11. Fixes from the last prototype
Your latest screenshot has issues to fix in the new build:
- The "3–5% O₂ MAP zone" label overlaps the pack outline, and the "8.29 mL/kg·h" text overflows the tomato. Put labels outside the drawing on leader lines.
- The header title badge ("SIH236…") is clipped by the browser tooltip and the layout. Give it room or drop it.
- Inflow and outflow arrows don't line up with the pack edges. Anchor them to the pack's left and right walls.