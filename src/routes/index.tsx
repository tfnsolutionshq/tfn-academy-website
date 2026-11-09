import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/shared/components/layout/MainLayout';
import { PageLoader } from '@/shared/components/ui/PageLoader';

const HomePage = lazy(() => import('@/pages/home/presentation/HomePage'));
const ProgramsPage = lazy(() => import('@/pages/programs/presentation/ProgramsPage'));
const ProgramDetailPage = lazy(() => import('@/pages/program-detail/presentation/ProgramDetailPage'));
const AboutPage = lazy(() => import('@/pages/about/presentation/AboutPage'));
const AdmissionsPage = lazy(() => import('@/pages/admissions/presentation/AdmissionsPage'));
const ApplyPage = lazy(() => import('@/pages/apply/presentation/ApplyPage'));
const ContactPage = lazy(() => import('@/pages/contact/presentation/ContactPage'));
const ScholarshipPage = lazy(() => import('@/pages/scholarship/presentation/ScholarshipPage'));
const KidsPage = lazy(() => import('@/pages/kids/presentation/KidsPage'));
const CorporatePage = lazy(() => import('@/pages/corporate/presentation/CorporatePage'));
const HireTalentsPage = lazy(() => import('@/pages/hire-talents/presentation/HireTalentsPage'));
const VerifyPage = lazy(() => import('@/pages/verify/presentation/VerifyPage'));
const BlogPage = lazy(() => import('@/pages/blog/presentation/BlogPage'));
const BlogPostPage = lazy(() => import('@/pages/blog/presentation/BlogPostPage'));
const CareersPage = lazy(() => import('@/pages/careers/presentation/CareersPage'));
const HubPage = lazy(() => import('@/pages/hub/presentation/HubPage'));
const NotFoundPage = lazy(() => import('@/pages/not-found/presentation/NotFoundPage'));

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/programmes" element={<ProgramsPage />} />
          <Route path="/programmes/:slug" element={<ProgramDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/scholarship" element={<ScholarshipPage />} />
          <Route path="/kids" element={<KidsPage />} />
          <Route path="/corporate-training" element={<CorporatePage />} />
          <Route path="/hire-talents" element={<HireTalentsPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/hub" element={<HubPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
