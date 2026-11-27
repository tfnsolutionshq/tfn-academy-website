import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/core/query';
import { corporateService } from '@/services/corporate.service';
import type {
  ApiCorporateOverview,
  ApiCorporateRequestPayload,
  ApiCorporateRequestResponse,
  ApiError,
} from '@/core/api';

/**
 * Fetch Corporate Training overview (`GET /corporate`)
 */
export function useCorporateOverviewQuery() {
  return useQuery<ApiCorporateOverview, ApiError>({
    queryKey: queryKeys.corporate.overview(),
    queryFn: corporateService.getOverview,
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Submit Corporate Training proposal request (`POST /corporate/requests`)
 */
export function useCorporateRequestMutation() {
  return useMutation<
    ApiCorporateRequestResponse,
    ApiError,
    ApiCorporateRequestPayload
  >({
    mutationFn: corporateService.submitRequest,
  });
}
