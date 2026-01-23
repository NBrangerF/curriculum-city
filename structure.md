# Curriculum City — Project Structure

## Architecture Overview

A concept explorer for curriculum studies using `framework.json` as single source of truth.

---

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing with lens chooser |
| `/concepts` | Conceptual Chain Explorer |
| `/actors` | Actor System Explorer |
| `/about` | Description and disclaimers |
| `/explore` | Redirect → `/concepts` |

---

## Data Layer

```
lib/framework/loadFramework.ts
├── Types: Entity, Actor, Framework, PracticeExample
├── loadFramework()        # Load & cache framework.json
├── getEntityById()        # Get entity by type and id
├── getAllEntities()       # Get all entities flat
├── searchEntities()       # Search by name/definition
├── groupActorsByLevel()   # Group actors by level
└── searchActors()         # Search actors
```

---

## Components

```
components/Framework/
├── EntityDetail.tsx       # Full entity article view
├── PracticeSection.tsx    # Planning/instruction/assessment
└── TensionsSection.tsx    # Common tensions display
```

---

## Data Shape (framework.json)

```json
{
  "meta": { "name", "version", "notes" },
  "entities": {
    "educational_philosophies": [...],
    "curriculum_conceptions": [...],
    "curriculum_design_types": [...]
  },
  "axis_B_curriculum_making": {
    "actor_types": [...],
    "sites": {...},
    "key_principles": [...]
  }
}
```

### Entity Fields
- `id`, `label`, `definition` (required)
- `aims`, `ends`, `means_bias` (philosophy)
- `primary_function`, `content_principle` (conception)
- `subtypes`, `best_fit_for` (design)
- `practice_examples[]` with `planning_practices[]`, `instruction_practices[]`, `assessment_practices[]`
- `common_tensions[]`

---

## Adding New Entities

1. Add entity to appropriate array in `framework.json`
2. Include at minimum: `id`, `label`, `definition`
3. Add `practice_examples` with practice arrays
4. UI will render automatically (schema-tolerant)

---

## Dev Commands

```bash
npm run dev    # Start dev server
npm run build  # Build for production
```
