export interface ApiContactPayload {
  name: string;
  email: string;
  phone?: string;
  topic: string;
  message: string;
  consent: boolean;
}

export interface ApiContactResponse {
  id: string;
  reference: string;
  status: string;
  topic: string;
  created_at: string;
}
