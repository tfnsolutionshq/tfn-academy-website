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
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.talents.all, 'list', params ?? {}] as const,
    detail: (code: string) => [...queryKeys.talents.all, 'detail', code] as const,
  },
  applications: {
    all: ['applications'] as const,
    status: (ref: string) => [...queryKeys.applications.all, 'status', ref] as const,
  },
  hub: {
    all: ['hub'] as const,
    overview: () => [...queryKeys.hub.all, 'overview'] as const,
    spaces: () => [...queryKeys.hub.all, 'spaces'] as const,
    spaceDetail: (slug: string) => [...queryKeys.hub.all, 'space', slug] as const,
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
  payments: {
    all: ['payments'] as const,
    status: (paymentRef: string, email: string) =>
      [...queryKeys.payments.all, 'status', paymentRef, email] as const,
  },
  kids: {
    all: ['kids'] as const,
    content: () => [...queryKeys.kids.all, 'content'] as const,
  },
  corporate: {
    all: ['corporate'] as const,
    overview: () => [...queryKeys.corporate.all, 'overview'] as const,
  },
  blog: {
    all: ['blog'] as const,
    categories: () => [...queryKeys.blog.all, 'categories'] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.blog.all, 'list', params ?? {}] as const,
    detail: (slug: string) => [...queryKeys.blog.all, 'detail', slug] as const,
  },
  careers: {
    all: ['careers'] as const,
    roles: (department?: string) =>
      [...queryKeys.careers.all, 'roles', department ?? 'all'] as const,
    roleDetail: (code: string) => [...queryKeys.careers.all, 'role', code] as const,
  },
} as const;
