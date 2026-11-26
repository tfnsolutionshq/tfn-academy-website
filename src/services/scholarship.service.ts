import { httpClient, ENDPOINTS } from '@/core/api';
import type { ApiScholarship } from '@/core/api';

export const scholarshipService = {
  /**
   * Fetch all active scholarships (`GET /scholarships`)
   */
  getScholarships: async (): Promise<ApiScholarship[]> => {
    return httpClient.get<ApiScholarship[]>(ENDPOINTS.scholarships.list);
  },

  /**
   * Fetch single scholarship details with optional programme-specific fee calculation
   * (`GET /scholarships/:code?programme=:slug`)
   */
  getScholarshipByCode: async (
    code: string,
    programmeSlug?: string,
  ): Promise<ApiScholarship> => {
    const qs = programmeSlug
      ? `?programme=${encodeURIComponent(programmeSlug)}`
      : '';
    return httpClient.get<ApiScholarship>(
      `${ENDPOINTS.scholarships.detail(code)}${qs}`,
    );
  },
};
