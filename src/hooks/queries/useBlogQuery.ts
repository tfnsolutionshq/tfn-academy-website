import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/core/query';
import { blogService } from '@/services/blog.service';
import type {
  ApiBlogBodyBlock,
  ApiBlogCategory,
  ApiBlogListParams,
  ApiBlogPostDetail,
  ApiBlogPostSummary,
  ApiError,
  PaginatedResponse,
} from '@/core/api';
import { BLOG } from '@/shared/constants/academyData';
import type { BlogBlock, BlogPost } from '@/shared/types/academy';

function mapBodyBlock(block: ApiBlogBodyBlock): BlogBlock {
  if (block.type === 'heading') return ['h', block.text || ''];
  if (block.type === 'list') return ['ul', block.items || []];
  return ['p', block.text || ''];
}

export function mapApiBlogSummaryToPost(p: ApiBlogPostSummary): BlogPost {
  const existing = BLOG.find((b) => b.slug === p.slug);
  return {
    slug: p.slug,
    t: p.title,
    cat: p.category?.name || existing?.cat || 'General',
    read: p.read_time_label || (p.read_time ? `${p.read_time} min read` : existing?.read || ''),
    ic: p.cover_icon || existing?.ic || 'compass',
    v: existing?.v ?? 1,
    ex: p.excerpt || existing?.ex || '',
    body: existing?.body || [],
    coverUrl: p.cover_url,
    authorName: p.author_name,
  };
}

export function mapApiBlogDetailToPost(d: ApiBlogPostDetail): BlogPost {
  const existing = BLOG.find((b) => b.slug === d.slug);
  return {
    slug: d.slug,
    t: d.title,
    cat: d.category?.name || existing?.cat || 'General',
    read: d.read_time_label || (d.read_time ? `${d.read_time} min read` : existing?.read || ''),
    ic: d.cover_icon || existing?.ic || 'compass',
    v: existing?.v ?? 1,
    ex: d.excerpt || existing?.ex || '',
    body: d.body && d.body.length > 0 ? d.body.map(mapBodyBlock) : existing?.body || [],
    coverUrl: d.cover_url,
    authorName: d.author_name,
  };
}

/**
 * Fetch published blog posts (`GET /blog`)
 */
export function useBlogPostsQuery(params?: ApiBlogListParams) {
  return useQuery<PaginatedResponse<ApiBlogPostSummary>, ApiError>({
    queryKey: queryKeys.blog.list(params as Record<string, unknown>),
    queryFn: () => blogService.getPosts(params),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Fetch blog categories (`GET /blog/categories`)
 */
export function useBlogCategoriesQuery() {
  return useQuery<ApiBlogCategory[], ApiError>({
    queryKey: queryKeys.blog.categories(),
    queryFn: blogService.getCategories,
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Fetch single blog post detail (`GET /blog/:slug`)
 */
export function useBlogPostDetailQuery(slug?: string) {
  return useQuery<ApiBlogPostDetail, ApiError>({
    queryKey: queryKeys.blog.detail(slug || ''),
    queryFn: () => blogService.getPostBySlug(slug!),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
  });
}
