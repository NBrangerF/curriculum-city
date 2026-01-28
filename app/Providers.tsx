'use client';

import { ReactNode } from 'react';
import { LensProvider } from '@/contexts/LensContext';

interface ProvidersProps {
    children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <LensProvider>
            {children}
        </LensProvider>
    );
}
