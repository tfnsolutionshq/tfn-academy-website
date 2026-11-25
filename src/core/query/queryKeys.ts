/**
 * Type-safe query key factory to guarantee consistent keys for cache invalidation
 */
export const queryKeys = {
  home: {
    aggregate: ['home', 'aggregate'] as const,
  },
  programmes: {
    all: ['programmes'] as const,
    categories: () => [...queryKeys.programmes.all, 'categories'] as const,
    featured: () => [...queryKeys.programmes.all, 'featured'] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.programmes.all, 'list', params ?? {}] as const,
    detail: (slug: string) => [...queryKeys.programmes.all, 'detail', slug] as const,
  },
  talents: {
    all: ['talents'] as const,
    list: (niche?: string) => [...queryKeys.talents.all, 'list', { niche }] as const,
    detail: (id: string) => [...queryKeys.talents.all, 'detail', id] as const,
  },
  applications: {
    all: ['applications'] as const,
    status: (ref: string) => [...queryKeys.applications.all, 'status', ref] as const,
  },
  hub: {
    all: ['hub'] as const,
    spaces: () => [...queryKeys.hub.all, 'spaces'] as const,
  },
  faqs: {
    all: ['faqs'] as const,
    list: () => [...queryKeys.faqs.all, 'list'] as const,
  },
  scholarships: {
    all: ['scholarships'] as const,
    list: () => [...queryKeys.scholarships.all, 'list'] as const,
    detail: (code: string, programmeSlug?: string) =>
      [...queryKeys.scholarships.all, 'detail', code, programmeSlug ?? null] as const,
  },
} as const;
