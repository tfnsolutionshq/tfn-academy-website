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
    list: '/talent',
    detail: (code: string) => `/talent/${encodeURIComponent(code)}`,
  },
  applications: {
    submit: '/applications',
    status: (ref: string) => `/applications/status/${ref}`,
    initiatePayment: (applicationRef: string) =>
      `/applications/${encodeURIComponent(applicationRef)}/payments`,
  },
  promoCodes: {
    validate: '/promo-codes/validate',
  },
  payments: {
    status: (paymentRef: string) => `/payments/${encodeURIComponent(paymentRef)}`,
    verify: (paymentRef: string) => `/payments/${encodeURIComponent(paymentRef)}/verify`,
    transferMade: (paymentRef: string) =>
      `/payments/${encodeURIComponent(paymentRef)}/transfer-made`,
    receipt: (paymentRef: string) => `/payments/${encodeURIComponent(paymentRef)}/receipt`,
  },
  consultations: {
    request: '/consultations',
  },
  contact: {
    submit: '/contact',
    corporate: '/corporate-proposals',
  },
  certificates: {
    verify: (certificateNumber: string) =>
      `/certificates/verify/${encodeURIComponent(certificateNumber)}`,
  },
  hub: {
    overview: '/hub',
    spaces: '/hub/spaces',
    spaceDetail: (slug: string) => `/hub/spaces/${encodeURIComponent(slug)}`,
    quote: '/hub/quote',
    bookings: '/hub/bookings',
  },
  careers: {
    roles: '/careers/roles',
    roleDetail: (code: string) => `/careers/roles/${encodeURIComponent(code)}`,
    apply: '/careers/applications',
  },
  kids: {
    content: '/kids',
    register: '/kids/registrations',
  },
  corporate: {
    overview: '/corporate',
    request: '/corporate/requests',
  },
  blog: {
    list: '/blog',
    categories: '/blog/categories',
    detail: (slug: string) => `/blog/${encodeURIComponent(slug)}`,
  },
} as const;
