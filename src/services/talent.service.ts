import { httpClient, ENDPOINTS } from '@/core/api';
import type {
  ApiConsultationPayload,
  ApiConsultationResponse,
  ApiTalentListParams,
  ApiTalentProfile,
  PaginatedResponse,
} from '@/core/api';

function buildTalentQuery(params?: ApiTalentListParams): string {
  if (!params) return '';
  const search = new URLSearchParams();
  if (params.programme && params.programme !== 'all') {
    search.set('programme', params.programme);
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

export const talentService = {
  /**
   * Fetch paginated published talent profiles (`GET /talent`)
   */
  getTalents: async (
    params?: ApiTalentListParams,
  ): Promise<PaginatedResponse<ApiTalentProfile>> => {
    const qs = buildTalentQuery(params);
    return httpClient.getRaw<PaginatedResponse<ApiTalentProfile>>(
      `${ENDPOINTS.talents.list}${qs}`,
    );
  },

  /**
   * Fetch single talent profile details by code (`GET /talent/:code`)
   */
  getTalentByCode: async (code: string): Promise<ApiTalentProfile> => {
    return httpClient.get<ApiTalentProfile>(ENDPOINTS.talents.detail(code));
  },

  /**
   * Submit hire-talent consultation request (`POST /consultations`)
   */
  submitConsultation: async (
    payload: ApiConsultationPayload,
  ): Promise<ApiConsultationResponse> => {
    return httpClient.post<ApiConsultationResponse>(
      ENDPOINTS.consultations.request,
      payload,
    );
  },
};
