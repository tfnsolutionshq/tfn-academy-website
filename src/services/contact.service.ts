import { httpClient, ENDPOINTS } from '@/core/api';
import type { ApiContactPayload, ApiContactResponse } from '@/core/api';

export const contactService = {
  /**
   * Submit a contact message (`POST /contact`)
   */
  submitMessage: async (payload: ApiContactPayload): Promise<ApiContactResponse> => {
    return httpClient.post<ApiContactResponse>(ENDPOINTS.contact.submit, payload);
  },
};
