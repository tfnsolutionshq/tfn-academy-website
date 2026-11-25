import { httpClient, ENDPOINTS } from '@/core/api';
import type {
  ApiProgrammeCategory,
  ApiProgrammeDetail,
  ApiProgrammeListParams,
  ApiProgrammeRecommendPayload,
  ApiProgrammeSummary,
  PaginatedResponse,
} from '@/core/api';

function buildQueryString(params?: ApiProgrammeListParams): string {
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

export const programmeService = {
  /**
   * Fetch all programme categories sorted by sort_order
   */
  getCategories: async (): Promise<ApiProgrammeCategory[]> => {
    return httpClient.get<ApiProgrammeCategory[]>(ENDPOINTS.programmes.categories);
  },

  /**
   * Fetch paginated & filterable programmes list
   */
  getProgrammes: async (
    params?: ApiProgrammeListParams,
  ): Promise<PaginatedResponse<ApiProgrammeSummary>> => {
    const qs = buildQueryString(params);
    return httpClient.getRaw<PaginatedResponse<ApiProgrammeSummary>>(
      `${ENDPOINTS.programmes.list}${qs}`,
    );
  },

  /**
   * Fetch featured programmes
   */
  getFeatured: async (): Promise<ApiProgrammeSummary[]> => {
    return httpClient.get<ApiProgrammeSummary[]>(ENDPOINTS.programmes.featured);
  },

  /**
   * Fetch full programme detail & curriculum by slug
   */
  getProgrammeBySlug: async (slug: string): Promise<ApiProgrammeDetail> => {
    return httpClient.get<ApiProgrammeDetail>(ENDPOINTS.programmes.detail(slug));
  },

  /**
   * Get recommended programmes based on interest and technical level
   */
  recommend: async (
    payload: ApiProgrammeRecommendPayload,
  ): Promise<ApiProgrammeSummary[]> => {
    const res = await httpClient.post<
      ApiProgrammeSummary[] | { recommendations?: ApiProgrammeSummary[]; programmes?: ApiProgrammeSummary[] }
    >(ENDPOINTS.programmes.recommend, payload);

    if (Array.isArray(res)) return res;
    if (res && Array.isArray(res.recommendations)) return res.recommendations;
    if (res && Array.isArray(res.programmes)) return res.programmes;
    return [];
  },

  /**
   * Get the direct URL for downloading a programme syllabus PDF
   */
  getSyllabusUrl: (slug: string): string => {
    return `${httpClient.getBaseUrl()}${ENDPOINTS.programmes.syllabus(slug)}`;
  },

  /**
   * Fetch and trigger browser download of the syllabus PDF
   */
  downloadSyllabusPdf: async (slug: string): Promise<void> => {
    const blob = await httpClient.getBlob(ENDPOINTS.programmes.syllabus(slug), {
      Accept: 'application/pdf',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TFN-Academy-${slug}-syllabus.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2500);
  },
};
