'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LensToggle, { LensIndicator } from '@/components/Lens/LensToggle';

// ───────────────────────────────────────────────────────────
// Site Header with Navigation and Lens Toggle
// ───────────────────────────────────────────────────────────

export default function SiteHeader() {
    const pathname = usePathname();

    const navLinks = [
        { href: '/concepts', label: 'Concepts' },
        { href: '/actors', label: 'Actors' },
        { href: '/about', label: 'About' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <span className="text-xl">🏛️</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                        Curriculum City
                    </span>
                </Link>

                {/* Navigation + Lens Toggle */}
                <div className="flex items-center gap-4">
                    {/* Nav Links */}
                    <nav className="hidden sm:flex items-center gap-4">
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`
                                    text-sm font-medium transition-colors
                                    ${pathname === link.href
                                        ? 'text-slate-900 dark:text-white'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                    }
                                `}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Divider */}
                    <div className="hidden sm:block w-px h-6 bg-slate-200 dark:bg-slate-700" />

                    {/* Lens Toggle */}
                    <LensToggle compact={false} showLabel={true} />
                </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="sm:hidden flex items-center justify-center gap-4 py-2 border-t border-slate-100 dark:border-slate-800">
                {navLinks.map(link => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`
                            text-xs font-medium transition-colors
                            ${pathname === link.href
                                ? 'text-slate-900 dark:text-white'
                                : 'text-slate-500 dark:text-slate-400'
                            }
                        `}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </header>
    );
}
