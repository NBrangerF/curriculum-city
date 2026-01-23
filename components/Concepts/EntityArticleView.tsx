'use client';

import type { EntityLayer } from '@/data/schema/entity.schema';

interface ConceptEntity {
    id: string;
    label: string;
    layer: EntityLayer;
    definition: string;
    data: Record<string, unknown>;
}

interface EntityArticleViewProps {
    entity: ConceptEntity | null;
}

export default function EntityArticleView({ entity }: EntityArticleViewProps) {
    if (!entity) {
        return (
            <div className="h-full flex items-center justify-center p-8">
                <div className="text-center max-w-md">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <span className="text-2xl">📚</span>
                    </div>
                    <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Select a Concept
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Choose an educational philosophy, curriculum conception, or design type
                        from the sidebar to view its details.
                    </p>
                </div>
            </div>
        );
    }

    const data = entity.data;
    const layerLabels: Record<EntityLayer, string> = {
        philosophy: 'Educational Philosophy',
        conception: 'Curriculum Conception',
        design: 'Design Type',
    };
    const layerColors: Record<EntityLayer, string> = {
        philosophy: 'purple',
        conception: 'blue',
        design: 'emerald',
    };
    const color = layerColors[entity.layer];

    // Extract fields from data
    const aims = data.aims as string[] | undefined;
    const ends = data.ends as string[] | undefined;
    const primaryFunction = data.primary_function as string | undefined;
    const contentPrinciple = data.content_principle as string[] | undefined;
    const pedagogyBias = (data.pedagogy_bias || data.means_bias) as string[] | undefined;
    const evidenceStandard = data.evidence_standard as string[] | undefined;
    const commonTensions = data.common_tensions as string[] | undefined;

    // Practice examples
    const planningExamples = data.planning_examples as string[] | undefined;
    const instructionExamples = data.instruction_examples as string[] | undefined;
    const assessmentExamples = data.assessment_examples as string[] | undefined;

    // Related concepts
    const compatibilities = data.compatibilities as Record<string, string[]> | undefined;

    return (
        <article className="h-full overflow-y-auto">
            {/* Header */}
            <header className={`sticky top-0 z-10 bg-gradient-to-r from-${color}-50 to-white dark:from-${color}-900/20 dark:to-slate-900 border-b border-${color}-200 dark:border-${color}-800 p-6`}>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full bg-${color}-100 dark:bg-${color}-900/50 text-${color}-700 dark:text-${color}-300 mb-2`}>
                    {layerLabels[entity.layer]}
                </span>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {entity.label}
                </h1>
            </header>

            {/* Content */}
            <div className="p-6 space-y-8">
                {/* Definition - PROMINENT */}
                <section>
                    <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                        Definition
                    </h2>
                    <div className={`p-4 rounded-lg bg-${color}-50 dark:bg-${color}-900/10 border border-${color}-200 dark:border-${color}-800`}>
                        <p className="text-base text-slate-800 dark:text-slate-200 leading-relaxed">
                            {entity.definition || 'No definition available.'}
                        </p>
                    </div>
                </section>

                {/* Key Fields Grid */}
                <section>
                    <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                        Key Characteristics
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Aims */}
                        {aims && aims.length > 0 && (
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-2">
                                    Aims
                                </h3>
                                <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                                    {aims.map((a, i) => <li key={i}>• {a}</li>)}
                                </ul>
                            </div>
                        )}

                        {/* Ends */}
                        {ends && ends.length > 0 && (
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-2">
                                    Ends (Outcomes)
                                </h3>
                                <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                                    {ends.map((e, i) => <li key={i}>• {e}</li>)}
                                </ul>
                            </div>
                        )}

                        {/* Primary Function */}
                        {primaryFunction && (
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-2">
                                    Primary Function
                                </h3>
                                <p className="text-sm text-slate-700 dark:text-slate-300">{primaryFunction}</p>
                            </div>
                        )}

                        {/* Content Principle */}
                        {contentPrinciple && contentPrinciple.length > 0 && (
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-2">
                                    Content Principle
                                </h3>
                                <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                                    {contentPrinciple.map((c, i) => <li key={i}>• {c}</li>)}
                                </ul>
                            </div>
                        )}

                        {/* Pedagogy Bias */}
                        {pedagogyBias && pedagogyBias.length > 0 && (
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-2">
                                    Pedagogy Bias
                                </h3>
                                <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                                    {pedagogyBias.map((p, i) => <li key={i}>• {p}</li>)}
                                </ul>
                            </div>
                        )}

                        {/* Evidence Standard */}
                        {evidenceStandard && evidenceStandard.length > 0 && (
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-2">
                                    Evidence Standard
                                </h3>
                                <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                                    {evidenceStandard.map((e, i) => <li key={i}>• {e}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                </section>

                {/* Common Tensions */}
                {commonTensions && commonTensions.length > 0 && (
                    <section>
                        <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                            Common Tensions
                        </h2>
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg">
                            <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
                                {commonTensions.map((t, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-amber-500">⚡</span>
                                        <span>{t}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}

                {/* Practice Examples */}
                <section>
                    <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                        Practice Examples
                    </h2>
                    <PracticeExamplesTabs
                        planning={planningExamples}
                        instruction={instructionExamples}
                        assessment={assessmentExamples}
                    />
                </section>

                {/* Related Concepts */}
                {compatibilities && Object.keys(compatibilities).length > 0 && (
                    <section>
                        <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                            Related Concepts
                        </h2>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                            {Object.entries(compatibilities).map(([key, values]) => (
                                <div key={key} className="mb-3 last:mb-0">
                                    <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                                        {key.replace(/_/g, ' ')}
                                    </h4>
                                    <div className="flex flex-wrap gap-1">
                                        {values.map((v, i) => (
                                            <span
                                                key={i}
                                                className="text-xs px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded"
                                            >
                                                {v}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <p className="text-[10px] text-slate-400 mt-3 italic">
                                These are suggested associations, not deterministic mappings.
                            </p>
                        </div>
                    </section>
                )}

                {/* Disclaimer */}
                <footer className="pt-6 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center italic">
                        This is a conceptual lens; real curricula often hybridize across multiple approaches.
                    </p>
                </footer>
            </div>
        </article>
    );
}

// Practice Examples Tabs Component
function PracticeExamplesTabs({
    planning,
    instruction,
    assessment,
}: {
    planning?: string[];
    instruction?: string[];
    assessment?: string[];
}) {
    const hasExamples = (planning?.length || 0) + (instruction?.length || 0) + (assessment?.length || 0) > 0;

    if (!hasExamples) {
        return (
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    No practice examples available yet.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {planning && planning.length > 0 && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <h4 className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase mb-2">
                        📋 Planning
                    </h4>
                    <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                        {planning.map((p, i) => <li key={i}>• {p}</li>)}
                    </ul>
                </div>
            )}

            {instruction && instruction.length > 0 && (
                <div className="p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg">
                    <h4 className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase mb-2">
                        🎓 Instruction
                    </h4>
                    <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                        {instruction.map((inst, i) => <li key={i}>• {inst}</li>)}
                    </ul>
                </div>
            )}

            {assessment && assessment.length > 0 && (
                <div className="p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 rounded-lg">
                    <h4 className="text-xs font-semibold text-orange-700 dark:text-orange-300 uppercase mb-2">
                        📊 Assessment
                    </h4>
                    <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                        {assessment.map((a, i) => <li key={i}>• {a}</li>)}
                    </ul>
                </div>
            )}
        </div>
    );
}
