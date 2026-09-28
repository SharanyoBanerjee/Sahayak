# Sahayak: Food Packaging Recommendation Engine

**Smart India Hackathon (SIH236) | Ministry of Food Processing Industries**  
**Team:** Cognix  

---

## 1. Overview

**Sahayak** is a deterministic, science-backed packaging recommendation engine built for **farmers, Farmer Producer Organisations (FPOs), startups, and MSME food processors**. Choosing packaging without expert consultation often causes rapid spoilage, moisture pickup, rancidity, or anaerobic fermentation.

Sahayak takes a commodity's physical, chemical, and biological properties alongside targeted logistics and shelf-life requirements, calculates exact barrier constraints, and matches them against certified packaging materials. Every output includes a plain-language explanation, numerical diagnostics, and authoritative literature citations (BIS, FAO, academic postharvest sources).

---

## 2. Core UI & The Contrasting Demo Presets

The interface follows a clean **Neo-Brutalist design system** (high-contrast cards, 3px ink outlines, flat vibrant fills, Plus Jakarta Sans & JetBrains Mono typography) with zero reliance on tech jargon:

1. **Preset 1: Fresh Tomato (Respiring Produce)**
   - Produce consumes oxygen and evolves carbon dioxide post-harvest.
   - The engine calculates the temperature-adjusted respiration rate $R_{\text{O}_2}(T)$ via the $Q_{10}$ coefficient and solves the Modified Atmosphere Packaging (MAP) steady-state gas balance.
   - **Hero Visual:** Displays the animated **"Breathing Pack"** diagram showing $\text{O}_2$ inflow and $\text{CO}_2$ venting to prevent anaerobic fermentation.
   - **Result:** Recommends **Breathable LDPE** or **Micro-Perforated Polypropylene** with tailored permeability.

2. **Preset 2: Crispy Biscuits (Dry & Lipid-Sensitive Snack)**
   - High risk of sogginess from moisture absorption and rancidity from lipid autoxidation.
   - The engine calculates Maximum Allowable $\text{WVTR}$ (Water Vapour Transmission Rate) from critical moisture limits and Maximum Allowable $\text{OTR}$ (Oxygen Transmission Rate) from fat concentration.
   - **Result:** Recommends **High-Barrier Metallised PET / LDPE** or **PET / Aluminium Foil / PE** laminates.

---

## 3. Mathematical & Engineering Formulations

### A. Fresh Respiring Produce (MAP Gas Equilibrium)

- **Temperature-Adjusted Respiration Rate ($Q_{10}$ Model):**
  $$R_{\text{O}_2}(T) = R_{\text{ref}} \times Q_{10}^{\frac{T - T_{\text{ref}}}{10}} \quad \left[\frac{\text{mL}}{\text{kg} \cdot \text{h}}\right]$$

- **Steady-State Target Oxygen Permeability ($\text{OTR}_{\text{target}}$):**
  At equilibrium, oxygen uptake equals oxygen permeation through the package area $A$:
  $$R_{\text{O}_2}(T) \times W_{\text{pack}} \times 24 = \text{OTR}_{\text{film}} \times A_{\text{pack}} \times (0.21 - y_{\text{O}_2})$$
  $$\text{OTR}_{\text{target}} = \frac{R_{\text{O}_2}(T) \times W_{\text{pack}} \times 24}{A_{\text{pack}} \times (0.21 - y_{\text{O}_2})} \quad \left[\frac{\text{mL}}{\text{m}^2 \cdot \text{day} \cdot \text{atm}}\right]$$

- **Carbon Dioxide Accumulation Check:**
  $$y_{\text{CO}_2} = \frac{RQ \times R_{\text{O}_2}(T) \times W_{\text{pack}} \times 24}{\text{CO2\_perm}_{\text{film}} \times A_{\text{pack}}} \times 100\%$$
  Rejects or flags materials where internal $\text{CO}_2$ exceeds the commodity's physiological tolerance threshold.

---

### B. Dry & Processed Packaged Foods (Barrier Limits)

