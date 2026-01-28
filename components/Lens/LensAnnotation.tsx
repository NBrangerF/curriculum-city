'use client';

import { useState } from 'react';
import { useLens, EntityAnnotation } from '@/contexts/LensContext';

// ───────────────────────────────────────────────────────────
// Lens Annotation Component
// ───────────────────────────────────────────────────────────

interface LensAnnotationProps {
    type: 'philosophy' | 'conception';
    entityId: string;
    className?: string;
}

export default function LensAnnotation({ type, entityId, className = '' }: LensAnnotationProps) {
    const { isPosthumanLens, getEntityAnnotation, lensData } = useLens();
    const [expanded, setExpanded] = useState(false);

    if (!isPosthumanLens) return null;

    const annotation = getEntityAnnotation(type, entityId);
    if (!annotation) return null;

    const prefix = lensData?.ui_guidance.annotation_prefix || 'From a posthuman reading: ';

    return (
        <div className={`
            mt-4 rounded-xl border-2 border-violet-200 dark:border-violet-800 
            bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20
            overflow-hidden transition-all duration-300
            ${className}
        `}>
            {/* Header */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-violet-100/50 dark:hover:bg-violet-800/20 transition-colors"
            >
                <span className="text-lg">🔮</span>
                <span className="flex-1 text-sm font-medium text-violet-700 dark:text-violet-300">
                    Posthuman Reading
                </span>
                <span className={`
                    text-violet-400 text-xs transition-transform duration-200
                    ${expanded ? 'rotate-180' : ''}
                `}>
                    ▼
                </span>
            </button>

            {/* Content */}
            {expanded && (
                <div className="px-4 pb-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
                    {/* Main Reading */}
                    <div className="bg-white/60 dark:bg-slate-800/40 rounded-lg p-3">
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                            <span className="not-italic text-violet-600 dark:text-violet-400 font-medium">
                                {prefix}
                            </span>
                            {annotation.posthuman_reading}
                        </p>
                    </div>

                    {/* Hidden Actors */}
                    {annotation.hidden_actors && annotation.hidden_actors.length > 0 && (
                        <div>
                            <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                                Overlooked Actors
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                                {annotation.hidden_actors.map((actor, i) => (
                                    <span
                                        key={i}
                                        className="px-2 py-0.5 text-xs bg-violet-100 dark:bg-violet-900/40 border border-violet-200 dark:border-violet-700 rounded-full text-violet-700 dark:text-violet-300"
                                    >
                                        {actor}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// ───────────────────────────────────────────────────────────
// Inline Lens Text Component
// ───────────────────────────────────────────────────────────

interface LensTextProps {
    children: string;
    className?: string;
}

export function LensText({ children, className = '' }: LensTextProps) {
    const { isPosthumanLens, transformText } = useLens();

    const displayText = isPosthumanLens ? transformText(children) : children;

    return (
        <span className={`${isPosthumanLens ? 'text-violet-700 dark:text-violet-300' : ''} ${className}`}>
            {displayText}
        </span>
    );
}

// ───────────────────────────────────────────────────────────
// Lens Callout Component
// ───────────────────────────────────────────────────────────

interface LensCalloutProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export function LensCallout({ title = 'Posthuman Perspective', children, className = '' }: LensCalloutProps) {
    const { isPosthumanLens } = useLens();

    if (!isPosthumanLens) return null;

    return (
        <div className={`
            rounded-lg border border-violet-200 dark:border-violet-800 
            bg-violet-50/50 dark:bg-violet-900/20 
            p-4
            ${className}
        `}>
            <div className="flex items-center gap-2 mb-2">
                <span>🔮</span>
                <h4 className="text-sm font-semibold text-violet-700 dark:text-violet-300">
                    {title}
                </h4>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {children}
            </div>
        </div>
    );
}
