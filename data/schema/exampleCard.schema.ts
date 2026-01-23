import { z } from 'zod';

// Alignment Tags Schema
export const AlignmentTagsSchema = z.object({
    philosophy: z.array(z.string()).optional(),
    conception: z.array(z.string()).optional(),
    design_type: z.array(z.string()).optional(),
    learning_theory: z.array(z.string()).optional(),
});

// Adaptations Schema
export const AdaptationsSchema = z.object({
    minimal_change: z.string().optional(),
    high_constraint: z.string().optional(),
});

// Full Example Card Schema (for dedicated example cards)
export const ExampleCardSchema = z.object({
    id: z.string(),
    title: z.string(),

    // Context
    context: z.object({
        grade_band: z.string(),
        subject: z.string(),
        time_required: z.string().optional(),
        class_size: z.string().optional(),
        constraints: z.array(z.string()).optional(),
    }),

    // Planning
    planning: z.object({
        scope_sequence: z.string().optional(),
        materials: z.array(z.string()).optional(),
        prep_steps: z.array(z.string()).optional(),
        summary: z.string(),
    }),

    // Instruction
    instruction: z.object({
        routines: z.array(z.string()).optional(),
        teacher_moves: z.array(z.string()).optional(),
        student_moves: z.array(z.string()).optional(),
        scaffolds: z.array(z.string()).optional(),
        summary: z.string(),
    }),

    // Assessment
    assessment: z.object({
        what: z.string(),
        how: z.string(),
        rubric_hints: z.string().optional(),
        evidence_type: z.array(z.string()).optional(),
        summary: z.string(),
    }),

    // Alignment
    alignmentTags: AlignmentTagsSchema,

    // Trade-offs
    tradeoffs: z.object({
        risks: z.array(z.string()).optional(),
        mitigations: z.array(z.string()).optional(),
        summary: z.string().optional(),
    }).optional(),

    // Adaptations
    adaptations: AdaptationsSchema.optional(),

    // Linked entities
    linked_entities: z.array(z.string()).optional(),
    linked_actors: z.array(z.string()).optional(),
});

// Types
export type AlignmentTags = z.infer<typeof AlignmentTagsSchema>;
export type Adaptations = z.infer<typeof AdaptationsSchema>;
export type ExampleCard = z.infer<typeof ExampleCardSchema>;

// Filter options for example cards
export interface ExampleCardFilters {
    gradeBand?: string[];
    subject?: string[];
    timeCost?: string[];
    constraints?: string[];
    evidenceType?: string[];
    philosophy?: string[];
    conception?: string[];
    designType?: string[];
}

// Common grade bands
export const GRADE_BANDS = [
    'K-2',
    '3-5',
    '6-8',
    '9-12',
    'All Grades',
] as const;

// Common subjects
export const SUBJECTS = [
    'Mathematics',
    'Science',
    'ELA/English',
    'Social Studies',
    'History',
    'Civics',
    'Arts',
    'Physical Education',
    'World Languages',
    'Interdisciplinary',
] as const;

// Time cost categories
export const TIME_COSTS = [
    'Single lesson',
    'Multi-day',
    'Unit (1-2 weeks)',
    'Extended unit (3+ weeks)',
] as const;
