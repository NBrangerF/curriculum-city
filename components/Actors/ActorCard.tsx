'use client';

import type { ActorLevel } from '@/data/schema/actor.schema';

interface Actor {
    id: string;
    label: string;
    level: ActorLevel;
    roleDescription: string;
    power?: string;
    concerns?: string[];
    artifacts?: string[];
}

interface ActorCardProps {
    actor: Actor;
    isSelected?: boolean;
    onClick?: () => void;
}

const LEVEL_CONFIG: Record<ActorLevel, { label: string; icon: string; color: string }> = {
    supra: { label: 'Supra', icon: '🌐', color: 'pink' },
    macro: { label: 'Macro', icon: '🏛️', color: 'violet' },
    meso: { label: 'Meso', icon: '🏫', color: 'cyan' },
    micro: { label: 'Micro', icon: '👩‍🏫', color: 'emerald' },
    nano: { label: 'Nano', icon: '👦', color: 'amber' },
};

export default function ActorCard({ actor, isSelected, onClick }: ActorCardProps) {
    const config = LEVEL_CONFIG[actor.level];

    return (
        <article
            onClick={onClick}
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer hover:shadow-md ${isSelected
                    ? `border-${config.color}-500 bg-${config.color}-50 dark:bg-${config.color}-900/20 shadow-md`
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
        >
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
                {actor.power && (
                    <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                        Power: {actor.power}
                    </span>
                )}
            </div>

            {/* Role Description */}
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                {actor.roleDescription || 'Role description not available.'}
            </p>

            {/* Concerns */}
            {actor.concerns && actor.concerns.length > 0 && (
                <div className="mb-3">
                    <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">
                        Primary Concerns
                    </h4>
                    <div className="flex flex-wrap gap-1">
                        {actor.concerns.slice(0, 4).map((concern, i) => (
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

            {/* Artifacts/Levers */}
            {actor.artifacts && actor.artifacts.length > 0 && (
                <div>
                    <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">
                        Typical Levers
                    </h4>
                    <div className="flex flex-wrap gap-1">
                        {actor.artifacts.slice(0, 3).map((artifact, i) => (
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

            {/* Interaction hint */}
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[10px] text-slate-400 dark:text-slate-500 italic">
                    Interacts with actors above and below in the system
                </p>
            </div>
        </article>
    );
}
