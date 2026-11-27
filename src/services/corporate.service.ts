import { httpClient, ENDPOINTS } from '@/core/api';
import type {
  ApiCorporateOverview,
  ApiCorporateRequestPayload,
  ApiCorporateRequestResponse,
} from '@/core/api';

export const corporateService = {
  /**
   * Fetch Corporate Training overview (`GET /corporate`)
   */
  getOverview: async (): Promise<ApiCorporateOverview> => {
    return httpClient.get<ApiCorporateOverview>(ENDPOINTS.corporate.overview);
  },

  /**
   * Submit Corporate Training proposal request (`POST /corporate/requests`)
   */
  submitRequest: async (
    payload: ApiCorporateRequestPayload,
  ): Promise<ApiCorporateRequestResponse> => {
    return httpClient.post<ApiCorporateRequestResponse>(
      ENDPOINTS.corporate.request,
      payload,
    );
  },
};
