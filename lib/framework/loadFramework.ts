/**
 * Framework Data Layer
 * Single source of truth: /public/data/framework.json
 */

import type { ActorLevel } from '@/data/schema/actor.schema';

// ───────────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────────

export type EntityType = 'philosophy' | 'conception' | 'design';

export interface PracticeExample {
    id: string;
    title?: string;
    one_liner?: string;
    planning?: string;
    instruction?: string;
    assessment?: string;
    planning_practices?: string[];
    instruction_practices?: string[];
    assessment_practices?: string[];
    signals?: string[];
    tradeoff?: string;
}

export interface Entity {
    id: string;
    label: string;
    type: EntityType;
    definition?: string;
    // Philosophy-specific
    philosophical_basis?: string;
    aims?: string[];
    ends?: string[];
    means_bias?: string[];
    // Conception-specific
    primary_function?: string;
    content_principle?: string[];
    pedagogy_bias?: string[];
    evidence_standard?: string[];
    // Design-specific
    subtypes?: Entity[];
    best_fit_for?: string[];
    tradeoffs?: string[];
    // Common
    common_tensions?: string[];
    compatibilities?: Record<string, string[]>;
    practice_examples?: PracticeExample[];
    // Raw data for extensibility
    _raw: Record<string, unknown>;
}

export interface Actor {
    id: string;
    label: string;
    level: ActorLevel;
    typical_power?: string;
    primary_concerns?: string[];
    typical_artifacts?: string[];
    _raw: Record<string, unknown>;
}

export interface Site {
    site: ActorLevel;
    label: string;
    description: string;
}

export interface Framework {
    meta: {
        name: string;
        version: string;
        notes?: string[];
        updated_at?: string;
    };
    entities: {
        philosophies: Entity[];
        conceptions: Entity[];
        designTypes: Entity[];
    };
    actors: Actor[];
    sites: Site[];
    keyPrinciples: string[];
    relationshipNotes: string[];
}

// ───────────────────────────────────────────────────────────
// Loaders
// ───────────────────────────────────────────────────────────

let cachedFramework: Framework | null = null;

export async function loadFramework(): Promise<Framework> {
    if (cachedFramework) return cachedFramework;

    const response = await fetch('/data/framework.json');
    if (!response.ok) throw new Error('Failed to load framework data');

    const raw = await response.json();
    cachedFramework = parseFramework(raw);
    return cachedFramework;
}

function parseFramework(raw: Record<string, unknown>): Framework {
    const entities = raw.entities as Record<string, unknown[]> || {};
    const axisA = raw.axis_A_conceptual as Record<string, unknown> || {};
    const axisB = raw.axis_B_curriculum_making as Record<string, unknown> || {};
    const meta = raw.meta as Record<string, unknown> || {};

    // Parse philosophies
    const philosophies = ((entities.educational_philosophies || []) as Record<string, unknown>[])
        .map(p => parseEntity(p, 'philosophy'));

    // Parse conceptions
    const conceptions = ((entities.curriculum_conceptions || []) as Record<string, unknown>[])
        .map(c => parseEntity(c, 'conception'));

    // Parse design types (with subtypes)
    const designTypes: Entity[] = [];
    for (const dt of (entities.curriculum_design_types || []) as Record<string, unknown>[]) {
        designTypes.push(parseEntity(dt, 'design'));
    }

    // Parse actors
    const rawActors = (axisB.actor_types || []) as Record<string, unknown>[];
    const actors = rawActors.map(parseActor);

    // Parse sites
    const rawSites = (axisB.sites || {}) as Record<string, { label: string; description: string }>;
    const sites: Site[] = Object.entries(rawSites).map(([key, val]) => ({
        site: key as ActorLevel,
        label: val.label || key,
        description: val.description || '',
    }));

    // Key principles
    const keyPrinciples = (axisB.key_principles || []) as string[];

    // Relationship notes
    const relationshipNotes = (axisA.relationship_notes || []) as string[];

    return {
        meta: {
            name: meta.name as string || 'Framework',
            version: meta.version as string || '0.0',
            notes: meta.notes as string[] || [],
            updated_at: meta.updated_at as string,
        },
        entities: { philosophies, conceptions, designTypes },
        actors,
        sites,
        keyPrinciples,
        relationshipNotes,
    };
}

