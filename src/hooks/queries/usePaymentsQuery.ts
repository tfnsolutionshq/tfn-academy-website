import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/core/query';
import { paymentService } from '@/services/payment.service';
import type {
  ApiError,
  ApiInitiatePaymentPayload,
  ApiPaymentResponse,
  ApiPromoValidatePayload,
  ApiPromoValidateResponse,
} from '@/core/api';

/**
 * Validate promo code (`POST /promo-codes/validate`)
 */
export function useValidatePromoMutation() {
  return useMutation<ApiPromoValidateResponse, ApiError, ApiPromoValidatePayload>({
    mutationFn: paymentService.validatePromoCode,
  });
}

/**
 * Initiate application payment (`POST /applications/:application_reference/payments`)
 */
export function useInitiatePaymentMutation() {
  return useMutation<
    ApiPaymentResponse,
    ApiError,
    { applicationReference: string; payload: ApiInitiatePaymentPayload }
  >({
    mutationFn: ({ applicationReference, payload }) =>
      paymentService.initiatePayment(applicationReference, payload),
  });
}

/**
 * Check/poll payment status (`GET /payments/:payment_reference?email=:email`)
 */
export function usePaymentStatusQuery(
  paymentReference?: string,
  email?: string,
  options?: { enabled?: boolean; refetchInterval?: number | false },
) {
  return useQuery<ApiPaymentResponse, ApiError>({
    queryKey: queryKeys.payments.status(paymentReference || '', email || ''),
    queryFn: () => paymentService.getPaymentStatus(paymentReference!, email!),
    enabled: Boolean(paymentReference && email) && (options?.enabled ?? true),
    refetchInterval: options?.refetchInterval ?? false,
    staleTime: 0,
  });
}

/**
 * Verify an online (Paystack) payment (`POST /payments/:payment_reference/verify`)
 */
export function useVerifyPaymentMutation() {
  return useMutation<
    ApiPaymentResponse,
    ApiError,
    { paymentReference: string; email: string }
  >({
    mutationFn: ({ paymentReference, email }) =>
      paymentService.verifyPayment(paymentReference, email),
  });
}

/**
 * Mark bank transfer as made (`POST /payments/:payment_reference/transfer-made`)
 */
export function useMarkTransferMadeMutation() {
  return useMutation<
    ApiPaymentResponse,
    ApiError,
    { paymentReference: string; email: string }
  >({
    mutationFn: ({ paymentReference, email }) =>
      paymentService.markTransferMade(paymentReference, { email }),
  });
}
