'use client';

import { useEffect, useState } from 'react';
import CityFlowMap from './CityFlowMap';
import { useLens } from '@/contexts/LensContext';
import PosthumanView from '@/components/Lens/PosthumanView';

// ───────────────────────────────────────────────────────────
// Types matching framework.json structure
// ───────────────────────────────────────────────────────────

interface RawPhilosophy {
    id: string;
    label: string;
    common_tensions?: string[];
    compatibilities?: {
        curriculum_conceptions_preferred?: string[];
        design_types_often?: string[];
    };
}

interface RawConception {
    id: string;
    label: string;
    common_tensions?: string[];
    compatibilities?: {
        design_types?: string[];
    };
}

interface RawDesignType {
    id: string;
    label: string;
    subtypes?: { id: string; label: string }[];
}

interface RawActorType {
    actor: string;
    typical_power?: string;
    primary_concerns?: string[];
    typical_artifacts?: string[];
}

interface FrameworkData {
    entities?: {
        educational_philosophies?: RawPhilosophy[];
        curriculum_conceptions?: RawConception[];
        curriculum_design_types?: RawDesignType[];
    };
    axis_B_curriculum_making?: {
        actor_types?: RawActorType[];
        sites?: { [key: string]: { label: string; description: string } };
    };
}

interface FlowNode {
    id: string;
    label: string;
    column: 'charter' | 'brief' | 'scheme';
    tensions?: string[];
}

interface FlowConnection {
    from: string;
    to: string;
    strength: number;
}

// ───────────────────────────────────────────────────────────
// Helper: Infer actor's primary level based on their type
// ───────────────────────────────────────────────────────────

function inferActorLevel(actorId: string): string {
    const levelMap: Record<string, string> = {
        'policy_makers': 'macro',
        'assessment_bodies': 'macro',
        'textbook_publishers': 'macro',
        'curriculum_developers': 'meso',
        'school_leaders': 'meso',
        'department_heads': 'meso',
        'teachers': 'micro',
        'teaching_assistants': 'micro',
        'students': 'nano',
        'families': 'nano',
        'international_orgs': 'supra',
        'researchers': 'supra',
    };
    return levelMap[actorId] || 'meso';
}

// ───────────────────────────────────────────────────────────
// Main Hero Section
// ───────────────────────────────────────────────────────────

