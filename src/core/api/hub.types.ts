import type { ApiHubAmenity, ApiHubSpace } from './home.types';

export type HubPlanCode = 'hourly' | 'daily' | 'monthly' | 'annual';

export interface ApiHubPlan {
  id: string;
  code: HubPlanCode;
  label: string;
  unit: string;
  description: string;
  max_units: number;
}

export interface ApiHubOverview {
  address: string;
  opening_time: string;
  closing_time: string;
  currency: string;
  plans: ApiHubPlan[];
  spaces: ApiHubSpace[];
  amenities: ApiHubAmenity[];
}

export interface ApiHubQuotePayload {
  space: string;
  plan: HubPlanCode;
  units: number;
  guests: number;
  start_date: string;
  start_time: string;
}

export interface ApiHubQuoteResponse {
  space?: string;
  plan?: HubPlanCode;
  units?: number;
  guests?: number;
  start_date?: string;
  start_time?: string;
  end_date?: string;
  end_time?: string;
  unit_price_kobo?: number;
  unit_price?: string;
  total_kobo?: number;
  total?: string;
  estimated_total_kobo?: number;
  estimated_total?: string;
  currency?: string;
}

export interface ApiHubBookingPayload extends ApiHubQuotePayload {
  name: string;
  email: string;
  phone: string;
  notes?: string;
  consent: boolean;
}

export interface ApiHubBookingResponse {
  id?: string;
  reference?: string;
  status?: string;
  space?: string;
  plan?: HubPlanCode;
  total?: string;
  total_kobo?: number;
  created_at?: string;
}
