'use client';

import { useState, useMemo } from 'react';
import type { EntityLayer } from '@/data/schema/entity.schema';

interface ConceptEntity {
    id: string;
    label: string;
    layer: EntityLayer;
    definition: string;
    data: Record<string, unknown>;
}

interface ConceptsSidebarProps {
    philosophies: ConceptEntity[];
    conceptions: ConceptEntity[];
    designTypes: ConceptEntity[];
    selectedEntity: ConceptEntity | null;
    onEntitySelect: (entity: ConceptEntity) => void;
}

export default function ConceptsSidebar({
    philosophies,
    conceptions,
    designTypes,
    selectedEntity,
    onEntitySelect,
}: ConceptsSidebarProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedLayer, setExpandedLayer] = useState<EntityLayer | null>('philosophy');

    // Filter entities based on search
    const filterEntities = (entities: ConceptEntity[]) => {
        if (!searchQuery.trim()) return entities;
        const q = searchQuery.toLowerCase();
        return entities.filter(
            (e) =>
                e.label.toLowerCase().includes(q) ||
                e.definition.toLowerCase().includes(q)
        );
    };

    const filteredPhilosophies = useMemo(() => filterEntities(philosophies), [philosophies, searchQuery]);
    const filteredConceptions = useMemo(() => filterEntities(conceptions), [conceptions, searchQuery]);
    const filteredDesignTypes = useMemo(() => filterEntities(designTypes), [designTypes, searchQuery]);

    const layers: { key: EntityLayer; label: string; entities: ConceptEntity[]; color: string; icon: string }[] = [
        { key: 'philosophy', label: 'Educational Philosophy', entities: filteredPhilosophies, color: 'purple', icon: '💭' },
        { key: 'conception', label: 'Curriculum Conception', entities: filteredConceptions, color: 'blue', icon: '📐' },
        { key: 'design', label: 'Design Types', entities: filteredDesignTypes, color: 'emerald', icon: '🏗️' },
    ];

    const toggleLayer = (layer: EntityLayer) => {
        setExpandedLayer(expandedLayer === layer ? null : layer);
    };

    return (
        <aside className="h-full flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
            {/* Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                    Conceptual Chain
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                    Explore philosophies, conceptions, and design types
                </p>

                {/* Search */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search concepts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 pl-9 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                </div>
            </div>

            {/* Layers */}
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {layers.map(({ key, label, entities, color, icon }) => (
                    <div
                        key={key}
                        className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden"
                    >
                        {/* Layer Header */}
                        <button
                            onClick={() => toggleLayer(key)}
                            className={`w-full flex items-center justify-between p-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 ${expandedLayer === key ? 'bg-slate-50 dark:bg-slate-800' : ''
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <span>{icon}</span>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {label}
                                </span>
                                <span className={`text-xs px-1.5 py-0.5 rounded-full bg-${color}-100 dark:bg-${color}-900/30 text-${color}-700 dark:text-${color}-300`}>
                                    {entities.length}
                                </span>
                            </div>
                            <span className="text-slate-400 text-xs">
                                {expandedLayer === key ? '▼' : '▶'}
                            </span>
                        </button>

                        {/* Entity List */}
                        {expandedLayer === key && entities.length > 0 && (
                            <div className="border-t border-slate-200 dark:border-slate-700">
                                {entities.map((entity) => {
                                    const isSelected = selectedEntity?.id === entity.id;

                                    return (
                                        <button
                                            key={entity.id}
                                            onClick={() => onEntitySelect(entity)}
                                            className={`w-full text-left p-3 border-b border-slate-100 dark:border-slate-800 last:border-b-0 transition-all ${isSelected
                                                    ? `bg-${color}-50 dark:bg-${color}-900/20 border-l-2 border-l-${color}-500`
                                                    : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                                                }`}
                                        >
                                            <p className={`text-sm font-medium ${isSelected
                                                    ? `text-${color}-700 dark:text-${color}-300`
                                                    : 'text-slate-700 dark:text-slate-300'
                                                }`}>
                                                {entity.label}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                                {entity.definition}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {expandedLayer === key && entities.length === 0 && (
                            <div className="p-3 text-center text-xs text-slate-400">
                                No matches found
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </aside>
    );
}
