# 🏛️ Curriculum City

A conceptual exploration tool for curriculum studies — helping educators and researchers understand curriculum-making through two complementary lenses.

![Next.js](https://img.shields.io/badge/Next.js-15.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

---

## 📖 What is Curriculum City?

Curriculum City is a **sense-making and learning tool** (not a diagnostic system) that helps users explore:

1. **Conceptual Chain** — Educational philosophies, curriculum conceptions, and design types
2. **Actor System** — Who makes curriculum and how they interact across system levels

### Key Principles

- **Non-linear relationships** — Philosophy ↔ Conception ↔ Design types interact bidirectionally
- **Negotiated curriculum** — Curriculum emerges through actor interaction, not top-down implementation
- **Hybridization** — Real practice often blends multiple approaches
- **No fixed ideologies** — Actors can draw on different conceptual lenses

---

## 🚀 Quick Start

```bash
# Clone and install
git clone <repository-url>
cd curriculum-city
npm install

# Start development server
npm run dev
```

Open http://localhost:3000

---

## 📂 Project Structure

```
curriculum-city/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing page
│   ├── concepts/page.tsx         # Conceptual Chain Explorer
│   ├── actors/page.tsx           # Actor System Explorer
│   └── about/page.tsx            # About & disclaimers
│
├── components/
│   └── Framework/
│       ├── EntityDetail.tsx      # Entity article view
│       ├── PracticeSection.tsx   # Planning/instruction/assessment
│       └── TensionsSection.tsx   # Common tensions display
│
├── lib/
│   └── framework/
│       └── loadFramework.ts      # Data access layer
│
├── public/
│   └── data/
│       └── framework.json        # Single source of truth
│
└── structure.md                  # Architecture documentation
```

---

## 📊 Data: framework.json

All content is driven by a single JSON file at `public/data/framework.json`.

### Entity Structure

```json
{
  "id": "perennialism",
  "label": "Perennialism",
  "definition": "An educational philosophy that...",
  "aims": ["cultivate intellect", "enduring ideas"],
  "common_tensions": ["relevance vs canon", ...],
  "practice_examples": [
    {
      "title": "Great Books seminar",
      "planning_practices": [...],
      "instruction_practices": [...],
      "assessment_practices": [...]
    }
  ]
}
```

### Actor Structure

```json
{
  "actor": "teachers",
  "typical_power": "medium",
  "primary_concerns": ["pedagogy", "student needs"],
  "typical_artifacts": ["unit plans", "rubrics"]
}
```

---

## 🧩 Data Access API

```typescript
import { 
  loadFramework, 
  searchEntities, 
  groupActorsByLevel 
} from '@/lib/framework/loadFramework';

// Load framework data
const framework = await loadFramework();

// Search entities
const results = searchEntities(framework, "inquiry");

// Group actors by level
const grouped = groupActorsByLevel(framework);
// → { supra: [], macro: [...], meso: [...], micro: [...], nano: [...] }
```

---

## 🛠️ Development

```bash
npm run dev      # Development server (hot reload)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
```

---

## ➕ Adding New Content

### Add a Philosophy/Conception/Design Type

1. Open `public/data/framework.json`
2. Add to the appropriate array:
   - `entities.educational_philosophies`
   - `entities.curriculum_conceptions`
   - `entities.curriculum_design_types`

```json
{
  "id": "new_philosophy",
  "label": "New Philosophy Name",
  "definition": "Description of the philosophy...",
  "aims": ["aim 1", "aim 2"],
  "practice_examples": [
    {
      "id": "ex_01",
      "title": "Example Practice",
      "planning_practices": ["..."],
      "instruction_practices": ["..."],
      "assessment_practices": ["..."]
    }
  ]
}
```

3. The UI will render automatically (schema-tolerant)

### Add an Actor

Add to `axis_B_curriculum_making.actor_types`:

```json
{
  "actor": "new_actor_name",
  "typical_power": "medium",
  "primary_concerns": ["concern 1", "concern 2"],
  "typical_artifacts": ["artifact 1", "artifact 2"]
}
```

---

## ⚠️ Disclaimers

- These are **conceptual lenses**, not prescriptions
- Real educational settings **often hybridize** approaches
- We do **not assign fixed ideologies** to actors
- Curriculum emerges through **negotiation and enactment**

---

## 📚 Theoretical Foundations

- Elliot Eisner's curriculum orientations
- Mark Priestley's curriculum-making framework
- Tyler, Taba, and classical curriculum design
- Pragmatist and critical pedagogies

---

## 📄 License

Educational research and professional learning tool. Full citations available on request.

---

## 🙏 Credits

Framework data version: **0.5**  
Built with Next.js, TypeScript, and Tailwind CSS
