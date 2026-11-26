import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/core/query';
import { careerService } from '@/services/career.service';
import type {
  ApiCareerApplicationPayload,
  ApiCareerApplicationResponse,
  ApiCareerRole,
  ApiError,
} from '@/core/api';

/**
 * Fetch open career roles (`GET /careers/roles`)
 */
export function useCareerRolesQuery(department?: string) {
  return useQuery<ApiCareerRole[], ApiError>({
    queryKey: queryKeys.careers.roles(department),
    queryFn: () => careerService.getRoles(department),
    placeholderData: keepPreviousData,
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Fetch single career role details (`GET /careers/roles/:code`)
 */
export function useCareerRoleDetailQuery(code?: string) {
  return useQuery<ApiCareerRole, ApiError>({
    queryKey: queryKeys.careers.roleDetail(code || ''),
    queryFn: () => careerService.getRoleByCode(code!),
    enabled: Boolean(code) && code !== 'general',
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Submit career application with optional CV (`POST /careers/applications`)
 */
export function useCareerApplicationMutation() {
  return useMutation<
    ApiCareerApplicationResponse,
    ApiError,
    ApiCareerApplicationPayload
  >({
    mutationFn: careerService.submitApplication,
  });
}
