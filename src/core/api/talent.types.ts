export interface ApiTalentProgramme {
  slug: string;
  short_name: string;
  name: string;
}

export interface ApiTalentProfile {
  id: string;
  code: string;
  name: string;
  role_title: string;
  skills: string[];
  availability: string;
  bio: string;
  signature_project: string;
  photo_url: string | null;
  programme: ApiTalentProgramme;
}

export interface ApiTalentListParams {
  programme?: string;
  page?: number;
  per_page?: number;
}

export interface ApiConsultationPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  need: string;
  engagement_type: string;
  budget_range: string;
  message: string;
  talent_code?: string;
  consent: boolean;
}

export interface ApiConsultationResponse {
  id: string;
  reference: string;
  status: string;
  need: string;
  engagement_type: string;
  budget_range: string;
  created_at: string;
}
