import { httpClient, ENDPOINTS } from '@/core/api';
import type { HomeAggregateData } from '@/core/api';

export const homeService = {
  /**
   * Fetch home aggregate payload containing featured programmes,
   * latest blog posts, student testimonials, hub teaser and academy stats.
   */
  getAggregate: async (): Promise<HomeAggregateData> => {
    return httpClient.get<HomeAggregateData>(ENDPOINTS.home.aggregate);
  },
};
