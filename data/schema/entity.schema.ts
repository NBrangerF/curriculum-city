import { z } from 'zod';

// Educational Philosophy Schema
export const EducationalPhilosophySchema = z.object({
    id: z.string(),
    label: z.string(),
    philosophical_basis: z.string(),
    ontology_range: z.array(z.string()),
    epistemology_range: z.array(z.string()),
    aims: z.array(z.string()),
    ends: z.array(z.string()),
    means_bias: z.array(z.string()),
    compatibilities: z.object({
        curriculum_conceptions_preferred: z.array(z.string()),
        design_types_often: z.array(z.string()),
    }),
    common_tensions: z.array(z.string()),
});

// Curriculum Conception Schema
export const CurriculumConceptionSchema = z.object({
    id: z.string(),
    label: z.string(),
    definition: z.string(),
    primary_function: z.string(),
    content_principle: z.array(z.string()),
    pedagogy_bias: z.array(z.string()),
    evidence_standard: z.array(z.string()),
    typical_design_affinities: z.array(z.string()),
    common_assessment_architecture: z.array(z.string()),
});

// Example Card (embedded in design subtypes)
export const EmbeddedExampleCardSchema = z.object({
    context: z.string(),
    planning: z.string(),
    instruction: z.string(),
    assessment: z.string(),
});

// Design Subtype Schema
export const DesignSubtypeSchema = z.object({
    id: z.string(),
    label: z.string(),
    planning_practices: z.array(z.string()),
    instruction_practices: z.array(z.string()),
    assessment_practices: z.array(z.string()),
    best_fit_for: z.array(z.string()),
    tradeoffs: z.array(z.string()),
    example_cards: z.array(EmbeddedExampleCardSchema).optional(),
});

// Curriculum Design Type Schema
export const CurriculumDesignTypeSchema = z.object({
    id: z.string(),
    label: z.string(),
    definition: z.string(),
    subtypes: z.array(DesignSubtypeSchema),
});

// Entity types union
export type EducationalPhilosophy = z.infer<typeof EducationalPhilosophySchema>;
export type CurriculumConception = z.infer<typeof CurriculumConceptionSchema>;
export type DesignSubtype = z.infer<typeof DesignSubtypeSchema>;
export type CurriculumDesignType = z.infer<typeof CurriculumDesignTypeSchema>;

// Layer types for the matrix
export type EntityLayer = 'philosophy' | 'conception' | 'design';

export interface MatrixEntity {
    id: string;
    label: string;
    layer: EntityLayer;
    parentId?: string; // For subtypes
    data: EducationalPhilosophy | CurriculumConception | DesignSubtype | CurriculumDesignType;
}
