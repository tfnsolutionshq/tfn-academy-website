export interface ApiCareerRole {
  id: string;
  code: string;
  title: string;
  department: string;
  employment_type: string;
  location: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  status: string;
  sort_order: number;
}

export interface ApiCareerApplicationPayload {
  role_code: string;
  name: string;
  email: string;
  phone: string;
  link?: string;
  cv?: File | null;
  message: string;
  consent?: boolean;
}

export interface ApiCareerApplicationResponse {
  id?: string;
  reference?: string;
  role_code?: string;
  status?: string;
  created_at?: string;
}
