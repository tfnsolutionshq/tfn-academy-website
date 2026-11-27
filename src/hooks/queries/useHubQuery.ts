import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/core/query';
import { hubService } from '@/services/hub.service';
import type {
  ApiError,
  ApiHubBookingPayload,
  ApiHubBookingResponse,
  ApiHubOverview,
  ApiHubQuotePayload,
  ApiHubQuoteResponse,
  ApiHubSpace,
} from '@/core/api';

/**
 * Fetch TFN Hub overview (`GET /hub`)
 */
export function useHubOverviewQuery() {
  return useQuery<ApiHubOverview, ApiError>({
    queryKey: queryKeys.hub.overview(),
    queryFn: hubService.getOverview,
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Fetch active hub spaces (`GET /hub/spaces`)
 */
export function useHubSpacesQuery() {
  return useQuery<ApiHubSpace[], ApiError>({
    queryKey: queryKeys.hub.spaces(),
    queryFn: hubService.getSpaces,
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Fetch single hub space details (`GET /hub/spaces/:slug`)
 */
export function useHubSpaceDetailQuery(slug?: string) {
  return useQuery<ApiHubSpace, ApiError>({
    queryKey: queryKeys.hub.spaceDetail(slug || ''),
    queryFn: () => hubService.getSpaceBySlug(slug!),
    enabled: Boolean(slug),
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Calculate booking quote (`POST /hub/quote`)
 */
export function useHubQuoteMutation() {
  return useMutation<ApiHubQuoteResponse, ApiError, ApiHubQuotePayload>({
    mutationFn: hubService.calculateQuote,
  });
}

/**
 * Submit hub booking request (`POST /hub/bookings`)
 */
export function useHubBookingMutation() {
  return useMutation<ApiHubBookingResponse, ApiError, ApiHubBookingPayload>({
    mutationFn: hubService.submitBooking,
  });
}
