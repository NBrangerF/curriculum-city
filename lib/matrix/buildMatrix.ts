import type { EntityLayer } from '@/data/schema/entity.schema';
import type { ActorLevel } from '@/data/schema/actor.schema';

export interface LoomEntity {
    id: string;
    label: string;
    layer: EntityLayer;
    definition: string;
    data: Record<string, unknown>;
}

export interface LoomActor {
    id: string;
    label: string;
    level: ActorLevel;
    roleDescription: string;
}

export interface LoomStructure {
    philosophies: LoomEntity[];
    conceptions: LoomEntity[];
    designTypes: LoomEntity[];
    actors: LoomActor[];
}

/**
 * Build loom structure from framework.json data
 * Data paths:
 * - entities.educational_philosophies
 * - entities.curriculum_conceptions
 * - entities.curriculum_design_types
 * - axis_B_curriculum_making.actor_types
 * - axis_B_curriculum_making.sites_of_activity
 */
export function buildLoomStructure(frameworkData: Record<string, unknown>): LoomStructure {
    const entities = frameworkData.entities as Record<string, unknown>;
    const axisB = frameworkData.axis_B_curriculum_making as Record<string, unknown>;

    // Build philosophies
    const rawPhilosophies = (entities?.educational_philosophies as Record<string, unknown>[]) || [];
    const philosophies: LoomEntity[] = rawPhilosophies.map((p) => ({
        id: p.id as string,
        label: p.label as string,
        layer: 'philosophy' as EntityLayer,
        definition: (p.definition as string) || `${p.philosophical_basis || ''}: ${(p.aims as string[])?.join(', ') || ''}`.trim() || p.label as string,
        data: p,
    }));

    // Build conceptions
    const rawConceptions = (entities?.curriculum_conceptions as Record<string, unknown>[]) || [];
    const conceptions: LoomEntity[] = rawConceptions.map((c) => ({
        id: c.id as string,
        label: c.label as string,
        layer: 'conception' as EntityLayer,
        definition: c.primary_function as string || c.label as string,
        data: c,
    }));

    // Build design types (flatten with subtypes)
    const rawDesignTypes = (entities?.curriculum_design_types as Record<string, unknown>[]) || [];
    const designTypes: LoomEntity[] = [];

    for (const dt of rawDesignTypes) {
        // Add parent design type
        designTypes.push({
            id: dt.id as string,
            label: dt.label as string,
            layer: 'design' as EntityLayer,
            definition: dt.orientation as string || dt.label as string,
            data: dt,
        });

        // Add subtypes
        const subtypes = (dt.subtypes as Record<string, unknown>[]) || [];
        for (const st of subtypes) {
            designTypes.push({
                id: st.id as string,
                label: st.label as string,
                layer: 'design' as EntityLayer,
                definition: (st.best_fit_for as string[])?.join(', ') || st.label as string,
                data: { ...st, parent_id: dt.id },
            });
        }
    }

    // Build actors from actor_types
    const rawActors = (axisB?.actor_types as Record<string, unknown>[]) || [];
    const sites = (axisB?.sites_of_activity as { site: ActorLevel; description: string }[]) || [];

    // Map actor to levels based on their concerns
    const actors: LoomActor[] = rawActors.map((a) => {
        const actorName = a.actor as string;
        const concerns = (a.primary_concerns as string[]) || [];

        // Infer level from actor name
        let level: ActorLevel = 'meso';
        if (actorName.includes('policy') || actorName.includes('assessment_bodies')) {
            level = 'macro';
        } else if (actorName.includes('system_leaders')) {
            level = 'macro';
        } else if (actorName.includes('school_leaders')) {
            level = 'meso';
        } else if (actorName.includes('teachers')) {
            level = 'micro';
        } else if (actorName.includes('students')) {
            level = 'nano';
        } else if (actorName.includes('families')) {
            level = 'nano';
        } else if (actorName.includes('publishers')) {
            level = 'meso';
        }

        return {
            id: actorName,
            label: actorName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            level,
            roleDescription: concerns.slice(0, 2).join(', ') || a.typical_power as string || '',
        };
    });

    return {
        philosophies,
        conceptions,
        designTypes,
        actors,
    };
}

/**
 * Get entity by ID from loom structure
 */
export function getEntityById(structure: LoomStructure, id: string): LoomEntity | undefined {
    return (
        structure.philosophies.find((e) => e.id === id) ||
        structure.conceptions.find((e) => e.id === id) ||
        structure.designTypes.find((e) => e.id === id)
    );
}

/**
 * Get all entities as flat array
 */
export function getAllEntities(structure: LoomStructure): LoomEntity[] {
    return [
        ...structure.philosophies,
        ...structure.conceptions,
        ...structure.designTypes,
    ];
}
