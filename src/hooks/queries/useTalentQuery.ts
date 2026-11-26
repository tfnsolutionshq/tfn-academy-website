import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/core/query';
import { talentService } from '@/services/talent.service';
import type {
  ApiConsultationPayload,
  ApiConsultationResponse,
  ApiError,
  ApiTalentListParams,
  ApiTalentProfile,
  PaginatedResponse,
} from '@/core/api';

/**
 * Fetch published talent profiles (`GET /talent`)
 */
export function useTalentsQuery(params?: ApiTalentListParams) {
  return useQuery<PaginatedResponse<ApiTalentProfile>, ApiError>({
    queryKey: queryKeys.talents.list(params as Record<string, unknown>),
    queryFn: () => talentService.getTalents(params),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Fetch single talent profile by code (`GET /talent/:code`)
 */
export function useTalentDetailQuery(code?: string | null) {
  return useQuery<ApiTalentProfile, ApiError>({
    queryKey: queryKeys.talents.detail(code || ''),
    queryFn: () => talentService.getTalentByCode(code!),
    enabled: Boolean(code),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Submit hire-talent consultation request (`POST /consultations`)
 */
export function useConsultationMutation() {
  return useMutation<ApiConsultationResponse, ApiError, ApiConsultationPayload>({
    mutationFn: talentService.submitConsultation,
  });
}
