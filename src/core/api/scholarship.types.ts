export interface ApiScholarshipEligibilityRule {
  type: 'age_range' | 'gender' | 'max_age_exclusive' | string;
  min?: number;
  max?: number;
  equals?: string;
  value?: number;
  guardian_consent_required?: boolean;
}

export interface ApiScholarship {
  id: string;
  code: string;
  name: string;
  percent: number;
  icon: string;
  badge: string | null;
  description: string;
  requirements: string[];
  applicant_prompt: string;
  requires_financial_circumstances: boolean;
  eligibility_rule: ApiScholarshipEligibilityRule | null;
  is_draft_addition: boolean;
  course_fee_kobo: number;
  course_fee: string;
  coverage_kobo: number;
  coverage: string;
  balance_kobo: number;
  balance: string;
  currency: string;
}
