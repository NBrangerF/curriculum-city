'use client';

import type { Entity, EntityType } from '@/lib/framework/loadFramework';
import PracticeSection from './PracticeSection';
import TensionsSection from './TensionsSection';

interface EntityDetailProps {
    entity: Entity | null;
}

const TYPE_CONFIG: Record<EntityType, { label: string; color: string; icon: string }> = {
    philosophy: { label: 'Educational Philosophy', color: 'purple', icon: '💭' },
    conception: { label: 'Curriculum Conception', color: 'blue', icon: '📐' },
    design: { label: 'Design Type', color: 'emerald', icon: '🏗️' },
};

export default function EntityDetail({ entity }: EntityDetailProps) {
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
                        Choose an item from the sidebar to explore its definition, characteristics, and practice examples.
                    </p>
                </div>
            </div>
        );
    }

    const config = TYPE_CONFIG[entity.type];

    return (
        <article className="h-full overflow-y-auto">
            {/* Header */}
            <header className={`sticky top-0 z-10 bg-gradient-to-r from-${config.color}-50 to-white dark:from-${config.color}-900/20 dark:to-slate-900 border-b border-${config.color}-200 dark:border-${config.color}-800 p-6`}>
                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-${config.color}-100 dark:bg-${config.color}-900/50 text-${config.color}-700 dark:text-${config.color}-300 mb-2`}>
                    <span>{config.icon}</span>
                    {config.label}
                </span>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {entity.label}
                </h1>
            </header>

            {/* Content */}
            <div className="p-6 space-y-6">
                {/* Definition */}
                <section>
                    <h2 className="sr-only">Definition</h2>
                    <div className={`p-4 rounded-lg bg-${config.color}-50 dark:bg-${config.color}-900/10 border border-${config.color}-200 dark:border-${config.color}-800`}>
                        <p className="text-base text-slate-800 dark:text-slate-200 leading-relaxed">
                            {entity.definition || 'Definition not yet available.'}
                        </p>
                    </div>
                </section>

                {/* Key Characteristics */}
                <KeyCharacteristics entity={entity} />

                {/* Tensions */}
                <TensionsSection tensions={entity.common_tensions} />

                {/* Practice Examples */}
                <section>
                    <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                        Practice Examples
                    </h2>
                    <PracticeSection
                        examples={entity.practice_examples}
                        planningPractices={entity._raw.planning_practices as string[]}
                        instructionPractices={entity._raw.instruction_practices as string[]}
                        assessmentPractices={entity._raw.assessment_practices as string[]}
                    />
                </section>

                {/* Related Concepts */}
                {entity.compatibilities && Object.keys(entity.compatibilities).length > 0 && (
                    <section>
                        <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                            Often Associated With
                        </h2>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                            {Object.entries(entity.compatibilities).map(([key, values]) => (
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
                                These are common associations, not fixed mappings. Real practice often hybridizes.
                            </p>
                        </div>
                    </section>
                )}

                {/* Subtypes for Design Types */}
                {entity.subtypes && entity.subtypes.length > 0 && (
                    <section>
                        <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                            Subtypes
                        </h2>
                        <div className="space-y-2">
                            {entity.subtypes.map((sub) => (
                                <div
                                    key={sub.id}
                                    className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700"
                                >
                                    <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                        {sub.label}
                                    </h4>
                                    {sub.best_fit_for && sub.best_fit_for.length > 0 && (
                                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                                            Best for: {sub.best_fit_for.join(', ')}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Footer */}
                <footer className="pt-6 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center italic">
                        This is a conceptual lens for sense-making. Real curricula often hybridize across multiple approaches.
                    </p>
                </footer>
            </div>
        </article>
    );
}

function KeyCharacteristics({ entity }: { entity: Entity }) {
    const fields: { label: string; value?: string | string[] }[] = [
        { label: 'Philosophical Basis', value: entity.philosophical_basis },
        { label: 'Aims', value: entity.aims },
        { label: 'Ends / Outcomes', value: entity.ends },
        { label: 'Primary Function', value: entity.primary_function },
        { label: 'Content Principle', value: entity.content_principle },
        { label: 'Pedagogy Bias', value: entity.pedagogy_bias || entity.means_bias },
        { label: 'Evidence Standard', value: entity.evidence_standard },
        { label: 'Best Fit For', value: entity.best_fit_for },
    ];

    const activeFields = fields.filter(f =>
        f.value && (Array.isArray(f.value) ? f.value.length > 0 : true)
    );

    if (activeFields.length === 0) return null;

    return (
        <section>
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                Key Characteristics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeFields.map((field, i) => (
                    <div
                        key={i}
                        className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700"
                    >
                        <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                            {field.label}
                        </h3>
                        {Array.isArray(field.value) ? (
                            <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-0.5">
                                {field.value.map((v, j) => (
                                    <li key={j}>• {v}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-slate-700 dark:text-slate-300">{field.value}</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
