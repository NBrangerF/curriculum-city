'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { loadFramework, groupActorsByLevel, searchActors, type Framework, type Actor } from '@/lib/framework/loadFramework';
import type { ActorLevel } from '@/data/schema/actor.schema';

const LEVEL_CONFIG: Record<ActorLevel, { label: string; icon: string; color: string }> = {
    supra: { label: 'Supra', icon: '🌐', color: 'pink' },
    macro: { label: 'Macro', icon: '🏛️', color: 'violet' },
    meso: { label: 'Meso', icon: '🏫', color: 'cyan' },
    micro: { label: 'Micro', icon: '👩‍🏫', color: 'emerald' },
    nano: { label: 'Nano', icon: '👦', color: 'amber' },
};

const LEVEL_ORDER: ActorLevel[] = ['supra', 'macro', 'meso', 'micro', 'nano'];

export default function ActorsPage() {
    const [framework, setFramework] = useState<Framework | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<ActorLevel | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showExplainer, setShowExplainer] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadFramework()
            .then(setFramework)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    // Group actors by level
    const groupedActors = useMemo(() => {
        if (!framework) return {} as Record<ActorLevel, Actor[]>;
        return groupActorsByLevel(framework);
    }, [framework]);

    // Available levels (only those with actors)
    const availableLevels = useMemo(() => {
        return LEVEL_ORDER.filter(level => groupedActors[level]?.length > 0);
    }, [groupedActors]);

    // Filter actors
    const filteredActors = useMemo(() => {
        if (!framework) return [];

        let actors = searchQuery.trim()
            ? searchActors(framework, searchQuery)
            : framework.actors;

        if (selectedLevel !== 'all') {
            actors = actors.filter(a => a.level === selectedLevel);
        }

        return actors;
    }, [framework, searchQuery, selectedLevel]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-pulse text-4xl mb-4">👥</div>
                    <p className="text-slate-600 dark:text-slate-400">Loading actors...</p>
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

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
            {/* Navigation */}
            <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-2 hover:opacity-80">
                            <span className="text-xl">🏛️</span>
                            <span className="font-semibold text-slate-900 dark:text-white hidden sm:inline">
                                Curriculum City
                            </span>
                        </Link>
                        <nav className="flex items-center gap-4">
                            <Link href="/concepts" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                                Concepts
                            </Link>
                            <Link href="/actors" className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                Actors
                            </Link>
                            <Link href="/about" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                                About
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Explainer */}
            <div className="bg-gradient-to-r from-violet-50 via-cyan-50 to-amber-50 dark:from-violet-900/10 dark:via-cyan-900/10 dark:to-amber-900/10 border-b border-slate-200 dark:border-slate-800">
                <button
                    onClick={() => setShowExplainer(!showExplainer)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors"
                >
                    <div className="flex items-center gap-2">
                        <span className="text-lg">👥</span>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            How the Actor System Works
                        </span>
                    </div>
                    <span className="text-slate-400 text-sm">{showExplainer ? '▼' : '▶'}</span>
                </button>

                {showExplainer && (
                    <div className="px-4 pb-4 space-y-4">
                        <div className="bg-white dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                                Curriculum is not simply imposed from above—it emerges through <strong>dynamic interaction and negotiation</strong> among actors at all levels. Each actor brings their own concerns, constraints, and agency to the curriculum-making process.
                            </p>

                            {/* Visual levels */}
                            <div className="flex items-center justify-center gap-2 py-3 flex-wrap">
                                {LEVEL_ORDER.filter(l => groupedActors[l]?.length > 0).map((level, i, arr) => (
                                    <div key={level} className="flex items-center gap-2">
                                        <div className={`px-3 py-2 bg-${LEVEL_CONFIG[level].color}-100 dark:bg-${LEVEL_CONFIG[level].color}-900/30 rounded-lg text-center`}>
                                            <span className="text-lg">{LEVEL_CONFIG[level].icon}</span>
                                            <p className={`text-xs font-medium text-${LEVEL_CONFIG[level].color}-700 dark:text-${LEVEL_CONFIG[level].color}-300`}>
                                                {LEVEL_CONFIG[level].label}
                                            </p>
                                        </div>
                                        {i < arr.length - 1 && (
                                            <div className="flex flex-col items-center text-slate-400 text-xs">
                                                <span>↓</span>
                                                <span>↑</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Key Principles from JSON */}
                            {framework.keyPrinciples.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                                    <h4 className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-2">Key Principles</h4>
                                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
                                        {framework.keyPrinciples.map((principle, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="text-cyan-500 mt-0.5">•</span>
                                                <span>{principle}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Level Filter */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex items-center gap-2 overflow-x-auto">
                        <button
                            onClick={() => setSelectedLevel('all')}
                            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedLevel === 'all'
                                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                        >
                            All Levels
                        </button>
                        {availableLevels.map((level) => {
                            const config = LEVEL_CONFIG[level];
                            return (
                                <button
                                    key={level}
                                    onClick={() => setSelectedLevel(level)}
                                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedLevel === level
                                            ? `bg-${config.color}-100 dark:bg-${config.color}-900/30 text-${config.color}-700 dark:text-${config.color}-300 ring-2 ring-${config.color}-500`
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    <span>{config.icon}</span>
                                    <span>{config.label}</span>
                                    <span className="text-xs opacity-70">({groupedActors[level]?.length || 0})</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4">
                <div className="max-w-7xl mx-auto">
                    <div className="relative max-w-md">
                        <input
                            type="text"
                            placeholder="Search actors..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 pl-10 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                    </div>
                </div>
            </div>

            {/* Actor Cards */}
            <main className="flex-1 p-4">
                <div className="max-w-7xl mx-auto">
                    {filteredActors.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-slate-500 dark:text-slate-400">
                                No actors found matching your filters.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredActors.map((actor) => (
                                <ActorCard key={actor.id} actor={actor} />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                    Curriculum making is a dynamic process of negotiation across all levels.
                    Actors can draw on different conceptual lenses; we do not assign fixed ideologies to roles.
                </p>
            </footer>
        </div>
    );
}

function ActorCard({ actor }: { actor: Actor }) {
    const config = LEVEL_CONFIG[actor.level];

    return (
        <article className={`p-4 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-${config.color}-300 dark:hover:border-${config.color}-700 transition-colors`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-${config.color}-100 dark:bg-${config.color}-900/30 text-${config.color}-700 dark:text-${config.color}-300 mb-1`}>
                        <span>{config.icon}</span>
                        <span>{config.label}</span>
                    </span>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                        {actor.label}
                    </h3>
                </div>
                {actor.typical_power && (
                    <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                        {actor.typical_power}
                    </span>
                )}
            </div>

            {/* Concerns */}
            {actor.primary_concerns && actor.primary_concerns.length > 0 && (
                <div className="mb-3">
                    <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">
                        Primary Concerns
                    </h4>
                    <div className="flex flex-wrap gap-1">
                        {actor.primary_concerns.map((concern, i) => (
                            <span
                                key={i}
                                className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded"
                            >
                                {concern}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Artifacts */}
            {actor.typical_artifacts && actor.typical_artifacts.length > 0 && (
                <div>
                    <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">
                        Typical Artifacts / Levers
                    </h4>
                    <div className="flex flex-wrap gap-1">
                        {actor.typical_artifacts.map((artifact, i) => (
                            <span
                                key={i}
                                className={`text-xs px-2 py-0.5 bg-${config.color}-50 dark:bg-${config.color}-900/20 text-${config.color}-700 dark:text-${config.color}-300 rounded`}
                            >
                                {artifact}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Footer hint */}
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 italic">
                Influences and is influenced by actors at other levels
            </p>
        </article>
    );
}
