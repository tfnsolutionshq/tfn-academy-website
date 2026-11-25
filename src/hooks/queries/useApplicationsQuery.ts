import { useMutation } from '@tanstack/react-query';
import { applicationService } from '@/services/application.service';
import type {
  ApiApplicationPayload,
  ApiApplicationResponse,
  ApiError,
} from '@/core/api';

/**
 * Mutation hook to submit a paid enrolment or scholarship application (`POST /applications`)
 */
export function useSubmitApplicationMutation() {
  return useMutation<ApiApplicationResponse, ApiError, ApiApplicationPayload>({
    mutationFn: applicationService.submit,
  });
}
