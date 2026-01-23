import type { EntityLayer } from '@/data/schema/entity.schema';
import type { ActorLevel } from '@/data/schema/actor.schema';

interface SearchableEntity {
    id: string;
    label: string;
    layer: EntityLayer;
    definition: string;
    data: Record<string, unknown>;
}

interface SearchableActor {
    id: string;
    label: string;
    level: ActorLevel;
    roleDescription: string;
}

/**
 * Search entities by query
 */
export function searchEntities(
    entities: SearchableEntity[],
    query: string
): SearchableEntity[] {
    if (!query.trim()) return entities;

    const lowerQuery = query.toLowerCase();
    return entities.filter((e) =>
        e.label.toLowerCase().includes(lowerQuery) ||
        e.definition.toLowerCase().includes(lowerQuery)
    );
}

/**
 * Filter entities by layer
 */
export function filterEntitiesByLayer(
    entities: SearchableEntity[],
    layer: EntityLayer | 'all'
): SearchableEntity[] {
    if (layer === 'all') return entities;
    return entities.filter((e) => e.layer === layer);
}

/**
 * Search actors by query
 */
export function searchActors(
    actors: SearchableActor[],
    query: string
): SearchableActor[] {
    if (!query.trim()) return actors;

    const lowerQuery = query.toLowerCase();
    return actors.filter((a) =>
        a.label.toLowerCase().includes(lowerQuery) ||
        a.roleDescription.toLowerCase().includes(lowerQuery)
    );
}

/**
 * Filter actors by level
 */
export function filterActorsByLevel(
    actors: SearchableActor[],
    level: ActorLevel | 'all'
): SearchableActor[] {
    if (level === 'all') return actors;
    return actors.filter((a) => a.level === level);
}
