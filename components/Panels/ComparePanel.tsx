'use client';

import { useState } from 'react';
import type { EntityLayer } from '@/data/schema/entity.schema';

interface ComparableEntity {
    id: string;
    label: string;
    layer: EntityLayer;
    definition: string;
    data: Record<string, unknown>;
}

interface ComparePanelProps {
    selectedEntities: ComparableEntity[];
    onClose: () => void;
    onClearSelection: () => void;
    onRemoveEntity: (id: string) => void;
}

export default function ComparePanel({
    selectedEntities,
    onClose,
    onClearSelection,
    onRemoveEntity,
}: ComparePanelProps) {
    const hasSelection = selectedEntities.length > 0;
    const canCompare = selectedEntities.length >= 2;

    // Group by layer for comparison
    const sameLayer = selectedEntities.length >= 2 &&
        selectedEntities.every(e => e.layer === selectedEntities[0].layer);

    const layerColors: Record<EntityLayer, string> = {
        philosophy: 'purple',
        conception: 'blue',
        design: 'emerald',
    };

    return (
        <div className="h-full overflow-y-auto bg-white dark:bg-slate-900">
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-4 z-10">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full mb-2 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                            Compare Mode
                        </span>
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                            Compare Concepts
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            Select 2-4 concepts from the same layer to compare
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                        ✕
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-6">
                {/* Instructions */}
                {!hasSelection && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
                            How to Compare
                        </h3>
                        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                            <li>• Click on concepts in the left panel to select them</li>
                            <li>• Select 2-4 concepts from the same layer</li>
                            <li>• Compare philosophies, conceptions, or design types</li>
                            <li>• See differences in definition, aims, and pedagogy</li>
                        </ul>
                    </div>
                )}

                {/* Layer mismatch warning */}
                {hasSelection && !sameLayer && selectedEntities.length >= 2 && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                        <p className="text-sm text-amber-700 dark:text-amber-300">
                            ⚠️ For best comparison, select concepts from the same layer
                            (e.g., philosophy vs philosophy).
                        </p>
                    </div>
                )}

                {/* Selected Entities */}
                {hasSelection && (
                    <section>
                        <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
                            Selected Concepts ({selectedEntities.length}/4)
                        </h3>
                        <div className="space-y-2">
                            {selectedEntities.map((entity) => {
                                const color = layerColors[entity.layer];
                                return (
                                    <div
                                        key={entity.id}
                                        className={`flex items-center justify-between p-2 bg-${color}-50 dark:bg-${color}-900/20 border border-${color}-200 dark:border-${color}-800 rounded-lg`}
                                    >
                                        <div>
                                            <span className={`inline-block px-1.5 py-0.5 text-[10px] font-medium rounded mr-2 bg-${color}-100 dark:bg-${color}-900/50 text-${color}-700 dark:text-${color}-300`}>
                                                {entity.layer}
                                            </span>
                                            <span className="text-sm text-slate-700 dark:text-slate-300">
                                                {entity.label}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => onRemoveEntity(entity.id)}
                                            className="text-slate-400 hover:text-red-500 text-sm"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* Comparison Table */}
                {canCompare && sameLayer && (
                    <section>
                        <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
                            Comparison
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800">
                                        <th className="text-left p-2 font-medium text-slate-600 dark:text-slate-400 w-24">
                                            Aspect
                                        </th>
                                        {selectedEntities.slice(0, 4).map((entity) => (
                                            <th
                                                key={entity.id}
                                                className="text-left p-2 font-medium text-slate-700 dark:text-slate-300"
                                            >
                                                {entity.label}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Definition */}
                                    <tr className="border-t border-slate-100 dark:border-slate-800">
                                        <td className="p-2 font-medium text-slate-600 dark:text-slate-400 align-top">
                                            Definition
                                        </td>
                                        {selectedEntities.slice(0, 4).map((entity) => (
                                            <td key={entity.id} className="p-2 text-slate-700 dark:text-slate-300 text-xs align-top">
                                                {entity.definition.slice(0, 150)}...
                                            </td>
                                        ))}
                                    </tr>

                                    {/* Aims/Primary Function */}
                                    <tr className="border-t border-slate-100 dark:border-slate-800">
                                        <td className="p-2 font-medium text-slate-600 dark:text-slate-400 align-top">
                                            Core Focus
                                        </td>
                                        {selectedEntities.slice(0, 4).map((entity) => {
                                            const data = entity.data;
                                            const focus = (data.aims as string[])?.[0] ||
                                                data.primary_function as string ||
                                                '—';
                                            return (
                                                <td key={entity.id} className="p-2 text-slate-700 dark:text-slate-300 text-xs align-top">
                                                    {typeof focus === 'string' ? focus.slice(0, 80) : '—'}
                                                </td>
                                            );
                                        })}
                                    </tr>

                                    {/* Pedagogy Bias */}
                                    <tr className="border-t border-slate-100 dark:border-slate-800">
                                        <td className="p-2 font-medium text-slate-600 dark:text-slate-400 align-top">
                                            Pedagogy
                                        </td>
                                        {selectedEntities.slice(0, 4).map((entity) => {
                                            const pedagogy = (entity.data.pedagogy_bias as string[])?.slice(0, 2) || [];
                                            return (
                                                <td key={entity.id} className="p-2 text-slate-700 dark:text-slate-300 text-xs align-top">
                                                    {pedagogy.length > 0 ? pedagogy.join(', ') : '—'}
                                                </td>
                                            );
                                        })}
                                    </tr>

                                    {/* Evidence Standard */}
                                    <tr className="border-t border-slate-100 dark:border-slate-800">
                                        <td className="p-2 font-medium text-slate-600 dark:text-slate-400 align-top">
                                            Evidence
                                        </td>
                                        {selectedEntities.slice(0, 4).map((entity) => {
                                            const evidence = (entity.data.evidence_standard as string[])?.slice(0, 2) || [];
                                            return (
                                                <td key={entity.id} className="p-2 text-slate-700 dark:text-slate-300 text-xs align-top">
                                                    {evidence.length > 0 ? evidence.join(', ') : '—'}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}

                {/* Actions */}
                {hasSelection && (
                    <section className="space-y-3">
                        <button
                            onClick={onClearSelection}
                            className="btn-secondary w-full"
                        >
                            Clear Selection
                        </button>
                    </section>
                )}

                {/* Note */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 text-center italic">
                        Compare mode is for conceptual understanding only.
                        Real curriculum often hybridizes multiple approaches.
                    </p>
                </div>
            </div>
        </div>
    );
}
