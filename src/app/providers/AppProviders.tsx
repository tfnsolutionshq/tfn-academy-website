import type { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/core/query/queryClient';
import { ThemeProvider } from '@/shared/context/ThemeContext';
import { ToastProvider } from '@/shared/context/ToastContext';
import { SiteProvider } from '@/shared/context/SiteContext';
import { ToastViewport } from '@/shared/components/ui/ToastViewport';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToastProvider>
          <SiteProvider>
            {children}
            <ToastViewport />
          </SiteProvider>
        </ToastProvider>
      </ThemeProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
