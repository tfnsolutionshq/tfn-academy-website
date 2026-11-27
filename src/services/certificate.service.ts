import { httpClient, ENDPOINTS } from '@/core/api';
import type { ApiCertificateVerification } from '@/core/api';

export const certificateService = {
  /**
   * Verify a graduate certificate by certificate number (`GET /certificates/verify/:number`)
   */
  verify: async (certificateNumber: string): Promise<ApiCertificateVerification> => {
    return httpClient.get<ApiCertificateVerification>(
      ENDPOINTS.certificates.verify(certificateNumber.trim()),
    );
  },
};
