'use client';

import { useState } from 'react';

interface ActorSystemExplainerProps {
    defaultExpanded?: boolean;
}

export default function ActorSystemExplainer({
    defaultExpanded = false,
}: ActorSystemExplainerProps) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
        <div className="bg-gradient-to-r from-violet-50 via-cyan-50 to-amber-50 dark:from-violet-900/10 dark:via-cyan-900/10 dark:to-amber-900/10 border-b border-slate-200 dark:border-slate-800">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <span className="text-lg">👥</span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        How the Actor System Works
                    </span>
                </div>
                <span className="text-slate-400 text-sm">
                    {isExpanded ? '▼' : '▶'}
                </span>
            </button>

            {isExpanded && (
                <div className="px-4 pb-4 space-y-4">
                    {/* Narrative */}
                    <div className="bg-white dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                            Curriculum is not simply imposed from above or created from below—it emerges
                            through <strong>dynamic interaction and negotiation</strong> among actors at all levels.
                            Each actor brings their own concerns, constraints, and agency to the curriculum-making process.
                        </p>

                        {/* Visual representation */}
                        <div className="flex items-center justify-center gap-2 py-4 text-sm">
                            <div className="px-3 py-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg text-center">
                                <span className="text-lg">🏛️</span>
                                <p className="text-xs font-medium text-violet-700 dark:text-violet-300">Macro</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-slate-400">↓</span>
                                <span className="text-slate-400">↑</span>
                            </div>
                            <div className="px-3 py-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg text-center">
                                <span className="text-lg">🏫</span>
                                <p className="text-xs font-medium text-cyan-700 dark:text-cyan-300">Meso</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-slate-400">↓</span>
                                <span className="text-slate-400">↑</span>
                            </div>
                            <div className="px-3 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-center">
                                <span className="text-lg">👩‍🏫</span>
                                <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Micro</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-slate-400">↓</span>
                                <span className="text-slate-400">↑</span>
                            </div>
                            <div className="px-3 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-center">
                                <span className="text-lg">👦</span>
                                <p className="text-xs font-medium text-amber-700 dark:text-amber-300">Nano</p>
                            </div>
                        </div>
                    </div>

                    {/* Key Principles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                            <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                ↕ Bidirectional Influence
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                                Top-down mandates are interpreted, adapted, and sometimes resisted.
                                Bottom-up innovations can reshape practice and even policy.
                            </p>
                        </div>
                        <div className="p-3 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                            <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                🔀 Negotiation, Not Determination
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                                No single actor level "determines" curriculum.
                                The operational curriculum is always a negotiated outcome.
                            </p>
                        </div>
                        <div className="p-3 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                            <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                🌐 Ecological Agency
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                                Agency is ecological: enabled and constrained by structural,
                                cultural, and material conditions at each level.
                            </p>
                        </div>
                        <div className="p-3 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                            <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                🎭 Multiple Commitments
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                                Actors may draw on different philosophies, conceptions, and design types.
                                We do not assign fixed ideologies to roles.
                            </p>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <p className="text-xs text-blue-700 dark:text-blue-300 text-center">
                            This site does not assign fixed ideologies to actor roles.
                            Real practice involves context-specific negotiation and hybrid approaches.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
