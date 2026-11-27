export interface ApiCorporateTrainingArea {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  sort_order: number;
}

export interface ApiCorporateNamedItem {
  name: string;
  description: string;
}

export interface ApiCorporateProcessStep {
  step: number;
  title: string;
  description: string;
}

export type CorporateDeliveryPreference = 'on_site' | 'online' | 'either';

export interface ApiCorporateOverview {
  training_areas: ApiCorporateTrainingArea[];
  formats: ApiCorporateNamedItem[];
  customisation: ApiCorporateNamedItem[];
  who_we_train: string[];
  process_steps: ApiCorporateProcessStep[];
  delivery_options: CorporateDeliveryPreference[];
}

export interface ApiCorporateRequestPayload {
  organisation: string;
  industry: string;
  team_size: string;
  training_areas: string[];
  delivery_preference: CorporateDeliveryPreference;
  contact_name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
}

export interface ApiCorporateRequestResponse {
  id: string;
  reference: string;
  status: string;
  organisation: string;
  training_areas: string[];
  delivery_preference: CorporateDeliveryPreference;
  created_at: string;
}
