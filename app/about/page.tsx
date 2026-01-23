import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
            {/* Navigation */}
            <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-2 hover:opacity-80">
                            <span className="text-xl">🏛️</span>
                            <span className="font-semibold text-slate-900 dark:text-white hidden sm:inline">
                                Curriculum City
                            </span>
                        </Link>
                        <nav className="flex items-center gap-4">
                            <Link href="/concepts" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                                Concepts
                            </Link>
                            <Link href="/actors" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                                Actors
                            </Link>
                            <Link href="/about" className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                About
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 py-12">
                <div className="max-w-3xl mx-auto px-4">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                        About Curriculum City
                    </h1>

                    <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
                        {/* Description */}
                        <section>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                Curriculum City is a <strong>sense-making and learning tool</strong> for exploring
                                curriculum studies through two complementary lenses: the <em>Conceptual Chain</em>
                                and the <em>Actor System</em>.
                            </p>
                        </section>

                        {/* What This Tool Does */}
                        <section className="bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                                What This Tool Does
                            </h2>
                            <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500">✓</span>
                                    <span>Helps you explore <strong>educational philosophies</strong>, <strong>curriculum conceptions</strong>, and <strong>design types</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500">✓</span>
                                    <span>Presents curriculum making as a <strong>dynamic social practice</strong> across system levels</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500">✓</span>
                                    <span>Provides <strong>practice examples</strong> for planning, instruction, and assessment</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500">✓</span>
                                    <span>Surfaces <strong>common tensions</strong> that emerge in practice</span>
                                </li>
                            </ul>
                        </section>

                        {/* Disclaimers */}
                        <section className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800">
                            <h2 className="text-xl font-semibold text-amber-800 dark:text-amber-200 mb-4">
                                ⚠️ Important Disclaimers
                            </h2>
                            <ul className="space-y-3 text-amber-900 dark:text-amber-100">
                                <li className="flex items-start gap-2">
                                    <span>•</span>
                                    <span>These are <strong>conceptual lenses</strong>, not prescriptions or blueprints.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span>•</span>
                                    <span>Real educational settings <strong>often hybridize</strong> across multiple approaches.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span>•</span>
                                    <span>We do <strong>not assign fixed ideologies</strong> to actors—any actor can draw on different lenses.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span>•</span>
                                    <span>Curriculum emerges through <strong>negotiation and enactment</strong>, not top-down implementation.</span>
                                </li>
                            </ul>
                        </section>

                        {/* Theoretical Foundations */}
                        <section>
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                                Theoretical Foundations
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                This tool draws on established curriculum theory traditions, including:
                            </p>
                            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                                <li>• Elliot Eisner&apos;s curriculum orientations</li>
                                <li>• Mark Priestley&apos;s curriculum-making framework</li>
                                <li>• Tyler, Taba, and classical curriculum design</li>
                                <li>• Pragmatist and critical pedagogies</li>
                            </ul>
                        </section>

                        {/* Credits Placeholder */}
                        <section className="bg-slate-100 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                                Credits
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">
                                Framework data and conceptual synthesis developed for educational research and professional learning.
                                Full academic citations available on request.
                            </p>
                        </section>

                        {/* Data Version */}
                        <section className="text-center">
                            <p className="text-xs text-slate-400 dark:text-slate-500">
                                Framework data version: 0.5 • Built with Next.js
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                    A conceptual tool for curriculum understanding. Not a diagnostic system.
                </p>
            </footer>
        </div>
    );
}
