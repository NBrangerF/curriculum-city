import type { EntityLayer } from '@/data/schema/entity.schema';

interface ComparableEntity {
    id: string;
    label: string;
    layer: EntityLayer;
    definition: string;
    data: Record<string, unknown>;
}

/**
 * Export a comparison of conceptual entities to Markdown
 */
export function exportConceptComparison(entities: ComparableEntity[]): string {
    const date = new Date().toISOString().split('T')[0];

    let md = `# Curriculum Concept Comparison\n\n`;
    md += `_Generated: ${date}_\n\n`;
    md += `---\n\n`;

    // Group by layer
    const byLayer = entities.reduce((acc, e) => {
        if (!acc[e.layer]) acc[e.layer] = [];
        acc[e.layer].push(e);
        return acc;
    }, {} as Record<EntityLayer, ComparableEntity[]>);

    for (const [layer, layerEntities] of Object.entries(byLayer)) {
        if (layerEntities.length === 0) continue;

        md += `## ${layer.charAt(0).toUpperCase() + layer.slice(1)} Comparison\n\n`;

        for (const entity of layerEntities) {
            md += `### ${entity.label}\n\n`;
            md += `**Definition:** ${entity.definition}\n\n`;

            const data = entity.data;

            if (data.aims) {
                md += `**Aims:**\n`;
                for (const aim of data.aims as string[]) {
                    md += `- ${aim}\n`;
                }
                md += `\n`;
            }

            if (data.primary_function) {
                md += `**Primary Function:** ${data.primary_function}\n\n`;
            }

            if (data.pedagogy_bias) {
                md += `**Pedagogy Bias:**\n`;
                for (const p of data.pedagogy_bias as string[]) {
                    md += `- ${p}\n`;
                }
                md += `\n`;
            }

            if (data.evidence_standard) {
                md += `**Evidence Standard:**\n`;
                for (const e of data.evidence_standard as string[]) {
                    md += `- ${e}\n`;
                }
                md += `\n`;
            }

            md += `---\n\n`;
        }
    }

    md += `## Discussion Questions\n\n`;
    md += `1. What similarities do you notice across these conceptual approaches?\n`;
    md += `2. What tensions might arise when trying to combine these in practice?\n`;
    md += `3. Which approach best aligns with your current context and constraints?\n`;
    md += `4. What bridging moves might help integrate elements from multiple approaches?\n\n`;

    md += `---\n\n`;
    md += `_This is a conceptual lens, not a diagnostic tool. Real curriculum often involves hybridization._\n`;

    return md;
}

/**
 * Download markdown content as a file
 */
export function downloadMarkdown(content: string, filename: string): void {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
