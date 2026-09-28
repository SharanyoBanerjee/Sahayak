# Sahayak: Food Packaging Recommendation Engine

**Smart India Hackathon (SIH26236) | Ministry of Food Processing Industries**  
**Team:** Cognix  

---

## 1. Overview

**Sahayak** is a scientific packaging recommendation engine designed for **MSME food processors, farmers, Farmer Producer Organisations (FPOs), and agri-startups**. Choosing optimal packaging for food products requires deep domain expertise; arbitrary choices often lead to moisture gain, lipid autoxidation, anaerobic fermentation, or premature spoilage.

Sahayak takes a commodity's physical, chemical, and biological properties alongside targeted logistics/storage conditions, mathematically calculates barrier constraints, and matches them against certified packaging materials. Every recommendation is backed by a plain-language engineering rationale, mathematical diagnostics, and authoritative citations (BIS, FAO, academic literature).

---

## 2. Key Capabilities & The Two Contrasting Demo Cases

Sahayak is built to demonstrate two fundamental contrasting packaging paradigms:

1. **Respiring Fresh Produce (e.g., Fresh Tomatoes / Button Mushrooms):**
   - Produce consumes oxygen and evolves carbon dioxide post-harvest.
   - Calculates temperature-dependent respiration rates using the $Q_{10}$ temperature coefficient.
   - Solves the steady-state equilibrium for Modified Atmosphere Packaging (MAP) to sustain target oxygen levels ($3\text{--}5\%\, \text{O}_2$) and prevent toxic $\text{CO}_2$ buildup.
   - **Result:** Recommends **breathable or micro-perforated films** (e.g., Breathable LDPE or Micro-perforated BOPP) with matched gas permeability.

2. **Moisture-Sensitive, Lipid-Rich Dry Products (e.g., Crispy Biscuits / Potato Chips):**
   - High risk of crispness loss from water vapour ingress and oxidative rancidity from oxygen exposure.
   - Calculates Maximum Allowable Water Vapour Transmission Rate ($\text{WVTR}_{\text{max}}$) from critical moisture limits and target shelf-life.
   - Calculates Maximum Allowable Oxygen Transmission Rate ($\text{OTR}_{\text{max}}$) based on lipid content.
   - **Result:** Recommends **high-barrier laminates** (e.g., Metallised PET / LDPE or PET / Aluminium Foil / PE).

---

## 3. Mathematical & Engineering Foundations

### A. Dry & Shelf-Stable Foods (Barrier Requirements)

- **Moisture Permeation Limit ($\text{WVTR}_{\text{max}}$):**
  $$\text{Allowed Water Gain } (G_w) = W_{\text{pack}} \times \left(\frac{M_{\text{critical}} - M_{\text{initial}}}{100}\right) \times 1000 \quad [\text{grams}]$$
  $$\text{WVTR}_{\text{max}} = \frac{G_w}{A_{\text{pack}} \times t_{\text{shelf\_life}}} \times \frac{1}{f_{\text{RH}}} \quad \left[\frac{\text{g}}{\text{m}^2 \cdot \text{day}}\right]$$

- **Oxidation Permeation Limit ($\text{OTR}_{\text{max}}$):**
  For lipid-rich foods ($\text{Fat} \ge 10\%$), the maximum permissible oxygen ingress scales inversely with fat concentration and target storage duration:
  $$\text{OTR}_{\text{max}} = \frac{k}{\text{Fat}_{\%} \times t_{\text{shelf\_life}}^{0.4}} \quad \left[\frac{\text{mL}}{\text{m}^2 \cdot \text{day} \cdot \text{atm}}\right]$$

### B. Fresh Produce (Modified Atmosphere Respiration Solver)

- **Temperature-Adjusted Respiration Rate ($Q_{10}$ relation):**
  $$R_{\text{O}_2}(T) = R_{\text{ref}} \times Q_{10}^{\frac{T - T_{\text{ref}}}{10}} \quad \left[\frac{\text{mL}}{\text{kg} \cdot \text{h}}\right]$$

