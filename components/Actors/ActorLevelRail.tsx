'use client';

import type { ActorLevel } from '@/data/schema/actor.schema';

interface ActorLevelRailProps {
    levels: ActorLevel[];
    selectedLevel: ActorLevel | 'all';
    onLevelSelect: (level: ActorLevel | 'all') => void;
}

const LEVEL_CONFIG: Record<ActorLevel, { label: string; icon: string; color: string }> = {
    supra: { label: 'Supra', icon: '🌐', color: 'pink' },
    macro: { label: 'Macro', icon: '🏛️', color: 'violet' },
    meso: { label: 'Meso', icon: '🏫', color: 'cyan' },
    micro: { label: 'Micro', icon: '👩‍🏫', color: 'emerald' },
    nano: { label: 'Nano', icon: '👦', color: 'amber' },
};

export default function ActorLevelRail({
    levels,
    selectedLevel,
    onLevelSelect,
}: ActorLevelRailProps) {
    return (
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1 p-2 overflow-x-auto">
                {/* All button */}
                <button
                    onClick={() => onLevelSelect('all')}
                    className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedLevel === 'all'
                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                >
                    All Levels
                </button>

                <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>

                {/* Level buttons */}
                {levels.map((level) => {
                    const config = LEVEL_CONFIG[level];
                    const isSelected = selectedLevel === level;

                    return (
                        <button
                            key={level}
                            onClick={() => onLevelSelect(level)}
                            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isSelected
                                    ? `bg-${config.color}-100 dark:bg-${config.color}-900/30 text-${config.color}-700 dark:text-${config.color}-300 ring-2 ring-${config.color}-500`
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                        >
                            <span>{config.icon}</span>
                            <span>{config.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Bidirectional arrows */}
            <div className="flex items-center justify-center gap-2 py-2 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400">Top-down</span>
                <span className="text-slate-400">↕</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Bottom-up</span>
                <span className="mx-2 text-slate-300">|</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 italic">
                    Curriculum emerges through interaction across all levels
                </span>
            </div>
        </div>
    );
}
