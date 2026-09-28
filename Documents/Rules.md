# Rules: AI Coding Boundaries

Read this before writing any code.

## 1. Stack (fixed)
Python 3.12, Django, DRF, PostgreSQL. React, Vite, TypeScript, Tailwind. Docker Compose.

## 2. Libraries
**Use:** `djangorestframework`, `django-cors-headers`, `psycopg`, `pytest`, `pytest-django`, `react-router`, `zod`. `scikit-learn` only in the optional ML step.

**Avoid:** PyTorch, TensorFlow, LLM calls inside the engine, Redux, extra UI kits, any new dependency without asking.

## 3. Code style
- Simplest code that works. Lean over clever.
- Short, plain names: `otr_needed`, `film`, `score`.
- One job per function, under 30 lines.
- Python: type hints, docstring on public functions.
- TypeScript: strict, no `any`.
- No dead code or commented-out blocks.

## 4. Engine correctness (most important)
- Deterministic: same input, same output.
- Every rule and every material row has a `source_id`. No source, no rule.
- Never invent property values. Missing means null and flagged. Guesses are marked `estimated`.
- Keep units explicit in names and comments (`otr_ml_m2_h_atm`).
- Respiration math lives only in `engine/respiration.py`, with unit tests.
- The two demo cases (tomato-type produce, dry biscuit-type product) must always pass as tests.

## 5. Errors
- Validate at the serializer.
- Clear messages a non-expert understands.
- Log exceptions, never swallow them. No stack traces in responses.

## 6. AI should
- Ask before changing the data model or adding a dependency
- Write a test with every rule and engine function
- Update `Memory.md` after each finished task
- Make small commits, one concern each

## 7. AI shouldn't
- Call rule-based output "AI" or "ML" in code, UI or docs
- Build anything in PRD section 9 (cut list)
- Touch files outside the current phase
- Hardcode secrets (use `.env`)
- Ship a result without its explanation

## 8. Git
Branch per phase (`phase-2-engine`). Commit format: `type: message` (feat, fix, test, docs, refactor).
