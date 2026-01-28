'use client';

import { useState, useEffect, useMemo } from 'react';
import EntityDetail from '@/components/Framework/EntityDetail';
import { loadFramework, searchEntities, type Framework, type Entity, type EntityType } from '@/lib/framework/loadFramework';
import { useLens } from '@/contexts/LensContext';
import SiteHeader from '@/components/Layout/SiteHeader';
import PosthumanConceptsView from '@/components/Lens/PosthumanConceptsView';

export default function ConceptsPage() {
    const [framework, setFramework] = useState<Framework | null>(null);
    const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedType, setExpandedType] = useState<EntityType | null>('philosophy');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showExplainer, setShowExplainer] = useState(false);

    // Access lens context
    const { isPosthumanLens } = useLens();


    useEffect(() => {
        loadFramework()
            .then(setFramework)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    // Filtered entities based on search
    const filteredEntities = useMemo(() => {
        if (!framework) return { philosophies: [], conceptions: [], designTypes: [] };

        if (!searchQuery.trim()) {
            return framework.entities;
        }

        const results = searchEntities(framework, searchQuery);
        return {
            philosophies: results.filter(e => e.type === 'philosophy'),
            conceptions: results.filter(e => e.type === 'conception'),
            designTypes: results.filter(e => e.type === 'design' && !e._raw.parent_id),
        };
    }, [framework, searchQuery]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-pulse text-4xl mb-4">📚</div>
                    <p className="text-slate-600 dark:text-slate-400">Loading concepts...</p>
                </div>
            </div>
        );
    }

    if (error || !framework) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="max-w-md text-center">
                    <div className="text-4xl mb-4">⚠️</div>
                    <h1 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                        Unable to Load Data
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">{error}</p>
                    <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const sections: { type: EntityType; label: string; icon: string; entities: Entity[] }[] = [
        { type: 'philosophy', label: 'Educational Philosophy', icon: '💭', entities: filteredEntities.philosophies },
        { type: 'conception', label: 'Curriculum Conception', icon: '📐', entities: filteredEntities.conceptions },
        { type: 'design', label: 'Design Types', icon: '🏗️', entities: filteredEntities.designTypes },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
            {/* Navigation */}
            <SiteHeader />

            {/* Posthuman Lens: Render PosthumanConceptsView instead of taxonomy */}
            {isPosthumanLens ? (
                <PosthumanConceptsView />
            ) : (
                /* Canonical View */
                <>

                    {/* Explainer */}
                    <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-emerald-50 dark:from-purple-900/10 dark:via-blue-900/10 dark:to-emerald-900/10 border-b border-slate-200 dark:border-slate-800">
                        <button
                            onClick={() => setShowExplainer(!showExplainer)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-lg">🔗</span>
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    How these layers relate (non-linear)
                                </span>
                            </div>
                            <span className="text-slate-400 text-sm">{showExplainer ? '▼' : '▶'}</span>
                        </button>

                        {showExplainer && (
                            <div className="px-4 pb-4 space-y-4">
                                <div className="bg-white dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                                    <div className="flex flex-wrap items-center justify-center gap-2 text-sm mb-4">
                                        <div className="px-3 py-2 bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-700 rounded-lg text-center">
                                            <p className="font-medium text-purple-700 dark:text-purple-300">Philosophy</p>
                                            <p className="text-[10px] text-purple-600 dark:text-purple-400">Worldview / Values</p>
                                        </div>
                                        <span className="text-slate-400 font-bold">↔</span>
                                        <div className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded-lg text-center">
                                            <p className="font-medium text-blue-700 dark:text-blue-300">Conception</p>
                                            <p className="text-[10px] text-blue-600 dark:text-blue-400">Function / Priorities</p>
                                        </div>
                                        <span className="text-slate-400 font-bold">↔</span>
                                        <div className="px-3 py-2 bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 rounded-lg text-center">
                                            <p className="font-medium text-emerald-700 dark:text-emerald-300">Design Types</p>
                                            <p className="text-[10px] text-emerald-600 dark:text-emerald-400">Structure / Organization</p>
                                        </div>
                                    </div>

                                    {/* Relationship notes from JSON */}
                                    {framework.relationshipNotes.length > 0 && (
                                        <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
                                            {framework.relationshipNotes.map((note, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-blue-500 mt-0.5">•</span>
                                                    <span>{note}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex overflow-hidden">
                        {/* Sidebar */}
                        <aside className="hidden md:block w-80 flex-shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto">
                            {/* Header + Search */}
                            <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                                    Conceptual Chain
                                </h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                                    Explore philosophies, conceptions, and design types
                                </p>
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

                            {/* Sections */}
                            <div className="p-2 space-y-2">
                                {sections.map(({ type, label, icon, entities }) => (
                                    <div key={type} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => setExpandedType(expandedType === type ? null : type)}
                                            className={`w-full flex items-center justify-between p-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 ${expandedType === type ? 'bg-slate-50 dark:bg-slate-800' : ''}`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span>{icon}</span>
                                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
                                                <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
                                                    {entities.length}
                                                </span>
                                            </div>
                                            <span className="text-slate-400 text-xs">{expandedType === type ? '▼' : '▶'}</span>
                                        </button>

                                        {expandedType === type && entities.length > 0 && (
                                            <div className="border-t border-slate-200 dark:border-slate-700">
                                                {entities.map((entity) => (
                                                    <button
                                                        key={entity.id}
                                                        onClick={() => setSelectedEntity(entity)}
                                                        className={`w-full text-left p-3 border-b border-slate-100 dark:border-slate-800 last:border-b-0 transition-all ${selectedEntity?.id === entity.id
                                                            ? 'bg-blue-50 dark:bg-blue-900/20 border-l-2 border-l-blue-500'
                                                            : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                                                            }`}
                                                    >
                                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                            {entity.label}
                                                        </p>
                                                        {entity.definition && (
                                                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                                                {entity.definition}
                                                            </p>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {expandedType === type && entities.length === 0 && (
                                            <div className="p-3 text-center text-xs text-slate-400 border-t border-slate-200 dark:border-slate-700">
                                                No matches found
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </aside>

                        {/* Main Panel */}
                        <main className="flex-1 bg-white dark:bg-slate-900 overflow-y-auto">
                            <EntityDetail entity={selectedEntity} />
                        </main>
                    </div>

                    {/* Mobile FAB */}
                    <button
                        onClick={() => {/* TODO: mobile drawer */ }}
                        className="md:hidden fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700"
                    >
                        📚
                    </button>
                </>
            )}
        </div>
    );
}
