import { httpClient, ENDPOINTS } from '@/core/api';
import type {
  ApiKidsContent,
  ApiKidsRegistrationPayload,
  ApiKidsRegistrationResponse,
} from '@/core/api';

export const kidsService = {
  /**
   * Fetch Kids & Teens age groups and programmes (`GET /kids`)
   */
  getContent: async (): Promise<ApiKidsContent> => {
    return httpClient.get<ApiKidsContent>(ENDPOINTS.kids.content);
  },

  /**
   * Submit Kids & Teens registration (`POST /kids/registrations`)
   */
  register: async (
    payload: ApiKidsRegistrationPayload,
  ): Promise<ApiKidsRegistrationResponse> => {
    return httpClient.post<ApiKidsRegistrationResponse>(
      ENDPOINTS.kids.register,
      payload,
    );
  },
};
