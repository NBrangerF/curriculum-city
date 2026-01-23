import { z } from 'zod';

// Actor Level
export const ActorLevelSchema = z.enum(['supra', 'macro', 'meso', 'micro', 'nano']);

// Actor Schema
export const ActorSchema = z.object({
    actor: z.string(),
    typical_power: z.string(),
    primary_concerns: z.array(z.string()),
    typical_artifacts: z.array(z.string()),
});

// Site of Activity Schema
export const SiteOfActivitySchema = z.object({
    site: ActorLevelSchema,
    description: z.string(),
});

// Axis B - Curriculum Making Schema
export const AxisBSchema = z.object({
    premise: z.string(),
    sites_of_activity: z.array(SiteOfActivitySchema),
    actor_types: z.array(ActorSchema),
});

// Types
export type ActorLevel = z.infer<typeof ActorLevelSchema>;
export type Actor = z.infer<typeof ActorSchema>;
export type SiteOfActivity = z.infer<typeof SiteOfActivitySchema>;

// Extended Actor for matrix display
export interface MatrixActor {
    id: string;
    label: string;
    level: ActorLevel;
    power: string;
    concerns: string[];
    artifacts: string[];
}

// Map actor names to user-friendly IDs
export function actorToId(actorName: string): string {
    return actorName.toLowerCase().replace(/[^a-z0-9]+/g, '_');
}

// Map site level to display order (for column grouping)
export function getLevelOrder(level: ActorLevel): number {
    const order: Record<ActorLevel, number> = {
        supra: 0,
        macro: 1,
        meso: 2,
        micro: 3,
        nano: 4,
    };
    return order[level];
}
