import { httpClient, ENDPOINTS } from '@/core/api';
import type { ApiFaq } from '@/core/api';

export const faqService = {
  /**
   * Fetch all FAQs sorted by sort_order
   */
  getFaqs: async (): Promise<ApiFaq[]> => {
    return httpClient.get<ApiFaq[]>(ENDPOINTS.faqs.list);
  },
};