- **Moisture Ingress Limit ($\text{WVTR}_{\text{max}}$):**
  $$\text{Allowed Water Gain } (G_w) = W_{\text{pack}} \times \left(\frac{M_{\text{critical}} - M_{\text{initial}}}{100}\right) \times 1000 \quad [\text{grams}]$$
  $$\text{WVTR}_{\text{max}} = \frac{G_w}{A_{\text{pack}} \times t_{\text{shelf\_life}}} \times \frac{1}{f_{\text{RH}}} \quad \left[\frac{\text{g}}{\text{m}^2 \cdot \text{day}}\right]$$

- **Lipid Oxidation Ingress Limit ($\text{OTR}_{\text{max}}$):**
  $$\text{OTR}_{\text{max}} = \frac{k}{\text{Fat}_{\%} \times t_{\text{shelf\_life}}^{0.4}} \quad \left[\frac{\text{mL}}{\text{m}^2 \cdot \text{day} \cdot \text{atm}}\right]$$

---

## 4. Architecture & Directory Structure

```
sahayak/
├── backend/
│   ├── config/              # Django settings, URLs, WSGI
│   ├── apps/
│   │   ├── catalog/         # Models: Commodity, Material, Rule, Source & Seeder
│   │   ├── engine/          # requirements.py, respiration.py, ranker.py, explain.py
│   │   └── api/             # Serializers, views, and recommendation endpoints
│   ├── tests/               # Pytest suite for API and mathematical engine
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/      # FoodForm, ResultCard, RequirementStrip, Illustrations, Header
│   │   ├── lib/             # API client, presets, types, useReveal hook
│   │   ├── App.tsx          # Main Neo-Brutalist application view
│   │   └── index.css        # Design tokens, keyframe animations, accessibility
│   ├── package.json
│   ├── vite.config.ts
│   └── Dockerfile
├── data/
│   └── seed/                # commodities.json, materials.json, rules.json, sources.json
├── Documents/               # PRD, Architecture, Design, Rules, Phases
├── docker-compose.yml
└── pytest.ini
```

---

## 5. Quick Start & Local Execution

### Prerequisites
- Python 3.12+ (or 3.13)
- Node.js 20+ & npm

### Running the Application

1. **Start the Backend:**
   ```bash
   # In the project root
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r backend/requirements.txt

   # Migrate and seed catalog
   python backend/manage.py migrate
   python backend/manage.py seed_catalog

   # Run test suite
   pytest -v

   # Start Django server
   python backend/manage.py runserver 127.0.0.1:8000
   ```

2. **Start the Frontend:**
   ```bash
   # In a separate terminal
   cd frontend
   npm install
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

3. **Or Run via Docker Compose:**
   ```bash
   docker compose up --build
   ```

---

## 6. API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health/` | Service health status |
| `GET` | `/api/commodities/` | Catalog of pre-configured food commodities |
| `GET` | `/api/materials/` | Certified barrier substrates and films |
| `POST` | `/api/recommend/` | Main recommendation endpoint |

### Example Recommendation Payload (`POST /api/recommend/`)
```json
{
  "commodity_name": "Fresh Tomato",
  "category": "produce",
  "is_respiring": true,
  "resp_o2": 15.0,
  "resp_co2": 18.0,
  "rq": 1.2,
  "q10": 2.1,
  "o2_target": 4.0,
  "co2_tolerance": 4.0,
  "temp_c": 12.0,
  "humidity_rh": 90.0,
  "shelf_life_days": 14,
  "pack_weight_kg": 0.5,
  "pack_area_m2": 0.08
}
```

---

## 7. Authoritative Sources & Standards

- **Bureau of Indian Standards (BIS):** IS 10171 – Guide on Packaging of Fresh Fruits and Vegetables.
- **Kader, A. A. (2002):** *Postharvest Technology of Horticultural Crops*, UC Davis.
- **Robertson, G. L. (2012):** *Food Packaging: Principles and Practice* (3rd ed.), CRC Press.
- **FAO (2014):** *Appropriate Food Packaging Solutions for Developing Countries*.
- **Indian Institute of Packaging (IIP):** *Handbook of Packaging Materials*.

---

## 8. License

Developed for the Smart India Hackathon.
