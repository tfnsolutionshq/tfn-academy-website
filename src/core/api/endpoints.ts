/**
 * Central dictionary for API endpoint paths.
 * Repositories pass these relative paths to HttpClient.
 */
export const ENDPOINTS = {
  home: {
    aggregate: '/home',
  },
  faqs: {
    list: '/faqs',
  },
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
  },
  programmes: {
    categories: '/programme-categories',
    list: '/programmes',
    featured: '/programmes/featured',
    detail: (slug: string) => `/programmes/${slug}`,
    syllabus: (slug: string) => `/programmes/${slug}/syllabus`,
    recommend: '/programmes/recommend',
  },
  scholarships: {
    list: '/scholarships',
    detail: (code: string) => `/scholarships/${code}`,
  },
  talents: {
    list: '/talents',
    detail: (id: string) => `/talents/${id}`,
  },
  applications: {
    submit: '/applications',
    status: (ref: string) => `/applications/status/${ref}`,
  },
  consultations: {
    request: '/consultations',
  },
  contact: {
    submit: '/contact',
    corporate: '/corporate-proposals',
  },
  hub: {
    spaces: '/hub/spaces',
    reserve: '/hub/reservations',
  },
  careers: {
    apply: '/careers/apply',
  },
} as const;
