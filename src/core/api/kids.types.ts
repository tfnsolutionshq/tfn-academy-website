export interface ApiKidsProgramme {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  tags: string[];
  sort_order: number;
}

export interface ApiKidsContent {
  age_groups: string[];
  programmes: ApiKidsProgramme[];
}

export interface ApiKidsRegistrationPayload {
  parent_name: string;
  child_first_name: string;
  email: string;
  phone: string;
  age_group: string;
  programme: string;
  consent: boolean;
}

export interface ApiKidsRegistrationResponse extends ApiKidsRegistrationPayload {
  id?: string;
  created_at?: string;
}
