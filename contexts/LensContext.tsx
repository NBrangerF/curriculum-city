'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

// ───────────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────────

export type LensMode = 'human-centered' | 'posthuman';

export interface PosthumanActor {
    id: string;
    category: 'material' | 'technological' | 'temporal' | 'affective' | 'ecological';
    label: string;
    icon: string;
    color: string;
    definition: string;
    examples: string[];
    agency_framing: string;
    common_influences: string[];
}

export interface LanguageTransform {
    from: string;
    to: string;
}

export interface EntityAnnotation {
    posthuman_reading: string;
    hidden_actors: string[];
}

export interface MainViewDeclaration {
    statement: string;
    elaboration: string;
}

export interface MainViewData {
    title: string;
    subtitle: string;
    declarations: MainViewDeclaration[];
    exploratory_questions: string[];
    closing_reflection: string;
}

export interface PosthumanLensData {
    meta: {
        name: string;
        version: string;
        description: string;
        notes: string[];
    };
    main_view: MainViewData;
    philosophical_orientation: {
        core_principle: string;
        key_shifts: { from: string; to: string }[];
        curriculum_as: string;
    };
    posthuman_actors: PosthumanActor[];
    language_transforms: {
        instructions: string;
        transforms: LanguageTransform[];
        phrasing_guidance: string[];
    };
    entity_annotations: {
        philosophies: Record<string, EntityAnnotation>;
        conceptions: Record<string, EntityAnnotation>;
    };
    design_implications: {
        principle: string;
        guidance: string[];
        questions_for_designers: string[];
    };
    ui_guidance: {
        lens_toggle: {
            default_label: string;
            posthuman_label: string;
            tooltip: string;
        };
        annotation_prefix: string;
        actor_section_title: string;
        disclaimer: string;
    };
}

interface LensContextValue {
    // State
    lensMode: LensMode;
    posthumanActorsVisible: boolean;
    lensData: PosthumanLensData | null;
    isLoading: boolean;

    // Actions
    setLensMode: (mode: LensMode) => void;
    toggleLens: () => void;
    setPosthumanActorsVisible: (visible: boolean) => void;

    // Helpers
    isPosthumanLens: boolean;
    getEntityAnnotation: (type: 'philosophy' | 'conception', id: string) => EntityAnnotation | null;
    transformText: (text: string) => string;
}

// ───────────────────────────────────────────────────────────
// Context
// ───────────────────────────────────────────────────────────

const LensContext = createContext<LensContextValue | null>(null);

// ───────────────────────────────────────────────────────────
// Provider
// ───────────────────────────────────────────────────────────

interface LensProviderProps {
    children: ReactNode;
}

export function LensProvider({ children }: LensProviderProps) {
    const [lensMode, setLensModeState] = useState<LensMode>('human-centered');
    const [posthumanActorsVisible, setPosthumanActorsVisible] = useState(false);
    const [lensData, setLensData] = useState<PosthumanLensData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load lens data on mount
    useEffect(() => {
        async function loadLensData() {
            try {
                const response = await fetch('/data/posthuman_lens.json');
                if (response.ok) {
                    const data = await response.json();
                    setLensData(data);
                }
            } catch (error) {
                console.error('Failed to load posthuman lens data:', error);
            } finally {
                setIsLoading(false);
            }
        }

        loadLensData();
    }, []);

    // Persist lens state to localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('curriculum-city-lens');
            if (saved) {
                try {
                    const { mode, actorsVisible } = JSON.parse(saved);
                    if (mode === 'posthuman') setLensModeState('posthuman');
                    if (actorsVisible) setPosthumanActorsVisible(true);
                } catch {
                    // Ignore parse errors
                }
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('curriculum-city-lens', JSON.stringify({
                mode: lensMode,
                actorsVisible: posthumanActorsVisible,
            }));
        }
    }, [lensMode, posthumanActorsVisible]);

    const setLensMode = useCallback((mode: LensMode) => {
        setLensModeState(mode);
        // When switching to posthuman lens, also show posthuman actors
        if (mode === 'posthuman') {
            setPosthumanActorsVisible(true);
        }
    }, []);

    const toggleLens = useCallback(() => {
        setLensModeState(prev => {
            const next = prev === 'human-centered' ? 'posthuman' : 'human-centered';
            if (next === 'posthuman') {
                setPosthumanActorsVisible(true);
            }
            return next;
        });
    }, []);

    const isPosthumanLens = lensMode === 'posthuman';

    const getEntityAnnotation = useCallback((type: 'philosophy' | 'conception', id: string): EntityAnnotation | null => {
        if (!lensData) return null;

        const annotations = type === 'philosophy'
            ? lensData.entity_annotations.philosophies
            : lensData.entity_annotations.conceptions;

        return annotations[id] || null;
    }, [lensData]);

    const transformText = useCallback((text: string): string => {
        if (!isPosthumanLens || !lensData) return text;

        let transformed = text;
        for (const { from, to } of lensData.language_transforms.transforms) {
            // Case-insensitive replacement
            const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            transformed = transformed.replace(regex, to);
        }
        return transformed;
    }, [isPosthumanLens, lensData]);

    const value: LensContextValue = {
        lensMode,
        posthumanActorsVisible,
        lensData,
        isLoading,
        setLensMode,
        toggleLens,
        setPosthumanActorsVisible,
        isPosthumanLens,
        getEntityAnnotation,
        transformText,
    };

    return (
        <LensContext.Provider value={value}>
            {children}
        </LensContext.Provider>
    );
}

// ───────────────────────────────────────────────────────────
// Hook
// ───────────────────────────────────────────────────────────

export function useLens(): LensContextValue {
    const context = useContext(LensContext);
    if (!context) {
        throw new Error('useLens must be used within a LensProvider');
    }
    return context;
}

// Optional: Non-throwing hook for optional usage
export function useLensOptional(): LensContextValue | null {
    return useContext(LensContext);
}
