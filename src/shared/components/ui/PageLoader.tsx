import { PagePreloader } from './Loading';

export function PageLoader() {
  return <PagePreloader message="Loading page..." />;
}

export {
  AppPreloader,
  PagePreloader,
  GlobalLoading,
  Spinner,
  Skeleton,
  SkeletonText,
  ProgrammeCardSkeleton,
  BlogCardSkeleton,
} from './Loading';