- **Equilibrium Steady-State Oxygen Permeability ($\text{OTR}_{\text{target}}$):**
  At equilibrium, oxygen consumption rate by produce matches oxygen permeation through the package:
  $$R_{\text{O}_2}(T) \times W_{\text{pack}} \times 24 = \text{OTR}_{\text{film}} \times A_{\text{pack}} \times (0.21 - y_{\text{O}_2})$$
  $$\text{OTR}_{\text{target}} = \frac{R_{\text{O}_2}(T) \times W_{\text{pack}} \times 24}{A_{\text{pack}} \times (0.21 - y_{\text{O}_2})} \quad \left[\frac{\text{mL}}{\text{m}^2 \cdot \text{day} \cdot \text{atm}}\right]$$

- **Carbon Dioxide Accumulation Check:**
  $$y_{\text{CO}_2} = \frac{RQ \times R_{\text{O}_2}(T) \times W_{\text{pack}} \times 24}{\text{CO2\_perm}_{\text{film}} \times A_{\text{pack}}} \times 100\%$$
  If $y_{\text{CO}_2} > \text{CO2}_{\text{tolerance}}$, the system rejects impermeable materials or flags an accumulation risk.

---

## 4. Architecture & Technology Stack

```
[ User / Web Browser ]
         │
         ▼
[ React + Vite + TypeScript Frontend (Port 3000) ]
  • Clean accessible UI (Tailwind CSS, Inter / Poppins / JetBrains Mono)
  • One-click demo presets ("Fresh Tomato" & "Crispy Biscuits")
  • Live barrier requirement diagnostics strip
  • Expandable explanation panels with BIS / FAO citations
         │ (REST API / JSON)
         ▼
[ Django REST Framework Backend (Port 8000) ]
  ├── apps/catalog/     ── Models & seed loader (Commodities, Materials, Rules, Sources)
  ├── apps/engine/      ── requirements.py, respiration.py, ranker.py, explain.py
  └── apps/api/         ── Serializers, views, and validation endpoints
         │
         ▼
[ PostgreSQL / SQLite Database ]
  • Pre-seeded with 10 real commodities and 8 standardized packaging materials
```

---

## 5. Getting Started

### Option A: Local Development (Quick Start)

#### 1. Backend Setup
```bash
# Clone the repository
git clone https://github.com/SharanyoBanerjee/Sahayak.git
cd Sahayak

# Create virtual environment and install dependencies
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt

# Run migrations and seed data catalog
python backend/manage.py migrate
python backend/manage.py seed_catalog

# Run test suite
pytest -v

# Start backend server
python backend/manage.py runserver 0.0.0.0:8000
```

#### 2. Frontend Setup
```bash
# In a new terminal window
cd frontend
npm install
npm run dev
```
Open your browser at `http://localhost:3000`.

---

### Option B: Docker Compose

```bash
docker compose up --build
```
- Frontend UI: `http://localhost:3000`
- Backend API: `http://localhost:8000/api/health/`

---

## 6. API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health/` | Service health status check |
| `GET` | `/api/commodities/` | Catalog of pre-configured food commodities |
| `GET` | `/api/materials/` | Packaging substrate and barrier material catalog |
| `POST` | `/api/recommend/` | Computes barrier limits, scores materials, and generates explanations |

### Sample Recommendation Request (`POST /api/recommend/`)
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

## 7. Quality Standards & Citations

1. **Bureau of Indian Standards (BIS):** IS 10171 - Guide on Packaging of Fresh Fruits and Vegetables.
2. **Kader, A. A. (2002):** *Postharvest Technology of Horticultural Crops*, University of California Agriculture & Natural Resources.
3. **Robertson, G. L. (2012):** *Food Packaging: Principles and Practice*, 3rd Edition, CRC Press.
4. **Food and Agriculture Organization (FAO, 2014):** *Appropriate Food Packaging Solutions for Developing Countries*.
5. **Indian Institute of Packaging (IIP):** *Handbook of Packaging Materials*.

---

## 8. License

Developed for the Smart India Hackathon 2026.
