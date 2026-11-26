export interface ApiProgrammeCategory {
  id: string;
  slug: string;
  name: string;
  icon: string;
  sort_order: number;
  programmes_count: number;
}

export interface ApiProgrammeSummary {
  slug: string;
  short_name: string;
  tagline: string;
  tags: string[];
  category: string;
  icon: string;
  level_kinds: string[];
  certification_count: number;
  seats_available: number;
  is_featured: boolean;
}

export interface ApiProgrammeListParams {
  category?: string;
  q?: string;
  page?: number;
  per_page?: number;
}

export interface ApiProgrammeFiveQuestions {
  need_to_know: string;
  able_to_do: string;
  real_world_problem: string;
  proof_project: string;
  career_translation: string;
}

export interface ApiProgrammeCertification {
  id: string;
  name: string;
}

export interface ApiProgrammeModule {
  id: string;
  sort_order: number;
  name: string;
  description: string;
  is_capstone: boolean;
  is_certification_prep: boolean;
}

export interface ApiProgrammeProject {
  id: string;
  sort_order: number;
  label: string;
  description: string;
  is_capstone: boolean;
}

export interface ApiProgrammeLevel {
  id: string;
  kind: 'Beginner' | 'Advanced' | 'Single course' | string;
  sort_order: number;
  prerequisites: string;
  expectations: string;
  modules: ApiProgrammeModule[];
  projects: ApiProgrammeProject[];
}

export interface ApiProgrammeCohort {
  id: string;
  name: string;
  start_date: string | null;
  end_date: string | null;
  seats_available: number;
  status: string;
}

export interface ApiProgrammeDetail {
  id: string;
  slug: string;
  name: string;
  short_name: string;
  category: string;
  category_details: Omit<ApiProgrammeCategory, 'programmes_count'>;
  icon: string;
  tagline: string;
  tags: string[];
  tools_text: string;
  is_featured: boolean;
  published_at: string;
  five_questions: ApiProgrammeFiveQuestions;
  certifications: ApiProgrammeCertification[];
  levels: ApiProgrammeLevel[];
  seats_available: number;
  cohort: ApiProgrammeCohort | null;
  fee_kobo: number;
  fee: string;
  currency: string;
}

export interface ApiProgrammeRecommendPayload {
  interest: string;
  technical_level: number;
}
