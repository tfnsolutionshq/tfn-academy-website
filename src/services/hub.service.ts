import { httpClient, ENDPOINTS } from '@/core/api';
import type {
  ApiHubBookingPayload,
  ApiHubBookingResponse,
  ApiHubOverview,
  ApiHubQuotePayload,
  ApiHubQuoteResponse,
  ApiHubSpace,
} from '@/core/api';

export const hubService = {
  /**
   * Fetch TFN Hub overview (`GET /hub`)
   */
  getOverview: async (): Promise<ApiHubOverview> => {
    return httpClient.get<ApiHubOverview>(ENDPOINTS.hub.overview);
  },

  /**
   * Fetch active hub spaces (`GET /hub/spaces`)
   */
  getSpaces: async (): Promise<ApiHubSpace[]> => {
    return httpClient.get<ApiHubSpace[]>(ENDPOINTS.hub.spaces);
  },

  /**
   * Fetch single hub space details (`GET /hub/spaces/:slug`)
   */
  getSpaceBySlug: async (slug: string): Promise<ApiHubSpace> => {
    return httpClient.get<ApiHubSpace>(ENDPOINTS.hub.spaceDetail(slug));
  },

  /**
   * Calculate hub booking quote (`POST /hub/quote`)
   */
  calculateQuote: async (
    payload: ApiHubQuotePayload,
  ): Promise<ApiHubQuoteResponse> => {
    return httpClient.post<ApiHubQuoteResponse>(ENDPOINTS.hub.quote, payload);
  },

  /**
   * Submit hub booking request (`POST /hub/bookings`)
   */
  submitBooking: async (
    payload: ApiHubBookingPayload,
  ): Promise<ApiHubBookingResponse> => {
    return httpClient.post<ApiHubBookingResponse>(ENDPOINTS.hub.bookings, payload);
  },
};
