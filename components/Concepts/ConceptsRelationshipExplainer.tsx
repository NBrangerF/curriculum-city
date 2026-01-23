'use client';

import { useState } from 'react';

interface ConceptsRelationshipExplainerProps {
    defaultExpanded?: boolean;
}

export default function ConceptsRelationshipExplainer({
    defaultExpanded = false,
}: ConceptsRelationshipExplainerProps) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
        <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-emerald-50 dark:from-purple-900/10 dark:via-blue-900/10 dark:to-emerald-900/10 border-b border-slate-200 dark:border-slate-800">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <span className="text-lg">🔗</span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        How these layers relate (non-linear)
                    </span>
                </div>
                <span className="text-slate-400 text-sm">
                    {isExpanded ? '▼' : '▶'}
                </span>
            </button>

            {isExpanded && (
                <div className="px-4 pb-4 space-y-4">
                    {/* Diagram */}
                    <div className="bg-white dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                        <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
                            <div className="px-3 py-2 bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-700 rounded-lg text-center">
                                <p className="font-medium text-purple-700 dark:text-purple-300">Philosophy</p>
                                <p className="text-[10px] text-purple-600 dark:text-purple-400">Worldview/Values</p>
                            </div>
                            <span className="text-slate-400 font-bold">↔</span>
                            <div className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded-lg text-center">
                                <p className="font-medium text-blue-700 dark:text-blue-300">Conception</p>
                                <p className="text-[10px] text-blue-600 dark:text-blue-400">Function/Priorities</p>
                            </div>
                            <span className="text-slate-400 font-bold">↔</span>
                            <div className="px-3 py-2 bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 rounded-lg text-center">
                                <p className="font-medium text-emerald-700 dark:text-emerald-300">Design Types</p>
                                <p className="text-[10px] text-emerald-600 dark:text-emerald-400">Structure/Organization</p>
                            </div>
                            <span className="text-slate-400 font-bold">↔</span>
                            <div className="px-3 py-2 bg-amber-100 dark:bg-amber-900/30 border-2 border-amber-400 dark:border-amber-600 rounded-lg text-center">
                                <p className="font-medium text-amber-700 dark:text-amber-300">Operational</p>
                                <p className="text-[10px] text-amber-600 dark:text-amber-400">Curriculum</p>
                            </div>
                        </div>
                        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-3">
                            ↺ Feedback loops from practice reshape all levels
                        </p>
                    </div>

                    {/* Layer Definitions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                            <h4 className="text-xs font-semibold text-purple-700 dark:text-purple-300 mb-1">
                                💭 Philosophy
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                                Foundational worldview and values that inform education.
                                Answers: Why educate? What is worthwhile knowledge?
                            </p>
                        </div>
                        <div className="p-3 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                            <h4 className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1">
                                📐 Conception
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                                Translates philosophical priorities into curriculum language.
                                Defines what curriculum is for in institutional settings.
                            </p>
                        </div>
                        <div className="p-3 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                            <h4 className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-1">
                                🏗️ Design Types
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                                Operationalizes how learning is organized—scope, sequence,
                                and integration. The visible architecture of curriculum.
                            </p>
                        </div>
                    </div>

                    {/* Key Principle */}
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <p className="text-xs text-blue-700 dark:text-blue-300 text-center">
                            <strong>Key Principle:</strong> Not one-way and not fixed mappings.
                            Influences flow bidirectionally, and operational realities reshape conceptions over time.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
