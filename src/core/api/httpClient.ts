import { ApiError, type ApiEnvelope } from './types';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

function normalizeErrors(errors: unknown): Record<string, string[]> {
  if (!errors || typeof errors !== 'object') return {};
  const out: Record<string, string[]> = {};
  for (const [field, value] of Object.entries(errors as Record<string, unknown>)) {
    if (typeof value === 'string') out[field] = [value];
    else if (Array.isArray(value)) out[field] = value.map(String).filter(Boolean);
  }
  return out;
}

function fallbackMessage(status: number): string {
  if (status === 401) return 'Your session has expired. Please log in again.';
  if (status === 403) return 'You do not have permission to perform this action.';
  if (status === 404) return 'The requested resource was not found.';
  if (status >= 500) return 'The server is temporarily unavailable. Please try again.';
  return `Request failed (${status}).`;
}

export class HttpClient {
  private readonly baseUrl: string;
  private readonly getToken: () => string | null;

  constructor(
    baseUrl?: string,
    getToken: () => string | null = () => localStorage.getItem('tfn_token'),
  ) {
    const rawUrl = baseUrl || (import.meta.env.VITE_API_BASE_URL as string) || 'https://api.academy.tfnsolutions.us/api/v1';
    this.baseUrl = rawUrl.replace(/\/+$/, '');
    this.getToken = getToken;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  async request<T>(
    method: HttpMethod,
    path: string,
    body?: unknown,
    customHeaders?: HeadersInit,
    unwrapData = true,
  ): Promise<T> {
    const token = this.getToken();
    const url = `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;

    let res: Response;
    try {
      res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...customHeaders,
        },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
    } catch {
      throw new ApiError(
        'We couldn’t reach the server. Please check your connection and try again.',
        0,
      );
    }

    const text = await res.text();
    let payload: unknown;
    if (text) {
      try {
        payload = JSON.parse(text);
      } catch {
        payload = text;
      }
    }

    if (!res.ok) {
      const envelope = payload as Partial<ApiEnvelope<unknown>> | null | undefined;
      throw new ApiError(
        envelope?.message || fallbackMessage(res.status),
        res.status,
        normalizeErrors(envelope?.errors),
        payload,
      );
    }

    if (unwrapData && payload && typeof payload === 'object' && 'data' in payload) {
      return (payload as ApiEnvelope<T>).data as T;
    }

    return payload as T;
  }

  get<T>(path: string, headers?: HeadersInit) {
    return this.request<T>('GET', path, undefined, headers, true);
  }

  /**
   * Perform a GET request without unwrapping the `{ data, links, meta }` envelope.
   * Useful for paginated endpoints.
   */
  getRaw<T>(path: string, headers?: HeadersInit) {
    return this.request<T>('GET', path, undefined, headers, false);
  }

  async getBlob(path: string, customHeaders?: HeadersInit): Promise<Blob> {
    const token = this.getToken();
    const url = `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;

    let res: Response;
    try {
      res = await fetch(url, {
        method: 'GET',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...customHeaders,
        },
      });
    } catch {
      throw new ApiError(
        'We couldn’t reach the server. Please check your connection and try again.',
        0,
      );
    }

    if (!res.ok) {
      throw new ApiError(fallbackMessage(res.status), res.status);
    }

    return res.blob();
  }

  post<T>(path: string, body?: unknown, headers?: HeadersInit) {
    return this.request<T>('POST', path, body, headers);
  }

  put<T>(path: string, body?: unknown, headers?: HeadersInit) {
    return this.request<T>('PUT', path, body, headers);
  }

  patch<T>(path: string, body?: unknown, headers?: HeadersInit) {
    return this.request<T>('PATCH', path, body, headers);
  }

  delete<T>(path: string, headers?: HeadersInit) {
    return this.request<T>('DELETE', path, undefined, headers);
  }
}

export const httpClient = new HttpClient();
