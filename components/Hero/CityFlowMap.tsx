'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';

// ───────────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────────

interface FlowNode {
    id: string;
    label: string;
    column: 'charter' | 'brief' | 'scheme';
    tensions?: string[];
}

interface FlowConnection {
    from: string;
    to: string;
    strength: number; // 1-3 (1=contextual, 2=common, 3=strong tendency)
}

interface ActorInfo {
    id: string;
    label: string;
    level: string;
    concerns?: string[];
    levers?: string[];
}

interface CityFlowMapProps {
    nodes: FlowNode[];
    connections: FlowConnection[];
    actors?: ActorInfo[];
}

// ───────────────────────────────────────────────────────────
// Main Component
// ───────────────────────────────────────────────────────────

export default function CityFlowMap({ nodes, connections, actors = [] }: CityFlowMapProps) {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'citywide' | 'crew'>('citywide');
    const [selectedActor, setSelectedActor] = useState<string | null>(null);

    // Group nodes by column
    const columns = useMemo(() => ({
        charter: nodes.filter(n => n.column === 'charter'),
        brief: nodes.filter(n => n.column === 'brief'),
        scheme: nodes.filter(n => n.column === 'scheme'),
    }), [nodes]);

    // Find connected nodes for highlighting
    const getConnectedNodes = useCallback((nodeId: string) => {
        const connected = new Set<string>();
        connected.add(nodeId);

        connections.forEach(conn => {
            if (conn.from === nodeId) connected.add(conn.to);
            if (conn.to === nodeId) connected.add(conn.from);
        });

        return connected;
    }, [connections]);

    // Get highlighted connections on hover
    const highlightedConnections = useMemo(() => {
        if (!hoveredNode) return new Set<string>();

        const highlighted = new Set<string>();
        connections.forEach(conn => {
            if (conn.from === hoveredNode || conn.to === hoveredNode) {
                highlighted.add(`${conn.from}-${conn.to}`);
            }
        });
        return highlighted;
    }, [hoveredNode, connections]);

    // Get tensions for hovered node
    const hoveredTensions = useMemo(() => {
        if (!hoveredNode) return null;
        const node = nodes.find(n => n.id === hoveredNode);
        return node?.tensions;
    }, [hoveredNode, nodes]);

    // Selected actor details
    const selectedActorData = useMemo(() => {
        if (!selectedActor) return null;
        return actors.find(a => a.id === selectedActor) || null;
    }, [selectedActor, actors]);

    // By Crew mode filtering
    const crewRelevantNodes = useMemo(() => {
        if (viewMode !== 'crew' || !selectedActor) return null;
        const level = actors.find(a => a.id === selectedActor)?.level;

        const patterns: Record<string, string[]> = {
            supra: ['perennialism', 'essentialism', 'academic_rationalism', 'curriculum_as_technology', 'subject_centered'],
            macro: ['perennialism', 'essentialism', 'academic_rationalism', 'curriculum_as_technology', 'subject_centered'],
            meso: ['essentialism', 'progressivism', 'cognitive_processes', 'academic_rationalism', 'subject_centered', 'broad_fields'],
            micro: ['progressivism', 'existential_humanistic', 'cognitive_processes', 'self_actualization', 'learner_centered', 'problem_centered'],
            nano: ['existential_humanistic', 'self_actualization', 'learner_centered'],
        };

        return new Set(patterns[level || ''] || []);
    }, [viewMode, selectedActor, actors]);

    const connectedNodes = useMemo(() =>
        hoveredNode ? getConnectedNodes(hoveredNode) : new Set<string>(),
        [hoveredNode, getConnectedNodes]);

    return (
        <div className="relative w-full">
            {/* Blueprint Master Plan Sheet */}
            <div className="relative bg-slate-50/80 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 overflow-hidden">

                {/* Blueprint Grid Background */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(100,116,139,0.08) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(100,116,139,0.08) 1px, transparent 1px),
                            linear-gradient(rgba(100,116,139,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(100,116,139,0.04) 1px, transparent 1px)
                        `,
                        backgroundSize: '80px 80px, 80px 80px, 20px 20px, 20px 20px',
                    }}
                />

                {/* Contour/Zoning Texture Overlay */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.015] dark:opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10 Q70 30 50 50 Q30 70 50 90' stroke='%23475569' fill='none' stroke-width='0.5'/%3E%3Cpath d='M20 20 Q40 40 60 30 Q80 20 90 50' stroke='%23475569' fill='none' stroke-width='0.3'/%3E%3C/svg%3E")`,
                        backgroundSize: '200px 200px',
                    }}
                />

                {/* Blueprint Corner Marks */}
                <BlueprintCornerMarks />

                {/* Main Content Grid: Left Panel | Map | Right Panel */}
                <div className="relative grid grid-cols-1 lg:grid-cols-[180px_1fr_180px] gap-4 p-6 lg:p-8">

                    {/* Left: Blueprint Notes Panel */}
                    <BlueprintNotesPanel />

                    {/* Center: Flow Map */}
                    <div className="relative">
                        {/* Toggle: Citywide vs By Crew */}
                        <div className="flex items-center justify-center gap-2 mb-5">
                            <div className="flex items-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-0.5 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <button
                                    onClick={() => setViewMode('citywide')}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${viewMode === 'citywide'
                                        ? 'bg-slate-800 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                        }`}
                                >
                                    🏙️ Citywide
                                </button>
                                <button
                                    onClick={() => setViewMode('crew')}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${viewMode === 'crew'
                                        ? 'bg-slate-800 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                        }`}
                                >
                                    👷 By Crew
                                </button>
                            </div>

                            {viewMode === 'crew' && (
                                <select
                                    value={selectedActor || ''}
                                    onChange={(e) => setSelectedActor(e.target.value || null)}
                                    className="text-xs px-2 py-1.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 shadow-sm"
                                >
                                    <option value="">Select crew...</option>
                                    {actors.map(a => (
                                        <option key={a.id} value={a.id}>{a.label}</option>
                                    ))}
                                </select>
                            )}
                        </div>

                        {/* Flow Map Grid */}
                        <div className="relative grid grid-cols-3 gap-3 md:gap-6 min-h-[380px]">
                            {/* SVG Connections Layer */}
                            <svg
                                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                                preserveAspectRatio="none"
                            >
                                <defs>
                                    {/* Base gradient */}
                                    <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.5" />
                                        <stop offset="50%" stopColor="rgb(59, 130, 246)" stopOpacity="0.5" />
                                        <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0.5" />
                                    </linearGradient>
                                    {/* Highlight gradient with glow */}
                                    <linearGradient id="routeGradientHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="rgb(167, 139, 250)" stopOpacity="1" />
                                        <stop offset="50%" stopColor="rgb(96, 165, 250)" stopOpacity="1" />
                                        <stop offset="100%" stopColor="rgb(52, 211, 153)" stopOpacity="1" />
                                    </linearGradient>
                                    {/* Glow filter for night-network effect */}
                                    <filter id="routeGlow" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                    {/* Rail-tie pattern */}
                                    <pattern id="railTies" patternUnits="userSpaceOnUse" width="12" height="4">
                                        <rect x="0" y="1" width="2" height="2" fill="currentColor" opacity="0.3" />
                                    </pattern>
                                </defs>

                                {connections.map(conn => {
                                    const isHighlighted = highlightedConnections.has(`${conn.from}-${conn.to}`);
                                    const isFadedByCrew = viewMode === 'crew' && crewRelevantNodes &&
                                        !crewRelevantNodes.has(conn.from) && !crewRelevantNodes.has(conn.to);

                                    return (
                                        <FlowRoute
                                            key={`${conn.from}-${conn.to}`}
                                            fromId={conn.from}
                                            toId={conn.to}
                                            strength={conn.strength}
                                            highlighted={isHighlighted}
                                            faded={isFadedByCrew || false}
                                        />
                                    );
                                })}
                            </svg>

                            {/* Column: Charter (Philosophy) */}
                            <Column
                                title="Charter"
                                subtitle="Educational Philosophy"
                                color="purple"
                                nodes={columns.charter}
                                hoveredNode={hoveredNode}
                                connectedNodes={connectedNodes}
                                crewRelevantNodes={crewRelevantNodes}
                                viewMode={viewMode}
                                onHover={setHoveredNode}
                            />

                            {/* Column: Brief (Conception) */}
                            <Column
                                title="Brief"
                                subtitle="Curriculum Conception"
                                color="blue"
                                nodes={columns.brief}
                                hoveredNode={hoveredNode}
                                connectedNodes={connectedNodes}
                                crewRelevantNodes={crewRelevantNodes}
                                viewMode={viewMode}
                                onHover={setHoveredNode}
                            />

                            {/* Column: Scheme (Design Types) */}
                            <Column
                                title="Scheme"
                                subtitle="Design Types"
                                color="emerald"
                                nodes={columns.scheme}
                                hoveredNode={hoveredNode}
                                connectedNodes={connectedNodes}
                                crewRelevantNodes={crewRelevantNodes}
                                viewMode={viewMode}
                                onHover={setHoveredNode}
                            />
                        </div>

                        {/* Tensions Callout */}
                        {hoveredTensions && hoveredTensions.length > 0 && (
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 animate-in fade-in slide-in-from-bottom-2 duration-200">
                                <div className="bg-amber-50/95 dark:bg-amber-900/40 backdrop-blur-sm border border-amber-200 dark:border-amber-700/60 rounded-lg px-4 py-2 shadow-lg max-w-md">
                                    <div className="flex items-center gap-2 text-xs text-amber-800 dark:text-amber-200">
                                        <span>🚧</span>
                                        <span className="font-medium">Construction frictions:</span>
                                        <span className="text-amber-700 dark:text-amber-300">
                                            {hoveredTensions.slice(0, 2).join(' • ')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Crew Toolkit Panel */}
                    <CrewToolkitPanel
                        viewMode={viewMode}
                        selectedActorData={selectedActorData}
                    />
                </div>
            </div>
        </div>
    );
}

// ───────────────────────────────────────────────────────────
// Blueprint Corner Marks
// ───────────────────────────────────────────────────────────

function BlueprintCornerMarks() {
    return (
        <>
            {/* Top-Left: Sheet Code */}
            <div className="absolute top-3 left-3 flex items-center gap-2 text-[10px] font-mono text-slate-400 dark:text-slate-500">
                <div className="flex">
                    <div className="w-3 h-3 border-l-2 border-t-2 border-slate-300 dark:border-slate-600" />
                </div>
                <span>CC-MAP-01</span>
            </div>

            {/* Top-Right: Compass */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
                <div className="relative w-6 h-6 flex items-center justify-center">
                    <div className="absolute w-full h-px bg-slate-300 dark:bg-slate-600" />
                    <div className="absolute w-px h-full bg-slate-300 dark:bg-slate-600" />
                    <span className="absolute -top-2.5 text-[8px] font-bold text-slate-400 dark:text-slate-500">N</span>
                </div>
                <div className="w-3 h-3 border-r-2 border-t-2 border-slate-300 dark:border-slate-600" />
            </div>

            {/* Bottom-Left: Scale Bar */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <div className="w-3 h-3 border-l-2 border-b-2 border-slate-300 dark:border-slate-600" />
                <div className="flex flex-col items-start gap-0.5">
                    <div className="flex items-center gap-0.5">
                        <div className="w-4 h-1 bg-slate-300 dark:bg-slate-600" />
                        <div className="w-4 h-1 bg-slate-200 dark:bg-slate-700" />
                        <div className="w-4 h-1 bg-slate-300 dark:bg-slate-600" />
                    </div>
                    <span className="text-[8px] font-mono text-slate-400 dark:text-slate-500">conceptual</span>
                </div>
            </div>

            {/* Bottom-Right: Version */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2 text-[10px] font-mono text-slate-400 dark:text-slate-500">
                <span>rev.01</span>
                <div className="w-3 h-3 border-r-2 border-b-2 border-slate-300 dark:border-slate-600" />
            </div>
        </>
    );
}

// ───────────────────────────────────────────────────────────
// Blueprint Notes Panel (Left)
// ───────────────────────────────────────────────────────────

function BlueprintNotesPanel() {
    return (
        <div className="hidden lg:flex flex-col gap-4 py-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-200 dark:border-slate-700 pb-1">
                Blueprint Notes
            </div>

            <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2">
                    <span className="text-purple-500 dark:text-purple-400 mt-0.5">◆</span>
                    <div>
                        <p className="font-medium text-slate-700 dark:text-slate-300">Charter</p>
                        <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">City charter: values & vision</p>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <span className="text-blue-500 dark:text-blue-400 mt-0.5">◆</span>
                    <div>
                        <p className="font-medium text-slate-700 dark:text-slate-300">Brief</p>
                        <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">Program brief: purpose & evidence</p>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <span className="text-emerald-500 dark:text-emerald-400 mt-0.5">◆</span>
                    <div>
                        <p className="font-medium text-slate-700 dark:text-slate-300">Scheme</p>
                        <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">Spatial scheme: organization & flows</p>
                    </div>
                </div>
            </div>

            <div className="mt-auto pt-4 border-t border-slate-200/60 dark:border-slate-700/60">
                <p className="text-[10px] text-slate-400 dark:text-slate-500 italic leading-relaxed">
                    Hover nodes to trace infrastructure routes
                </p>
            </div>
        </div>
    );
}

// ───────────────────────────────────────────────────────────
// Crew Toolkit Panel (Right)
// ───────────────────────────────────────────────────────────

interface CrewToolkitPanelProps {
    viewMode: 'citywide' | 'crew';
    selectedActorData: ActorInfo | null;
}

function CrewToolkitPanel({ viewMode, selectedActorData }: CrewToolkitPanelProps) {
    return (
        <div className="hidden lg:flex flex-col gap-4 py-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-200 dark:border-slate-700 pb-1">
                {viewMode === 'citywide' ? 'Route Legend' : 'Crew Toolkit'}
            </div>

            {viewMode === 'citywide' ? (
                /* Citywide: Legend */
                <div className="space-y-3 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-1 rounded-full bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 opacity-100" />
                        <span className="text-slate-600 dark:text-slate-400">Strong tendency</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-0.5 rounded-full bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 opacity-60" />
                        <span className="text-slate-600 dark:text-slate-400">Often observed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-px bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 opacity-40" />
                        <span className="text-slate-600 dark:text-slate-400">Contextual</span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 italic leading-relaxed">
                            These are tendencies, not rules—real curriculum often hybridizes.
                        </p>
                    </div>
                </div>
            ) : (
                /* By Crew: Actor Toolkit */
                <div className="space-y-3 text-xs">
                    {selectedActorData ? (
                        <>
                            <div>
                                <p className="font-medium text-slate-700 dark:text-slate-300 mb-1.5">Key Concerns</p>
                                <div className="flex flex-wrap gap-1">
                                    {(selectedActorData.concerns || ['equity', 'outcomes', 'efficiency']).slice(0, 4).map((concern, i) => (
                                        <span
                                            key={i}
                                            className="px-1.5 py-0.5 text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded"
                                        >
                                            {concern}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="font-medium text-slate-700 dark:text-slate-300 mb-1.5">Typical Levers</p>
                                <div className="flex flex-wrap gap-1">
                                    {(selectedActorData.levers || ['standards', 'assessment', 'resources']).slice(0, 3).map((lever, i) => (
                                        <span
                                            key={i}
                                            className="px-1.5 py-0.5 text-[10px] bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded flex items-center gap-0.5"
                                        >
                                            🔧 {lever}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <p className="text-slate-500 dark:text-slate-400 text-[11px] italic">
                            Select a crew to see their toolkit
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

// ───────────────────────────────────────────────────────────
// Column Component
// ───────────────────────────────────────────────────────────

interface ColumnProps {
    title: string;
    subtitle: string;
    color: 'purple' | 'blue' | 'emerald';
    nodes: FlowNode[];
    hoveredNode: string | null;
    connectedNodes: Set<string>;
    crewRelevantNodes: Set<string> | null;
    viewMode: 'citywide' | 'crew';
    onHover: (id: string | null) => void;
}

function Column({
    title,
    subtitle,
    color,
    nodes,
    hoveredNode,
    connectedNodes,
    crewRelevantNodes,
    viewMode,
    onHover,
}: ColumnProps) {
    const colorClasses = {
        purple: {
            header: 'border-purple-300/60 dark:border-purple-700/40',
            headerBg: 'bg-purple-50/60 dark:bg-purple-900/20',
            headerText: 'text-purple-700 dark:text-purple-300',
            dot: 'bg-purple-500',
            node: 'border-purple-200/80 dark:border-purple-800/60 hover:border-purple-400 dark:hover:border-purple-600',
            nodeActive: 'border-purple-500 bg-purple-50/80 dark:bg-purple-900/30 shadow-md shadow-purple-500/10',
        },
        blue: {
            header: 'border-blue-300/60 dark:border-blue-700/40',
            headerBg: 'bg-blue-50/60 dark:bg-blue-900/20',
            headerText: 'text-blue-700 dark:text-blue-300',
            dot: 'bg-blue-500',
            node: 'border-blue-200/80 dark:border-blue-800/60 hover:border-blue-400 dark:hover:border-blue-600',
            nodeActive: 'border-blue-500 bg-blue-50/80 dark:bg-blue-900/30 shadow-md shadow-blue-500/10',
        },
        emerald: {
            header: 'border-emerald-300/60 dark:border-emerald-700/40',
            headerBg: 'bg-emerald-50/60 dark:bg-emerald-900/20',
            headerText: 'text-emerald-700 dark:text-emerald-300',
            dot: 'bg-emerald-500',
            node: 'border-emerald-200/80 dark:border-emerald-800/60 hover:border-emerald-400 dark:hover:border-emerald-600',
            nodeActive: 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-900/30 shadow-md shadow-emerald-500/10',
        },
    };

    const c = colorClasses[color];

    return (
        <div className="flex flex-col relative z-10">
            {/* Column Header */}
            <div className={`${c.headerBg} ${c.header} border rounded-lg px-3 py-2 text-center backdrop-blur-sm`}>
                <div className="flex items-center justify-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${c.dot}`} />
                    <h3 className={`font-semibold text-sm ${c.headerText}`}>{title}</h3>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
            </div>

            {/* Nodes */}
            <div className="flex-1 space-y-1.5 pt-2">
                {nodes.map((node) => {
                    const isHovered = hoveredNode === node.id;
                    const isConnected = connectedNodes.has(node.id);
                    const isFadedByCrew = viewMode === 'crew' && crewRelevantNodes && !crewRelevantNodes.has(node.id);
                    const isActive = isHovered || (hoveredNode && isConnected);

                    return (
                        <Link
                            key={node.id}
                            href={`/concepts?entity=${node.id}`}
                            id={`node-${node.id}`}
                            onMouseEnter={() => onHover(node.id)}
                            onMouseLeave={() => onHover(null)}
                            className={`block px-2.5 py-1.5 rounded-md border bg-white/90 dark:bg-slate-800/70 backdrop-blur-sm transition-all duration-200 ${isActive ? c.nodeActive : c.node
                                } ${isFadedByCrew ? 'opacity-25' : ''}`}
                        >
                            <p className="text-xs font-medium text-slate-700 dark:text-slate-200 leading-tight">
                                {node.label}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

// ───────────────────────────────────────────────────────────
// Flow Route (SVG Path) - Enhanced Infrastructure Style
// ───────────────────────────────────────────────────────────

interface FlowRouteProps {
    fromId: string;
    toId: string;
    strength: number;
    highlighted: boolean;
    faded: boolean;
}

function FlowRoute({ fromId, toId, strength, highlighted, faded }: FlowRouteProps) {
    const [path, setPath] = useState<string | null>(null);

    const updatePath = useCallback(() => {
        const fromEl = document.getElementById(`node-${fromId}`);
        const toEl = document.getElementById(`node-${toId}`);
        const svg = fromEl?.closest('.grid')?.querySelector('svg');

        if (!fromEl || !toEl || !svg) return;

        const svgRect = svg.getBoundingClientRect();
        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();

        const startX = fromRect.right - svgRect.left;
        const startY = fromRect.top + fromRect.height / 2 - svgRect.top;
        const endX = toRect.left - svgRect.left;
        const endY = toRect.top + toRect.height / 2 - svgRect.top;

        // Smoother bezier curve
        const midX = (startX + endX) / 2;
        const pathD = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;
        setPath(pathD);
    }, [fromId, toId]);

    useEffect(() => {
        const timer = setTimeout(updatePath, 100);
        window.addEventListener('resize', updatePath);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updatePath);
        };
    }, [updatePath]);

    if (!path) return null;

    // Enhanced infrastructure styling
    const baseWidth = strength === 3 ? 6 : strength === 2 ? 4 : 2;
    const innerWidth = strength === 3 ? 2 : strength === 2 ? 1 : 0.5;
    const opacity = faded ? 0.08 : highlighted ? 1 : 0.35;
    const dashArray = strength === 1 ? '4,4' : 'none';

    return (
        <g className={`transition-all duration-300 ${highlighted ? 'drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]' : ''}`}>
            {/* Outer "road" stroke */}
            <path
                d={path}
                fill="none"
                stroke={highlighted ? 'url(#routeGradientHighlight)' : 'url(#routeGradient)'}
                strokeWidth={baseWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={dashArray}
                opacity={opacity}
            />
            {/* Inner "lane" marker for visual depth */}
            {strength >= 2 && (
                <path
                    d={path}
                    fill="none"
                    stroke="white"
                    strokeWidth={innerWidth}
                    strokeLinecap="round"
                    strokeDasharray="8,12"
                    opacity={highlighted ? 0.4 : 0.15}
                />
            )}
        </g>
    );
}
