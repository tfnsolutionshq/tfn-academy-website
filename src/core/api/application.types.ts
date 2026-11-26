export type ApplicationType = 'paid' | 'scholarship';
export type StartingPoint = 'Beginner' | 'Advanced' | 'Unsure';

export interface ApiApplicationPayload {
  type: ApplicationType;
  programme_slug: string;
  starting_point?: StartingPoint | string;
  name: string;
  gender: string;
  dob: string;
  email: string;
  phone: string;
  whatsapp: string;
  state: string;
  address: string;
  education_level: string;
  current_status: string;
  heard_about: string;
  environment: string;
  consent: boolean;
  // Conditional scholarship fields
  scholarship_code?: string | null;
  motivation?: string;
  supporting_details?: string;
  financial_circumstances?: string;
  portfolio_url?: string;
  // Conditional minor (< 18) fields
  guardian_name?: string;
  guardian_phone?: string;
}

export interface ApiApplicationResponse {
  id?: string;
  reference?: string;
  ref?: string;
  admission_number?: string;
  type?: ApplicationType;
  status?: string;
  programme_slug?: string;
  course_fee_kobo?: number;
  course_fee?: string;
  amount_due_kobo?: number;
  amount_due?: string;
  currency?: string;
  created_at?: string;
}
