import Link from 'next/link';
import HeroSection from '@/components/Hero/HeroSection';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navigation */}
            <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">🏛️</span>
                        <span className="font-semibold text-slate-900 dark:text-white">
                            Curriculum City
                        </span>
                    </div>
                    <nav className="flex items-center gap-4">
                        <Link
                            href="/concepts"
                            className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            Concepts
                        </Link>
                        <Link
                            href="/actors"
                            className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            Actors
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            About
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section with Flow Map */}
            <main className="flex-1">
                <HeroSection />
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        A conceptual tool for curriculum understanding. Not a diagnostic system.
                    </p>
                </div>
            </footer>
        </div>
    );
}
