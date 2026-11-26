import { httpClient, ENDPOINTS } from '@/core/api';
import type {
  ApiBlogCategory,
  ApiBlogListParams,
  ApiBlogPostDetail,
  ApiBlogPostSummary,
  PaginatedResponse,
} from '@/core/api';

function buildBlogQuery(params?: ApiBlogListParams): string {
  if (!params) return '';
  const search = new URLSearchParams();
  if (params.category && params.category !== 'all') {
    search.set('category', params.category);
  }
  if (params.q && params.q.trim()) {
    search.set('q', params.q.trim());
  }
  if (params.page && params.page >= 1) {
    search.set('page', String(params.page));
  }
  if (params.per_page && params.per_page >= 1) {
    search.set('per_page', String(params.per_page));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}

export const blogService = {
  /**
   * Fetch paginated published blog posts (`GET /blog`)
   */
  getPosts: async (
    params?: ApiBlogListParams,
  ): Promise<PaginatedResponse<ApiBlogPostSummary>> => {
    const qs = buildBlogQuery(params);
    return httpClient.getRaw<PaginatedResponse<ApiBlogPostSummary>>(
      `${ENDPOINTS.blog.list}${qs}`,
    );
  },

  /**
   * Fetch blog categories (`GET /blog/categories`)
   */
  getCategories: async (): Promise<ApiBlogCategory[]> => {
    return httpClient.get<ApiBlogCategory[]>(ENDPOINTS.blog.categories);
  },

  /**
   * Fetch single blog post details + body + related posts (`GET /blog/:slug`)
   */
  getPostBySlug: async (slug: string): Promise<ApiBlogPostDetail> => {
    return httpClient.get<ApiBlogPostDetail>(ENDPOINTS.blog.detail(slug));
  },
};