export default function HeroSection() {
    const [nodes, setNodes] = useState<FlowNode[]>([]);
    const [connections, setConnections] = useState<FlowConnection[]>([]);
    const [actors, setActors] = useState<{ id: string; label: string; level: string; concerns?: string[]; levers?: string[] }[]>([]);
    const [loading, setLoading] = useState(true);

    // Access lens context
    const { isPosthumanLens } = useLens();

    useEffect(() => {
        async function loadData() {
            try {
                const res = await fetch('/data/framework.json');
                const data: FrameworkData = await res.json();

                // Correct data paths
                const philosophies = data.entities?.educational_philosophies || [];
                const conceptions = data.entities?.curriculum_conceptions || [];
                const designTypes = data.entities?.curriculum_design_types || [];

                // Transform actor_types to match expected format
                const actorTypes = data.axis_B_curriculum_making?.actor_types || [];
                const sites = data.axis_B_curriculum_making?.sites || {};
                const siteKeys = Object.keys(sites);

                // Map actor types with their likely primary level, concerns, and levers
                const rawActors = actorTypes.map(a => ({
                    id: a.actor,
                    label: a.actor.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
                    level: inferActorLevel(a.actor),
                    concerns: a.primary_concerns,
                    levers: a.typical_artifacts,
                }));


                // Build nodes
                const flowNodes: FlowNode[] = [];

                // Charter column (Philosophies) - show key ones
                const keyPhilosophies = ['perennialism', 'essentialism', 'progressivism', 'reconstructionism', 'existential_humanistic'];
                philosophies
                    .filter(p => keyPhilosophies.includes(p.id))
                    .forEach(p => {
                        flowNodes.push({
                            id: p.id,
                            label: p.label,
                            column: 'charter',
                            tensions: p.common_tensions,
                        });
                    });

                // Brief column (Conceptions)
                conceptions.forEach(c => {
                    flowNodes.push({
                        id: c.id,
                        label: c.label,
                        column: 'brief',
                        tensions: c.common_tensions,
                    });
                });

                // Scheme column (Design Types - parent only for simplicity)
                designTypes.forEach(d => {
                    flowNodes.push({
                        id: d.id,
                        label: d.label,
                        column: 'scheme',
                    });
                });

                // Build connections from compatibilities
                const flowConnections: FlowConnection[] = [];

                // Philosophy → Conception connections
                philosophies.forEach(p => {
                    const prefs = p.compatibilities?.curriculum_conceptions_preferred || [];
                    prefs.forEach(concId => {
                        // Clean up the ID (remove modifiers like "(moderate)")
                        const cleanId = concId.replace(/\s*\(.*?\)/g, '').trim();
                        flowConnections.push({
                            from: p.id,
                            to: cleanId,
                            strength: concId.includes('(') ? 2 : 3, // Lower strength if has modifier
                        });
                    });
                });

                // Conception → Design Type connections
                conceptions.forEach(c => {
                    const designs = c.compatibilities?.design_types || [];
                    designs.forEach(dtId => {
                        // Handle subtypes (e.g., "learner_centered>child_centered" → "learner_centered")
                        const parentId = dtId.includes('>') ? dtId.split('>')[0] : dtId;
                        // Check if connection already exists
                        if (!flowConnections.find(conn => conn.from === c.id && conn.to === parentId)) {
                            flowConnections.push({
                                from: c.id,
                                to: parentId,
                                strength: 2,
                            });
                        }
                    });
                });

                // Also add Philosophy → Design Type connections (skip conception)
                philosophies.forEach(p => {
                    const designs = p.compatibilities?.design_types_often || [];
                    designs.forEach(dtId => {
                        const parentId = dtId.includes('>') ? dtId.split('>')[0] : dtId;
                        // Check if connection already exists
                        if (!flowConnections.find(conn => conn.from === p.id && conn.to === parentId)) {
                            flowConnections.push({
                                from: p.id,
                                to: parentId,
                                strength: 1,
                            });
                        }
                    });
                });

                setNodes(flowNodes);
                setConnections(flowConnections);
                setActors(rawActors);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load framework data:', error);
                setLoading(false);
            }
        }

        loadData();
    }, []);

    // If posthuman lens is active, render PosthumanView instead
    if (isPosthumanLens) {
        return <PosthumanView />;
    }

    return (
        <section className="relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />

            {/* Decorative Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/30 dark:bg-purple-800/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-200/30 dark:bg-emerald-800/10 rounded-full blur-3xl" />

            <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-16">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                        Curriculum City
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Navigate the landscape of curriculum-making — from foundational <strong>philosophies</strong> to working <strong>designs</strong>.
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 italic">
                        Hover to explore connections. Click any node to learn more.
                    </p>
                </div>

                {/* Flow Map - Blueprint Sheet */}
                <div className="relative">
                    {loading ? (
                        <div className="flex items-center justify-center min-h-[400px]">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
                                <span className="text-sm text-slate-500">Charting the city...</span>
                            </div>
                        </div>
                    ) : (
                        <CityFlowMap
                            nodes={nodes}
                            connections={connections}
                            actors={actors}
                        />
                    )}
                </div>

                {/* Explore Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                    <a
                        href="/concepts"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all"
                    >
                        <span>📚</span>
                        Explore Concepts
                    </a>
                    <a
                        href="/actors"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-lg border border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 hover:-translate-y-0.5 transition-all shadow-lg shadow-slate-200/50 dark:shadow-none"
                    >
                        <span>👥</span>
                        Meet the Actors
                    </a>
                </div>

                {/* Disclaimer */}
                <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-8 max-w-xl mx-auto">
                    This map illustrates <em>tendencies</em> observed in curriculum studies, not fixed rules.
                    Real curriculum-making is contextual, negotiated, and ever-evolving.
                </p>
            </div>
        </section>
    );
}
