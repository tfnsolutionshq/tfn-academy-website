import { httpClient, ENDPOINTS } from '@/core/api';
import type {
  ApiInitiatePaymentPayload,
  ApiMarkTransferMadePayload,
  ApiPaymentReceiptResponse,
  ApiPaymentResponse,
  ApiPromoValidatePayload,
  ApiPromoValidateResponse,
} from '@/core/api';

export const paymentService = {
  /**
   * Validate a promo/discount code against an application (`POST /promo-codes/validate`)
   */
  validatePromoCode: async (
    payload: ApiPromoValidatePayload,
  ): Promise<ApiPromoValidateResponse> => {
    return httpClient.post<ApiPromoValidateResponse>(
      ENDPOINTS.promoCodes.validate,
      payload,
    );
  },

  /**
   * Initiate payment for an application (`POST /applications/:application_reference/payments`)
   */
  initiatePayment: async (
    applicationReference: string,
    payload: ApiInitiatePaymentPayload,
  ): Promise<ApiPaymentResponse> => {
    return httpClient.post<ApiPaymentResponse>(
      ENDPOINTS.applications.initiatePayment(applicationReference),
      payload,
    );
  },

  /**
   * Check payment status (`GET /payments/:payment_reference?email=:email`)
   */
  getPaymentStatus: async (
    paymentReference: string,
    email: string,
  ): Promise<ApiPaymentResponse> => {
    const qs = `?email=${encodeURIComponent(email)}`;
    return httpClient.get<ApiPaymentResponse>(
      `${ENDPOINTS.payments.status(paymentReference)}${qs}`,
    );
  },

  /**
   * Verify an online (Paystack) payment (`POST /payments/:payment_reference/verify`,
   * with automatic GET fallback if backend registered it as GET)
   */
  verifyPayment: async (
    paymentReference: string,
    email: string,
  ): Promise<ApiPaymentResponse> => {
    const path = ENDPOINTS.payments.verify(paymentReference);
    try {
      return await httpClient.post<ApiPaymentResponse>(path, { email });
    } catch (err: unknown) {
      const apiErr = err as { status?: number };
      if (apiErr?.status === 405) {
        return httpClient.get<ApiPaymentResponse>(
          `${path}?email=${encodeURIComponent(email)}`,
        );
      }
      throw err;
    }
  },

  /**
   * Mark a bank transfer as made (`POST /payments/:payment_reference/transfer-made`)
   */
  markTransferMade: async (
    paymentReference: string,
    payload: ApiMarkTransferMadePayload,
  ): Promise<ApiPaymentResponse> => {
    return httpClient.post<ApiPaymentResponse>(
      ENDPOINTS.payments.transferMade(paymentReference),
      payload,
    );
  },

  /**
   * Get signed payment receipt URL (`GET /payments/:payment_reference/receipt?email=:email`)
   */
  getReceiptUrl: async (
    paymentReference: string,
    email: string,
  ): Promise<string | null> => {
    const qs = `?email=${encodeURIComponent(email)}`;
    const res = await httpClient.get<ApiPaymentReceiptResponse | string>(
      `${ENDPOINTS.payments.receipt(paymentReference)}${qs}`,
    );
    if (typeof res === 'string') return res;
    return res?.url || res?.receipt_url || res?.signed_url || null;
  },
};
