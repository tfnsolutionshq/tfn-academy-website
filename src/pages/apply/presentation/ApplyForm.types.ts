export interface ApplyFormState {
  path: 'paid' | 'scholarship';
  programmeSlug: string;
  scholarshipId: string;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  state: string;
  education: string;
  status: string;
  motivation: string;
  mode: 'in-person' | 'remote';
  promoCode: string;
  appliedPromo: { code: string; label: string; pct?: number; flat?: number } | null;
  paymentMethod: 'online' | 'transfer' | null;
  paid: boolean;
  reference: string;
}

export const initialApplyForm: ApplyFormState = {
  path: 'paid',
  programmeSlug: '',
  scholarshipId: '',
  fullName: '',
  email: '',
  phone: '',
  gender: '',
  state: '',
  education: '',
  status: '',
  motivation: '',
  mode: 'in-person',
  promoCode: '',
  appliedPromo: null,
  paymentMethod: null,
  paid: false,
  reference: '',
};
