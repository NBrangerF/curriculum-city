import { z } from 'zod';

// Tension Pattern Schema
export const TensionSchema = z.object({
    id: z.string(),
    pattern: z.string(),
    symptoms: z.array(z.string()),
    likely_root_causes: z.array(z.string()),
    quick_probes: z.array(z.string()),
    bridging_language: z.array(z.string()).optional(),
});

// Misalignment Diagnostic (from existing framework.json)
export const MisalignmentDiagnosticSchema = z.object({
    pattern: z.string(),
    symptoms: z.array(z.string()),
    likely_root_causes: z.array(z.string()),
    quick_probes: z.array(z.string()),
});

// Types
export type Tension = z.infer<typeof TensionSchema>;
export type MisalignmentDiagnostic = z.infer<typeof MisalignmentDiagnosticSchema>;

// Common tension IDs used in the matrix
export const COMMON_TENSIONS = {
    EVIDENCE_MISMATCH: 'evidence_standard_mismatch',
    PEDAGOGY_FUNCTION: 'pedagogy_function_mismatch',
    ACTOR_CONSTRAINT: 'actor_constraint_mismatch',
    AIMS_ENDS: 'aims_ends_tension',
    COVERAGE_DEPTH: 'coverage_vs_depth',
    RELEVANCE_CANON: 'relevance_vs_canon',
    EQUITY_TRACKING: 'equity_vs_tracking',
    STRUCTURE_OPENNESS: 'structure_vs_openness',
    ACCOUNTABILITY_QUALITATIVE: 'accountability_vs_qualitative',
    POLITICIZATION: 'politicization_concern',
} as const;

// Tension severity levels
export type TensionSeverity = 'low' | 'medium' | 'high';

export interface TensionInstance {
    tensionId: string;
    severity: TensionSeverity;
    context: string;
}
