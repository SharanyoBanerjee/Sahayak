# Design: Sahayak

## 1. Feel
Clean, trustworthy, food-safe. Big readable numbers, warm accents, no clutter. One screen does the job.

## 2. Colors
| Role | Hex | Use |
|---|---|---|
| Primary green | `#1F8A4C` | Main buttons |
| Deep green | `#0F4D2A` | Headings |
| Accent orange | `#F2A65A` | Highlights |
| Info blue | `#356A96` | Links, data labels |
| Warning red | `#E24D3D` | Errors, poor fit |
| Background | `#F7F5EE` | Page |
| Surface | `#FFFFFF` | Cards |
| Text | `#1C2B22` | Body |
| Muted | `#5B6B62` | Secondary |

Light theme only for now. Contrast at WCAG AA.

## 3. Typography
- Headings: Poppins 600
- Body: Inter 400/500
- Specs and numbers: JetBrains Mono 500 (OTR, WVTR values line up)

| Style | Size |
|---|---|
| H1 | 32px |
| H2 | 24px |
| H3 | 18px |
| Body | 16px |
| Small | 14px |

## 4. Layout
Max width 1100px, 8px grid, cards with 12px radius and soft shadow. Mobile first: form is one column under 768px.

## 5. Screens (just two)
1. **Recommend.** Left: the form, grouped as Food, Storage, Shelf life. Respiration fields appear only for fresh produce. Two preset buttons: "Fresh tomato" and "Biscuits". Right: results.
2. **Results panel.** Top 3 material cards. Each shows material, thickness, required vs. offered OTR / WVTR / CO2, and a fit bar. "Why this?" opens the explanation.

## 6. Components
- **ResultCard:** name, structure, spec line, fit bar, data tag
- **RequirementStrip:** "Needs OTR under 5, WVTR under 2" shown above results, so the user sees what the engine derived
- **ExplainPanel:** one-sentence reason first, numbers and source collapsed below
- **DataTag:** "Sourced" or "Estimated" on every value
- **FitBar:** green above 70, orange 40 to 70, red below 40 (with a text label, never color alone)

## 7. Interaction
Inline validation in plain words. Skeleton loader for results. Empty state shows the closest options and the gap. Visible focus rings, full keyboard use.

## 8. Icons
Lucide, line style. No stock photos.
