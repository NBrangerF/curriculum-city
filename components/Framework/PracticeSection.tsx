'use client';

import type { PracticeExample } from '@/lib/framework/loadFramework';

interface PracticeSectionProps {
    examples?: PracticeExample[];
    planningPractices?: string[];
    instructionPractices?: string[];
    assessmentPractices?: string[];
}

export default function PracticeSection({
    examples,
    planningPractices,
    instructionPractices,
    assessmentPractices,
}: PracticeSectionProps) {
    // Aggregate practices from examples if not provided directly
    const allPlanning = planningPractices ||
        examples?.flatMap(ex => ex.planning_practices || []) || [];
    const allInstruction = instructionPractices ||
        examples?.flatMap(ex => ex.instruction_practices || []) || [];
    const allAssessment = assessmentPractices ||
        examples?.flatMap(ex => ex.assessment_practices || []) || [];

    const hasPractices = allPlanning.length > 0 || allInstruction.length > 0 || allAssessment.length > 0;
    const hasExamples = examples && examples.length > 0;

    if (!hasPractices && !hasExamples) {
        return (
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                    Practice examples coming soon.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Practice Examples as Cards */}
            {hasExamples && (
                <div className="space-y-3">
                    {examples.map((ex, i) => (
                        <PracticeCard key={ex.id || i} example={ex} />
                    ))}
                </div>
            )}

            {/* Aggregated Practices */}
            {hasPractices && !hasExamples && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {allPlanning.length > 0 && (
                        <PracticeCategory
                            title="Planning"
                            icon="📋"
                            color="blue"
                            practices={allPlanning}
                        />
                    )}
                    {allInstruction.length > 0 && (
                        <PracticeCategory
                            title="Instruction"
                            icon="🎓"
                            color="green"
                            practices={allInstruction}
                        />
                    )}
                    {allAssessment.length > 0 && (
                        <PracticeCategory
                            title="Assessment"
                            icon="📊"
                            color="orange"
                            practices={allAssessment}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

function PracticeCard({ example }: { example: PracticeExample }) {
    return (
        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
            {/* Title & One-liner */}
            {example.title && (
                <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-1">
                    {example.title}
                </h4>
            )}
            {example.one_liner && (
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                    {example.one_liner}
                </p>
            )}

            {/* Practice Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                {(example.planning_practices?.length || example.planning) && (
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-100 dark:border-blue-800">
                        <span className="font-medium text-blue-700 dark:text-blue-300 block mb-1">
                            📋 Planning
                        </span>
                        <ul className="text-slate-700 dark:text-slate-300 space-y-0.5">
                            {(example.planning_practices || [example.planning]).filter(Boolean).slice(0, 3).map((p, i) => (
                                <li key={i} className="line-clamp-2">• {p}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {(example.instruction_practices?.length || example.instruction) && (
                    <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-100 dark:border-green-800">
                        <span className="font-medium text-green-700 dark:text-green-300 block mb-1">
                            🎓 Instruction
                        </span>
                        <ul className="text-slate-700 dark:text-slate-300 space-y-0.5">
                            {(example.instruction_practices || [example.instruction]).filter(Boolean).slice(0, 3).map((p, i) => (
                                <li key={i} className="line-clamp-2">• {p}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {(example.assessment_practices?.length || example.assessment) && (
                    <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded border border-orange-100 dark:border-orange-800">
                        <span className="font-medium text-orange-700 dark:text-orange-300 block mb-1">
                            📊 Assessment
                        </span>
                        <ul className="text-slate-700 dark:text-slate-300 space-y-0.5">
                            {(example.assessment_practices || [example.assessment]).filter(Boolean).slice(0, 3).map((p, i) => (
                                <li key={i} className="line-clamp-2">• {p}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Signals */}
            {example.signals && example.signals.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                    {example.signals.slice(0, 4).map((s, i) => (
                        <span
                            key={i}
                            className="text-[10px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded"
                        >
                            {s}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

function PracticeCategory({
    title,
    icon,
    color,
    practices,
}: {
    title: string;
    icon: string;
    color: 'blue' | 'green' | 'orange';
    practices: string[];
}) {
    const colors = {
        blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300',
        green: 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800 text-green-700 dark:text-green-300',
        orange: 'bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800 text-orange-700 dark:text-orange-300',
    };

    return (
        <div className={`p-3 rounded-lg border ${colors[color]}`}>
            <h4 className="text-xs font-semibold uppercase mb-2">
                {icon} {title}
            </h4>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                {practices.slice(0, 5).map((p, i) => (
                    <li key={i} className="line-clamp-2">• {p}</li>
                ))}
            </ul>
        </div>
    );
}
