'use client';

import { useLens } from '@/contexts/LensContext';

// ───────────────────────────────────────────────────────────
// Lens Toggle Component
// ───────────────────────────────────────────────────────────

interface LensToggleProps {
    compact?: boolean;
    showLabel?: boolean;
}

export default function LensToggle({ compact = false, showLabel = true }: LensToggleProps) {
    const { lensMode, toggleLens, lensData, isLoading } = useLens();

    const isPosthuman = lensMode === 'posthuman';

    if (isLoading) {
        return (
            <div className="h-8 w-24 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
        );
    }

    const tooltip = lensData?.ui_guidance.lens_toggle.tooltip ||
        'Switch to an analytical lens that attends to more-than-human relations';

    return (
        <div className="flex items-center gap-2" title={tooltip}>
            {showLabel && !compact && (
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Lens:
                </span>
            )}

            <button
                onClick={toggleLens}
                className={`
                    relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg
                    text-xs font-medium transition-all duration-300
                    border
                    ${isPosthuman
                        ? 'bg-gradient-to-r from-violet-500/10 to-indigo-500/10 dark:from-violet-500/20 dark:to-indigo-500/20 border-violet-300 dark:border-violet-600 text-violet-700 dark:text-violet-300 shadow-sm shadow-violet-500/10'
                        : 'bg-slate-100/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200/80 dark:hover:bg-slate-700/80'
                    }
                `}
                aria-pressed={isPosthuman}
                aria-label={`Current lens: ${isPosthuman ? 'Posthuman' : 'Human-Centered'}. Click to toggle.`}
            >
                {/* Icon */}
                <span className={`text-sm ${isPosthuman ? 'animate-pulse' : ''}`}>
                    {isPosthuman ? '🔮' : '👤'}
                </span>

                {/* Label */}
                {showLabel && (
                    <span className={compact ? 'sr-only' : ''}>
                        {isPosthuman ? 'Posthuman' : 'Human-Centered'}
                    </span>
                )}

                {/* Active indicator */}
                {isPosthuman && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
                )}
            </button>
        </div>
    );
}

// ───────────────────────────────────────────────────────────
// Lens Badge Component (for inline use)
// ───────────────────────────────────────────────────────────

export function LensBadge() {
    const { isPosthumanLens } = useLens();

    if (!isPosthumanLens) return null;

    return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded">
            <span>🔮</span>
            <span>Posthuman Lens</span>
        </span>
    );
}

// ───────────────────────────────────────────────────────────
// Lens Indicator (minimal)
// ───────────────────────────────────────────────────────────

export function LensIndicator() {
    const { isPosthumanLens } = useLens();

    if (!isPosthumanLens) return null;

    return (
        <div className="flex items-center gap-1.5 text-xs text-violet-600 dark:text-violet-400">
            <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse" />
            <span className="font-medium">Posthuman lens active</span>
        </div>
    );
}
