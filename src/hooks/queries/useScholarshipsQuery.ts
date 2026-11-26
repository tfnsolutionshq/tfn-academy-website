import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/core/query';
import { scholarshipService } from '@/services/scholarship.service';
import type { ApiScholarship } from '@/core/api';

/**
 * Fetch all active scholarships (`GET /scholarships`)
 */
export function useScholarshipsQuery() {
  return useQuery<ApiScholarship[]>({
    queryKey: queryKeys.scholarships.list(),
    queryFn: scholarshipService.getScholarships,
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Fetch single scholarship details with optional programme-specific fee calculation
 * (`GET /scholarships/:code?programme=:slug`)
 */
export function useScholarshipDetailQuery(code?: string, programmeSlug?: string) {
  return useQuery<ApiScholarship>({
    queryKey: queryKeys.scholarships.detail(code || '', programmeSlug),
    queryFn: () => scholarshipService.getScholarshipByCode(code!, programmeSlug),
    enabled: Boolean(code),
    staleTime: 5 * 60 * 1000,
  });
}
