'use client';

import { useLens } from '@/contexts/LensContext';
import Link from 'next/link';

// ───────────────────────────────────────────────────────────
// PosthumanConceptsView - A standalone view for Concepts when posthuman lens is active
// This replaces the taxonomy sidebar and entity detail when the lens is active
// ───────────────────────────────────────────────────────────

export default function PosthumanConceptsView() {
    const { lensData, isLoading } = useLens();

    if (isLoading || !lensData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <div className="animate-pulse text-violet-400">
                    <span className="text-4xl">🔮</span>
                </div>
            </div>
        );
    }

    const { philosophical_orientation, design_implications, main_view } = lensData;

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-violet-950/20 to-slate-950 text-white">
            <div className="max-w-4xl mx-auto px-6 py-16">
                {/* Header */}
                <header className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm mb-6">
                        <span>🔮</span>
                        <span>Posthuman Perspective</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
                        Beyond Taxonomy
                    </h1>
                    <p className="text-base text-violet-300/70 max-w-2xl mx-auto leading-relaxed">
                        The canonical lens organizes curriculum into philosophies, conceptions, and design types.
                        This perspective temporarily withholds that structure—to see differently.
                    </p>
                </header>

                {/* Key Insight: Curriculum as Entanglement */}
                <section className="mb-16 p-6 rounded-xl bg-gradient-to-r from-violet-900/30 to-indigo-900/30 border border-violet-500/20">
                    <h2 className="text-xs uppercase tracking-widest text-violet-400 mb-4">
                        Core Reframing
                    </h2>
                    <blockquote className="text-xl md:text-2xl font-light text-white/90 mb-4">
                        "{philosophical_orientation?.curriculum_as}"
                    </blockquote>
                    <p className="text-sm text-violet-300/60 italic">
                        Viewed through a posthuman lens, curriculum is not a stable object to be categorized.
                    </p>
                </section>

                {/* What This Lens Suspends */}
                <section className="mb-16">
                    <h2 className="text-xs uppercase tracking-widest text-violet-400 mb-6 text-center">
                        What This Lens Suspends
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center">
                            <span className="text-2xl mb-2 block opacity-50">💭</span>
                            <p className="text-sm text-white/60">Fixed philosophical categories</p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center">
                            <span className="text-2xl mb-2 block opacity-50">📐</span>
                            <p className="text-sm text-white/60">Mappable conceptions</p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center">
                            <span className="text-2xl mb-2 block opacity-50">🏗️</span>
                            <p className="text-sm text-white/60">Designable systems</p>
                        </div>
                    </div>
                    <p className="text-xs text-violet-400/50 text-center mt-4 italic">
                        Not because they are wrong, but to create space for different questions.
                    </p>
                </section>

                {/* Design as Negotiation */}
                <section className="mb-16">
                    <h2 className="text-xs uppercase tracking-widest text-violet-400 mb-6 text-center">
                        {design_implications?.principle}
                    </h2>
                    <div className="space-y-3">
                        {design_implications?.guidance?.map((item: string, i: number) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 p-3 rounded-lg bg-white/5"
                            >
                                <span className="text-violet-400 mt-0.5">◇</span>
                                <span className="text-violet-200/80 text-sm">{item}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Questions for Designers */}
                <section className="mb-16">
                    <h2 className="text-xs uppercase tracking-widest text-violet-400 mb-6 text-center">
                        Questions for Designers
                    </h2>
                    <div className="space-y-3">
                        {design_implications?.questions_for_designers?.map((q: string, i: number) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 text-violet-200/70"
                            >
                                <span className="text-violet-500 mt-1 font-bold">?</span>
                                <span className="italic">{q}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Return to Canonical */}
                <section className="text-center">
                    <p className="text-xs text-violet-300/40 mb-6">
                        Toggle the lens off to return to the canonical taxonomy view.
                    </p>
                    <Link
                        href="/actors"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/30 text-violet-200 transition-colors"
                    >
                        <span>Explore More-than-Human Actors</span>
                        <span>→</span>
                    </Link>
                </section>

                {/* Epistemic Disclaimer */}
                <p className="mt-16 text-xs text-center text-violet-400/40 italic max-w-xl mx-auto">
                    This lens is designed to unsettle, not to replace. Its success is measured by the questions it opens,
                    the assumptions it exposes, and the certainty it productively disrupts.
                </p>
            </div>
        </div>
    );
}
