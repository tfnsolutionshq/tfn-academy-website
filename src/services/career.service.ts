import { httpClient, ENDPOINTS } from '@/core/api';
import type {
  ApiCareerApplicationPayload,
  ApiCareerApplicationResponse,
  ApiCareerRole,
} from '@/core/api';

export const careerService = {
  /**
   * Fetch open career roles (`GET /careers/roles`, optionally filtered by `department`)
   */
  getRoles: async (department?: string): Promise<ApiCareerRole[]> => {
    const qs =
      department && department !== 'all'
        ? `?department=${encodeURIComponent(department)}`
        : '';
    return httpClient.get<ApiCareerRole[]>(`${ENDPOINTS.careers.roles}${qs}`);
  },

  /**
   * Fetch single career role details (`GET /careers/roles/:code`)
   */
  getRoleByCode: async (code: string): Promise<ApiCareerRole> => {
    return httpClient.get<ApiCareerRole>(ENDPOINTS.careers.roleDetail(code));
  },

  /**
   * Submit career application as multipart/form-data (`POST /careers/applications`)
   */
  submitApplication: async (
    payload: ApiCareerApplicationPayload,
  ): Promise<ApiCareerApplicationResponse> => {
    const fd = new FormData();
    fd.append('role_code', payload.role_code);
    fd.append('name', payload.name);
    fd.append('email', payload.email);
    fd.append('phone', payload.phone);
    if (payload.link && payload.link.trim()) {
      fd.append('link', payload.link.trim());
    }
    if (payload.cv) {
      fd.append('cv', payload.cv);
    }
    fd.append('message', payload.message);
    fd.append('consent', payload.consent === false ? '0' : '1');

    return httpClient.postForm<ApiCareerApplicationResponse>(
      ENDPOINTS.careers.apply,
      fd,
    );
  },
};
