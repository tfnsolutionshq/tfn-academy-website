declare module '@paystack/inline-js' {
  interface PaystackResumeCallbacks {
    onSuccess?: (transaction: Record<string, unknown>) => void;
    onCancel?: () => void;
    onError?: (error: unknown) => void;
    onLoad?: (response: unknown) => void;
  }

  export default class PaystackPop {
    resumeTransaction(accessCode: string, callbacks?: PaystackResumeCallbacks): void;
  }
}
