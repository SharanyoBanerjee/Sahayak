# PRD: Sahayak, Food Packaging Recommender

**Problem statement:** SIH26236, Ministry of Food Processing Industries
**Team:** Cognix

## 1. What we're building
A web app that takes a food's properties and storage conditions, then recommends packaging materials with specs and a plain-language reason. It handles respiring fresh produce correctly: oxygen and CO2 transmission of the film get matched to what the commodity consumes and produces.

## 2. Problem
Picking packaging takes expert knowledge. Small producers and farmers guess, and wrong guesses mean moisture gain, oxidation, spoilage and short shelf life.

## 3. Target users
- **MSME food processors** who can't pay for packaging consultants
- **Farmers and FPOs** packing fresh produce for transport
- **Startups** choosing a first pack

## 4. The smallest thing that wins
One demo, two contrasting inputs:

1. **Respiring produce** (e.g. tomato) with a target shelf life and storage condition. The system recommends a **breathable film** with the right O2/CO2 permeability, gives specs, and explains why.
2. **Moisture-sensitive dry product** (e.g. biscuits or chips). The system recommends a **high-barrier laminate** and explains why.

If these two work, correctly and with visible reasoning, the MVP is done. Everything else waits.

## 5. Inputs (exactly these)
| Input | Notes |
|---|---|
| Commodity type | Dropdown. Prefills defaults for the fields below |
| Moisture content (%) | |
| Oil / fat content (%) | Drives oxidation risk |
| pH | |
| Respiration rate | O2 uptake and CO2 output, mL/kg·h. Only for fresh produce |
| Desired shelf life (days) | |
| Storage temperature (°C) | |
| Storage humidity (% RH) | |
| Transport conditions | Ambient / cold chain / long haul |
| Storage type | Ambient / chilled / frozen |

## 6. Outputs
For each recommended material (top 3):
- Material and structure (e.g. "PET/metallised PET/PE laminate")
- Suggested thickness range
- Required vs. offered OTR, WVTR, CO2 permeability
- Sealability and mechanical strength notes
- **Why:** the rules that fired, in plain words, with a source
- Data label: "Sourced" or "Estimated"

## 7. Materials in scope
LDPE, HDPE, PP, PET, metallised films, foil laminates, biodegradable films (e.g. PLA), breathable / micro-perforated films.

## 8. Core features (MVP only)
1. Input form (section 5)
2. Barrier requirement calculator: max OTR, max WVTR, or target O2/CO2 permeability
3. Respiration-aware MAP matching for produce
4. Material filter and ranking against the requirements
5. Explanation panel per result

## 9. Cut from MVP (deliberately)
Cost and sustainability scoring beyond a simple badge, compare view, PDF export, regional languages, supplier integration, expert review queue. The deck lists these as differentiators, so show one line for them, but don't build them until the core demo is solid.

## 10. Success criteria
- Both demo cases give correct, defensible results
- Every result has a reason and a source
- Wrong-answer check: 10 foods tested, output matches an expert's pick for at least 8
- Result in under 2 seconds

## 11. Risks
- **Thin or wrong material data.** Bad data breaks everything. Cite every row.
- **Skipping respiration.** It's the hardest and most impressive case. Don't fake it.
- **Overselling AI.** It's a rules engine with a light scoring layer. Say that.

## 12. Open questions
- Which 10 to 15 commodities do we ship with?
- Where do we source barrier values (datasheets, papers, BIS)?
- Who checks the outputs before the demo?
