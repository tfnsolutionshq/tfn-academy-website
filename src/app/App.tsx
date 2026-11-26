import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from './providers/AppProviders';
import { AppRoutes } from '@/routes';
import { AppPreloader } from '@/shared/components/ui/Loading';

export default function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <AppPreloader />
        <AppRoutes />
      </AppProviders>
    </BrowserRouter>
  );
}
