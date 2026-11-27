import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/core/query';
import { certificateService } from '@/services/certificate.service';
import type { ApiCertificateVerification } from '@/core/api';

/**
 * Verify a graduate certificate (`GET /certificates/verify/:certificateNumber`)
 */
export function useVerifyCertificateQuery(certificateNumber: string) {
  const clean = certificateNumber.trim();
  return useQuery<ApiCertificateVerification>({
    queryKey: queryKeys.certificates.verify(clean),
    queryFn: () => certificateService.verify(clean),
    enabled: Boolean(clean),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}
