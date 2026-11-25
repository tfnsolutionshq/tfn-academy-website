import { httpClient, ENDPOINTS } from '@/core/api';
import type { ApiApplicationPayload, ApiApplicationResponse } from '@/core/api';

export const applicationService = {
  /**
   * Submit a paid enrolment or scholarship application (`POST /applications`)
   */
  submit: async (
    payload: ApiApplicationPayload,
  ): Promise<ApiApplicationResponse> => {
    return httpClient.post<ApiApplicationResponse>(
      ENDPOINTS.applications.submit,
      payload,
    );
  },
};
