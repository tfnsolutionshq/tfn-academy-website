export interface ApiFeaturedProgramme {
  slug: string;
  short_name: string;
  tagline: string;
  tags: string[];
  category: string;
  icon: string;
  level_kinds: string[];
  certification_count: number;
  seats_available: number;
  is_featured: boolean;
}

export interface ApiBlogPostCategory {
  slug: string;
  name: string;
}

export interface ApiLatestBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: ApiBlogPostCategory;
  cover_url: string | null;
  cover_icon: string;
  author_name: string;
  read_time: number;
  read_time_label: string;
  published_at: string;
}

export interface ApiTestimonial {
  id: string;
  student_name: string;
  programme_slug: string;
  programme_label: string;
  quote: string;
  sort_order: number;
}

export interface ApiHubPrice {
  plan: string;
  label: string;
  unit: string;
  price_kobo: number;
  price: string;
  currency: string;
}

export interface ApiHubSpace {
  id: string;
  slug: string;
  name: string;
  capacity: number;
  badge: string | null;
  description: string;
  features: string[];
  icon: string;
  price_per_seat: boolean;
  is_exclusive: boolean;
  sort_order: number;
  prices: ApiHubPrice[];
}

export interface ApiHubAmenity {
  id: string;
  slug: string;
  icon: string;
  title: string;
  description: string;
  sort_order: number;
}

export interface ApiHubTeaser {
  address: string;
  closing_time: string;
  currency: string;
  spaces: ApiHubSpace[];
  amenities: ApiHubAmenity[];
}

export interface ApiHomeStats {
  programmes_count: number;
  certifications_count: number;
}

export interface HomeAggregateData {
  featured_programmes: ApiFeaturedProgramme[];
  latest_blog_posts: ApiLatestBlogPost[];
  testimonials: ApiTestimonial[];
  hub_teaser: ApiHubTeaser;
  stats: ApiHomeStats;
}
