'use client';

import { PosthumanActor } from '@/contexts/LensContext';

// ───────────────────────────────────────────────────────────
// Posthuman Actor Card
// ───────────────────────────────────────────────────────────

interface PosthumanActorCardProps {
    actor: PosthumanActor;
    expanded?: boolean;
    onToggleExpand?: () => void;
}

export default function PosthumanActorCard({
    actor,
    expanded = false,
    onToggleExpand
}: PosthumanActorCardProps) {

    const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
        material: {
            bg: 'bg-violet-50 dark:bg-violet-900/20',
            border: 'border-violet-200 dark:border-violet-800',
            text: 'text-violet-700 dark:text-violet-300',
        },
        technological: {
            bg: 'bg-blue-50 dark:bg-blue-900/20',
            border: 'border-blue-200 dark:border-blue-800',
            text: 'text-blue-700 dark:text-blue-300',
        },
        temporal: {
            bg: 'bg-amber-50 dark:bg-amber-900/20',
            border: 'border-amber-200 dark:border-amber-800',
            text: 'text-amber-700 dark:text-amber-300',
        },
        affective: {
            bg: 'bg-pink-50 dark:bg-pink-900/20',
            border: 'border-pink-200 dark:border-pink-800',
            text: 'text-pink-700 dark:text-pink-300',
        },
        ecological: {
            bg: 'bg-emerald-50 dark:bg-emerald-900/20',
            border: 'border-emerald-200 dark:border-emerald-800',
            text: 'text-emerald-700 dark:text-emerald-300',
        },
    };

    const colors = categoryColors[actor.category] || categoryColors.material;

    return (
        <div
            className={`
                rounded-xl border-2 ${colors.border} ${colors.bg}
                transition-all duration-200
                ${expanded ? 'shadow-lg' : 'shadow-sm hover:shadow-md'}
            `}
        >
            {/* Header */}
            <button
                onClick={onToggleExpand}
                className="w-full px-4 py-3 flex items-center gap-3 text-left"
            >
                {/* Icon */}
                <span className="text-2xl">{actor.icon}</span>

                {/* Title */}
                <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold ${colors.text}`}>
                        {actor.label}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {actor.definition}
                    </p>
                </div>

                {/* Expand indicator */}
                <span className={`
                    text-slate-400 transition-transform duration-200
                    ${expanded ? 'rotate-180' : ''}
                `}>
                    ▼
                </span>
            </button>

            {/* Expanded Content */}
            {expanded && (
                <div className="px-4 pb-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                    {/* Agency Framing */}
                    <div className="bg-white/60 dark:bg-slate-800/40 rounded-lg p-3">
                        <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                            "{actor.agency_framing}"
                        </p>
                    </div>

                    {/* Examples */}
                    <div>
                        <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                            Examples
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                            {actor.examples.map((example, i) => (
                                <span
                                    key={i}
                                    className="px-2 py-0.5 text-xs bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-full text-slate-600 dark:text-slate-400"
                                >
                                    {example}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Common Influences */}
                    <div>
                        <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                            Common Influences
                        </h4>
                        <ul className="space-y-1.5">
                            {actor.common_influences.map((influence, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                                >
                                    <span className="text-xs mt-0.5" style={{ color: actor.color }}>●</span>
                                    <span>{influence}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

// ───────────────────────────────────────────────────────────
// Compact Posthuman Actor Chip
// ───────────────────────────────────────────────────────────

interface PosthumanActorChipProps {
    actor: PosthumanActor;
    onClick?: () => void;
}

export function PosthumanActorChip({ actor, onClick }: PosthumanActorChipProps) {
    return (
        <button
            onClick={onClick}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border transition-all hover:scale-105"
            style={{
                backgroundColor: `${actor.color}15`,
                borderColor: `${actor.color}40`,
                color: actor.color,
            }}
        >
            <span>{actor.icon}</span>
            <span>{actor.label}</span>
        </button>
    );
}

// ───────────────────────────────────────────────────────────
// Posthuman Actor Grid
// ───────────────────────────────────────────────────────────

interface PosthumanActorGridProps {
    actors: PosthumanActor[];
}

export function PosthumanActorGrid({ actors }: PosthumanActorGridProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    return (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {actors.map(actor => (
                <PosthumanActorCard
                    key={actor.id}
                    actor={actor}
                    expanded={expandedId === actor.id}
                    onToggleExpand={() => setExpandedId(
                        expandedId === actor.id ? null : actor.id
                    )}
                />
            ))}
        </div>
    );
}

// Need to import useState for the grid
import { useState } from 'react';
