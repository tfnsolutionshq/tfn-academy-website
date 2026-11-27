import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/core/query';
import { kidsService } from '@/services/kids.service';
import type {
  ApiError,
  ApiKidsContent,
  ApiKidsRegistrationPayload,
  ApiKidsRegistrationResponse,
} from '@/core/api';

/**
 * Fetch Kids & Teens content (`GET /kids`)
 */
export function useKidsContentQuery() {
  return useQuery<ApiKidsContent, ApiError>({
    queryKey: queryKeys.kids.content(),
    queryFn: kidsService.getContent,
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Submit Kids & Teens registration (`POST /kids/registrations`)
 */
export function useKidsRegistrationMutation() {
  return useMutation<
    ApiKidsRegistrationResponse,
    ApiError,
    ApiKidsRegistrationPayload
  >({
    mutationFn: kidsService.register,
  });
}
