import type { ReactNode } from 'react';
import { ThemeProvider } from '@/shared/context/ThemeContext';
import { ToastProvider } from '@/shared/context/ToastContext';
import { SiteProvider } from '@/shared/context/SiteContext';
import { ToastViewport } from '@/shared/components/ui/ToastViewport';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <SiteProvider>
          {children}
          <ToastViewport />
        </SiteProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
