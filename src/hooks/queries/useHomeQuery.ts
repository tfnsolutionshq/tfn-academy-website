import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/core/query';
import { homeService } from '@/services/home.service';
import type { HomeAggregateData } from '@/core/api';

/**
 * Hook to retrieve the aggregated home screen data from the API with TanStack Query.
 * Includes automatic caching, background revalidation, and error handling.
 */
export function useHomeQuery() {
  return useQuery<HomeAggregateData>({
    queryKey: queryKeys.home.aggregate,
    queryFn: homeService.getAggregate,
    staleTime: 5 * 60 * 1000, // Fresh for 5 minutes
  });
}
