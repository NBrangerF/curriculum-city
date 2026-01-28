import HeroSection from '@/components/Hero/HeroSection';
import SiteHeader from '@/components/Layout/SiteHeader';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navigation */}
            <SiteHeader />

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
