export type PaymentMethod = 'online' | 'transfer';

export interface ApiPromoValidatePayload {
  code: string;
  application_reference: string;
}

export interface ApiPromoValidateResponse {
  code: string;
  type: 'percent' | 'flat' | string;
  value: number;
  label: string;
  fee_kobo: number;
  fee: string;
  discount_kobo: number;
  discount: string;
  total_due_kobo: number;
  total_due: string;
  currency: string;
}

export interface ApiInitiatePaymentPayload {
  method: PaymentMethod;
  promo_code?: string;
  callback_url?: string;
  email: string;
}

export interface ApiBankDetails {
  bank_name: string;
  account_name: string;
  account_number: string;
}

export interface ApiPaymentPromo {
  code: string;
  type: string;
  value: number;
  label: string;
}

export interface ApiPaymentResponse {
  reference: string;
  application_reference: string;
  method: PaymentMethod | string;
  status:
    | 'pending'
    | 'awaiting_verification'
    | 'paid'
    | 'confirmed'
    | 'success'
    | 'failed'
    | 'expired'
    | string;
  currency: string;
  fee_kobo: number;
  fee: string;
  discount_kobo: number;
  discount: string;
  amount_due_kobo: number;
  amount_due: string;
  promo_code: ApiPaymentPromo | null;
  paid_at: string | null;
  bank?: ApiBankDetails | null;
  narration?: string | null;
  expires_at?: string | null;
  seconds_remaining?: number | null;
  // Online gateway checkout fields (Paystack)
  gateway?: string | null;
  gateway_reference?: string | null;
  access_code?: string | null;
  authorization_url?: string | null;
  checkout_url?: string | null;
  payment_url?: string | null;
}

export interface ApiMarkTransferMadePayload {
  email: string;
}

export interface ApiPaymentReceiptResponse {
  url?: string;
  receipt_url?: string;
  signed_url?: string;
}
