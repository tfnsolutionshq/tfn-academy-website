export interface ApiBlogCategory {
  id: string;
  slug: string;
  name: string;
  sort_order: number;
  posts_count: number;
}

export interface ApiBlogPostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: {
    slug: string;
    name: string;
  };
  cover_url: string | null;
  cover_icon: string;
  author_name: string;
  read_time: number;
  read_time_label: string;
  published_at: string;
}

export interface ApiBlogBodyBlock {
  type: 'paragraph' | 'heading' | 'list' | string;
  text?: string;
  items?: string[];
}

export interface ApiBlogPostDetail extends ApiBlogPostSummary {
  body: ApiBlogBodyBlock[];
  related_posts: ApiBlogPostSummary[];
}

export interface ApiBlogListParams {
  category?: string;
  q?: string;
  page?: number;
  per_page?: number;
}
