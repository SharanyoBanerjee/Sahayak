# Phases: Sahayak Build Plan

Finish and test each phase before the next. The goal is the two-case demo, working end to end, as early as possible.

## Phase 0: Setup
Repo, Docker Compose, Django + React skeletons, `/api/health/`.
**Done when:** `docker compose up` runs both apps.

## Phase 1: Data foundation
- Models: Commodity, Material, Rule, Source
- Seed 10 to 15 commodities (include 4 to 5 respiring produce items and 4 to 5 dry products)
- Seed the 8 material types with barrier values, each sourced or marked `estimated`
**Done when:** seed loads and every row has a source or flag.

## Phase 2: Barrier engine (dry foods)
- Max WVTR from moisture limit, max OTR from fat and shelf life
- Filter and rank materials
- Unit tests
**Done when:** a dry biscuit-type input returns a high-barrier laminate with reasons.

## Phase 3: Respiration engine (produce)
- Q10 temperature adjustment
- Steady-state O2 solver and CO2 check
- Match breathable / micro-perforated films
**Done when:** a tomato-type input returns a breathable film with matched permeability, tested against a hand calculation.

## Phase 4: API and explanations
- `POST /api/recommend/` with validation
- Explanation payload per result (rule, numbers, source)
**Done when:** one request returns top 3 materials with specs and reasons for both demo cases.

## Phase 5: Frontend
- FoodForm with all inputs (produce fields show only for fresh items)
- ResultCards and ExplainPanel
- Loading, empty and error states
**Done when:** someone else runs both demos without help.

## Phase 5b: Minimal Vintage UI pass
- Apply tokens and fonts from `Design.md`, restyle every component
- Line-art SVGs: commodity plates, gas exchange schematic, film cross-section, empty state
- Loading: progress rule, step list, hairline placeholders (500ms minimum)
- Scroll: fade-rise reveal, fit bar fill, count-up, sticky requirement tiles
- Hard-limit ranking: failing materials shown under "Did not meet requirements"
**Done when:** both reference cases render cleanly with no overlapping labels, and reduced-motion mode works.

## Phase 6: Demo polish
- Preset buttons for the two demo cases
- Side-by-side moment: same app, produce vs. dry product
- README, hosted link, demo script
**Done when:** the demo runs cleanly twice in a row.

## Phase 7: Only if time allows
Cost and sustainability badges, small ML re-ranker, compare view, PDF spec sheet.