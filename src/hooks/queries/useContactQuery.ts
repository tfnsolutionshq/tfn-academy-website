import { useMutation } from '@tanstack/react-query';
import { contactService } from '@/services/contact.service';
import type { ApiContactPayload, ApiContactResponse } from '@/core/api';

/**
 * Submit a contact message (`POST /contact`)
 */
export function useSubmitContactMutation() {
  return useMutation<ApiContactResponse, Error, ApiContactPayload>({
    mutationFn: contactService.submitMessage,
  });
}
