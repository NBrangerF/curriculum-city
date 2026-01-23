'use client';

interface TensionsSectionProps {
    tensions?: string[];
}

export default function TensionsSection({ tensions }: TensionsSectionProps) {
    if (!tensions || tensions.length === 0) {
        return null; // Gracefully hide if no tensions
    }

    return (
        <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg">
            <h3 className="text-xs font-semibold text-amber-700 dark:text-amber-300 uppercase mb-3 flex items-center gap-1">
                <span>⚡</span>
                Common Tensions
            </h3>
            <ul className="space-y-2">
                {tensions.map((t, i) => (
                    <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
                    >
                        <span className="text-amber-500 mt-0.5">→</span>
                        <span>{t}</span>
                    </li>
                ))}
            </ul>
            <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-3 italic">
                These tensions often surface in practice and can be navigated, not necessarily resolved.
            </p>
        </div>
    );
}
