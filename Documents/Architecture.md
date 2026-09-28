# Architecture: Sahayak

## 1. Stack
| Layer | Choice |
|---|---|
| Frontend | React + Vite + TypeScript + Tailwind |
| Backend | Python + Django REST Framework |
| Database | PostgreSQL |
| ML | scikit-learn (small, optional, see section 4) |
| Deploy | Docker Compose |

## 2. Request flow
```
FoodForm -> POST /api/recommend/
  -> serializer validates
  -> requirements.py: food props -> required barrier values
  -> if produce: respiration.py -> required O2/CO2 permeability
  -> filter materials that meet the requirements
  -> score and rank
  -> explain.py: attach rule + source to each result
  -> JSON -> ResultCards + ExplainPanel
```

## 3. The engine (this is the product)

### 3a. Dry / packaged foods: barrier limits
- **Moisture gain limit.** Max WVTR = allowed water gain (g) / (pack area m² x shelf life days). Allowed gain comes from the commodity's critical moisture level minus its starting moisture.
- **Oxidation limit.** Max OTR scales down with fat content and shelf life. High fat + long shelf life = low OTR = metallised or foil laminate.
- **Light and pH flags.** Low pH or light-sensitive foods add opaque-layer requirements.

### 3b. Fresh produce: respiration matching
Produce keeps consuming O2 and releasing CO2 inside the pack. Goal: hold O2 near a target (say 3 to 5%) without CO2 building past tolerance.

Steady state for O2:
```
R_O2(T) x W  =  OTR_film x A x (0.21 - y_O2)
```
- `R_O2(T)`: respiration rate at storage temperature, mL/kg·h
- `W`: produce weight (kg)
- `A`: film area (m²)
- `y_O2`: target O2 fraction inside the pack
- `OTR_film`: film O2 transmission, mL/m²·h·atm

So the **required OTR** is `R_O2(T) x W / (A x (0.21 - y_O2))`.

Adjust rate for temperature with Q10:
```
R(T) = R_ref x Q10 ** ((T - T_ref) / 10)
```
Then check CO2: `y_CO2 = RQ x R_O2 x W / (CO2_perm x A)`, where `RQ` is the respiratory quotient. Reject films where `y_CO2` exceeds the commodity's CO2 tolerance. Pick breathable or micro-perforated films whose permeability lands in the required range.

(I'm not sure Q10 stays constant across the whole range for every fruit. Treat it as an estimate and label it.)

### 3c. Ranking
Start with a plain weighted score: requirement fit first, then a cost tier and recyclable/biodegradable badge as tie-breakers. No model needed for the demo.

## 4. Where ML fits (honest version)
The rules produce the answer. ML is an optional later layer: a small scikit-learn model (e.g. gradient boosting) trained on expert-approved cases to re-rank close candidates. Ship rules first. If there's no expert-labelled data by the deadline, say "rules engine with scoring" and don't claim ML.

## 5. Data model
- `Commodity`: name, category, moisture, fat, pH, resp_o2, resp_co2, rq, q10, o2_target, co2_tolerance, critical_moisture, source_id
- `Material`: name, structure, thickness_range, otr, wvtr, co2_perm, seal_type, strength, breathable, recyclable, biodegradable, cost_tier, source_id, estimated
- `Rule`: name, condition, output, rationale, source_id
- `Source`: title, url, year

## 6. API
| Method | Path | Purpose |
|---|---|---|
| GET | `/api/commodities/` | Populate the dropdown |
| POST | `/api/recommend/` | Main call |
| GET | `/api/materials/` | Browse the data (optional) |
| GET | `/api/health/` | Health check |

## 7. Folder structure
```
sahayak/
  backend/
    manage.py
    config/
    apps/
      catalog/     # models + seed loader
      engine/      # requirements.py, respiration.py, ranker.py, explain.py
      api/         # serializers, views, urls
    tests/
  frontend/
    src/
      pages/       # Home, Recommend
      components/  # FoodForm, ResultCard, ExplainPanel
      lib/         # api client, types
  data/seed/       # commodities.csv, materials.csv, rules.json, sources.csv
  docs/            # PRD, Architecture, Rules, Phases, Design, Memory
  docker-compose.yml
```

## 8. Errors and fallback
- Bad input: 400 with field messages
- No film fits: return closest options plus the gap ("needs OTR under 5, best is 12")
- Missing commodity data: ask the user, don't guess
- Rules engine works without any ML
