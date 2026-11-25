import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/core/query';
import { faqService } from '@/services/faq.service';
import type { ApiFaq } from '@/core/api';

/**
 * Hook to retrieve all FAQs from the API using TanStack Query.
 * Cached for 10 minutes to minimize network traffic.
 */
export function useFaqsQuery() {
  return useQuery<ApiFaq[]>({
    queryKey: queryKeys.faqs.list(),
    queryFn: faqService.getFaqs,
    staleTime: 10 * 60 * 1000, // 10 minutes cache
  });
}