function parseEntity(raw: Record<string, unknown>, type: EntityType): Entity {
    return {
        id: raw.id as string || '',
        label: raw.label as string || raw.id as string || 'Unnamed',
        type,
        definition: raw.definition as string,
        philosophical_basis: raw.philosophical_basis as string,
        aims: raw.aims as string[],
        ends: raw.ends as string[],
        means_bias: raw.means_bias as string[],
        primary_function: raw.primary_function as string,
        content_principle: raw.content_principle as string[],
        pedagogy_bias: raw.pedagogy_bias as string[],
        evidence_standard: raw.evidence_standard as string[],
        best_fit_for: raw.best_fit_for as string[],
        tradeoffs: raw.tradeoffs as string[],
        common_tensions: raw.common_tensions as string[],
        compatibilities: raw.compatibilities as Record<string, string[]>,
        practice_examples: raw.practice_examples as PracticeExample[],
        subtypes: ((raw.subtypes || []) as Record<string, unknown>[]).map(s => parseEntity(s, 'design')),
        _raw: raw,
    };
}

function parseActor(raw: Record<string, unknown>): Actor {
    const actorId = raw.actor as string || raw.id as string || '';

    // Infer level from actor name
    let level: ActorLevel = 'meso';
    if (actorId.includes('policy') || actorId.includes('assessment_bodies')) {
        level = 'macro';
    } else if (actorId.includes('system_leaders')) {
        level = 'macro';
    } else if (actorId.includes('school_leaders')) {
        level = 'meso';
    } else if (actorId.includes('teachers')) {
        level = 'micro';
    } else if (actorId.includes('students')) {
        level = 'nano';
    } else if (actorId.includes('families')) {
        level = 'nano';
    } else if (actorId.includes('publishers')) {
        level = 'meso';
    }

    return {
        id: actorId,
        label: actorId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        level,
        typical_power: raw.typical_power as string,
        primary_concerns: raw.primary_concerns as string[],
        typical_artifacts: raw.typical_artifacts as string[],
        _raw: raw,
    };
}

// ───────────────────────────────────────────────────────────
// Accessors
// ───────────────────────────────────────────────────────────

export function getEntityById(framework: Framework, type: EntityType, id: string): Entity | undefined {
    const list = type === 'philosophy' ? framework.entities.philosophies
        : type === 'conception' ? framework.entities.conceptions
            : framework.entities.designTypes;

    // Check main entities
    let found = list.find(e => e.id === id);
    if (found) return found;

    // Check subtypes for design types
    if (type === 'design') {
        for (const dt of framework.entities.designTypes) {
            found = dt.subtypes?.find(s => s.id === id);
            if (found) return found;
        }
    }

    return undefined;
}

export function getAllEntities(framework: Framework): Entity[] {
    const all: Entity[] = [
        ...framework.entities.philosophies,
        ...framework.entities.conceptions,
        ...framework.entities.designTypes,
    ];

    // Include subtypes
    for (const dt of framework.entities.designTypes) {
        if (dt.subtypes) all.push(...dt.subtypes);
    }

    return all;
}

export function searchEntities(framework: Framework, query: string): Entity[] {
    if (!query.trim()) return getAllEntities(framework);

    const q = query.toLowerCase();
    return getAllEntities(framework).filter(e =>
        e.label.toLowerCase().includes(q) ||
        e.definition?.toLowerCase().includes(q) ||
        e.aims?.some(a => a.toLowerCase().includes(q)) ||
        e.ends?.some(a => a.toLowerCase().includes(q)) ||
        e.primary_function?.toLowerCase().includes(q)
    );
}

export function groupActorsByLevel(framework: Framework): Record<ActorLevel, Actor[]> {
    const groups: Record<ActorLevel, Actor[]> = {
        supra: [],
        macro: [],
        meso: [],
        micro: [],
        nano: [],
    };

    for (const actor of framework.actors) {
        groups[actor.level].push(actor);
    }

    return groups;
}

export function searchActors(framework: Framework, query: string): Actor[] {
    if (!query.trim()) return framework.actors;

    const q = query.toLowerCase();
    return framework.actors.filter(a =>
        a.label.toLowerCase().includes(q) ||
        a.primary_concerns?.some(c => c.toLowerCase().includes(q)) ||
        a.typical_artifacts?.some(t => t.toLowerCase().includes(q))
    );
}
