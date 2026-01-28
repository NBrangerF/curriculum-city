'use client';

import { useLens, type MainViewDeclaration } from '@/contexts/LensContext';
import Link from 'next/link';

// ───────────────────────────────────────────────────────────
// PosthumanView - A standalone conceptual view for the posthuman lens
// This replaces the canonical Sankey map when the lens is active
// ───────────────────────────────────────────────────────────

export default function PosthumanView() {
    const { lensData, isLoading } = useLens();

    if (isLoading || !lensData) {
        return (
            <div className="min-h-[600px] flex items-center justify-center">
                <div className="animate-pulse text-violet-400">
                    <span className="text-4xl">🔮</span>
                </div>
            </div>
        );
    }

    const { main_view, philosophical_orientation, design_implications } = lensData;

    return (
        <div className="min-h-[80vh] bg-gradient-to-br from-slate-950 via-violet-950/30 to-slate-950 text-white overflow-hidden relative">
            {/* Subtle background pattern - web/network metaphor */}
            <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" className="absolute inset-0">
                    <defs>
                        <pattern id="web-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <circle cx="50" cy="50" r="1" fill="currentColor" className="text-violet-400" />
                            <line x1="50" y1="50" x2="100" y2="0" stroke="currentColor" strokeWidth="0.5" className="text-violet-400/30" />
                            <line x1="50" y1="50" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-violet-400/30" />
                            <line x1="50" y1="50" x2="0" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-violet-400/30" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#web-pattern)" />
                </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
                {/* Header */}
                <header className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm mb-6">
                        <span>🔮</span>
                        <span>Posthuman Lens Active</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
                        {main_view?.title || 'Curriculum as Entanglement'}
                    </h1>
                    <p className="text-lg text-violet-300/80 italic">
                        {main_view?.subtitle || 'A posthuman perspective'}
                    </p>
                </header>

                {/* Declarations */}
                <section className="mb-16 space-y-8">
                    {main_view?.declarations?.map((decl, i) => (
                        <div
                            key={i}
                            className="group"
                            style={{ animationDelay: `${i * 150}ms` }}
                        >
                            <blockquote className="text-xl md:text-2xl font-light text-white/90 mb-2">
                                "{decl.statement}"
                            </blockquote>
                            <p className="text-sm text-violet-300/70 pl-4 border-l-2 border-violet-500/30">
                                {decl.elaboration}
                            </p>
                        </div>
                    ))}
                </section>

                {/* Key Shifts */}
                <section className="mb-16">
                    <h2 className="text-xs uppercase tracking-widest text-violet-400 mb-6 text-center">
                        Epistemic Shifts
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {philosophical_orientation?.key_shifts?.map((shift, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10"
                            >
                                <span className="text-violet-400/50 text-sm">from</span>
                                <span className="text-white/60 line-through decoration-violet-500/50">{shift.from}</span>
                                <span className="text-violet-400">→</span>
                                <span className="text-white font-medium">{shift.to}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Exploratory Questions */}
                <section className="mb-16">
                    <h2 className="text-xs uppercase tracking-widest text-violet-400 mb-6 text-center">
                        Questions This Lens Invites
                    </h2>
                    <div className="space-y-3">
                        {main_view?.exploratory_questions?.map((q, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 text-violet-200/80"
                            >
                                <span className="text-violet-500 mt-1">?</span>
                                <span className="italic">{q}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Closing Reflection */}
                <section className="text-center mb-16">
                    <p className="text-sm text-violet-300/60 max-w-2xl mx-auto leading-relaxed">
                        {main_view?.closing_reflection}
                    </p>
                </section>

                {/* Navigation to Actors */}
                <footer className="text-center">
                    <Link
                        href="/actors"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/30 text-violet-200 transition-colors"
                    >
                        <span>Explore More-than-Human Actors</span>
                        <span>→</span>
                    </Link>
                </footer>

                {/* Epistemic Disclaimer */}
                <p className="mt-12 text-xs text-center text-violet-400/40 italic">
                    This lens is analytical, not prescriptive. A way of seeing, not a final answer.
                </p>
            </div>
        </div>
    );
}
