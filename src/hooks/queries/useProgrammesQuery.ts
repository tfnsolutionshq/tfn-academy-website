import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/core/query';
import { programmeService } from '@/services/programme.service';
import type {
  ApiProgrammeCategory,
  ApiProgrammeDetail,
  ApiProgrammeListParams,
  ApiProgrammeRecommendation,
  ApiProgrammeRecommendPayload,
  ApiProgrammeSummary,
  PaginatedResponse,
} from '@/core/api';
import { findTrack } from '@/shared/constants/academyData';
import type { ProgrammeLevel, Track } from '@/shared/types/academy';

/**
 * Map a lightweight API programme summary into the UI `Track` shape,
 * merging with static fallback metadata when available.
 */
export function mapApiSummaryToTrack(p: ApiProgrammeSummary): Track {
  const existing = findTrack(p.slug);
  if (existing) {
    return {
      ...existing,
      short: p.short_name || existing.short,
      line: p.tagline || existing.line,
      tags: p.tags?.length ? p.tags : existing.tags,
      ic: p.icon || existing.ic,
      cat: (p.category as Track['cat']) || existing.cat,
    };
  }

  return {
    slug: p.slug,
    name: p.short_name,
    short: p.short_name,
    ic: p.icon || 'blocks',
    cat: (p.category as Track['cat']) || 'software',
    line: p.tagline,
    tags: p.tags || [],
    tools: '',
    certs: [],
    fq: {
      'Need to know': '',
      'Able to do': '',
      'Real-world problem': '',
      'Proof project': '',
      'Career translation': '',
    },
    levels: (p.level_kinds || []).map((k) => ({
      kind: k as ProgrammeLevel['kind'],
      pre: '',
      expect: '',
      mods: [],
      projs: [],
    })),
  };
}

/**
 * Map a full API programme detail & curriculum payload into the UI `Track` shape.
 */
export function mapApiDetailToTrack(detail: ApiProgrammeDetail): Track {
  const sortedLevels = [...(detail.levels || [])].sort(
    (a, b) => a.sort_order - b.sort_order,
  );

  return {
    slug: detail.slug,
    name: detail.name || detail.short_name,
    short: detail.short_name || detail.name,
    ic: detail.icon || 'blocks',
    cat: (detail.category as Track['cat']) || 'software',
    line: detail.tagline || '',
    tags: detail.tags || [],
    tools: detail.tools_text || '',
    certs: (detail.certifications || []).map((c) => c.name),
    fq: {
      'Need to know': detail.five_questions?.need_to_know || '',
      'Able to do': detail.five_questions?.able_to_do || '',
      'Real-world problem': detail.five_questions?.real_world_problem || '',
      'Proof project': detail.five_questions?.proof_project || '',
      'Career translation': detail.five_questions?.career_translation || '',
    },
    levels: sortedLevels.map((lvl) => ({
      kind: lvl.kind as ProgrammeLevel['kind'],
      pre: lvl.prerequisites || '',
      expect: lvl.expectations || '',
      mods: [...(lvl.modules || [])]
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((m) => ({
          n: m.name,
          t: m.description,
          isCapstone: m.is_capstone,
          isCertPrep: m.is_certification_prep,
        })),
      projs: [...(lvl.projects || [])]
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((p) => ({
          k: p.label,
          t: p.description,
          isCapstone: p.is_capstone,
        })),
    })),
  };
}

/**
 * Fetch all programme categories (`GET /programme-categories`)
 */
export function useProgrammeCategoriesQuery() {
  return useQuery<ApiProgrammeCategory[]>({
    queryKey: queryKeys.programmes.categories(),
    queryFn: programmeService.getCategories,
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Fetch filterable & paginated programmes (`GET /programmes`)
 */
export function useProgrammesQuery(
  params?: ApiProgrammeListParams,
  options?: { enabled?: boolean },
) {
  return useQuery<PaginatedResponse<ApiProgrammeSummary>>({
    queryKey: queryKeys.programmes.list(params as Record<string, unknown>),
    queryFn: () => programmeService.getProgrammes(params),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    enabled: options?.enabled ?? true,
  });
}

/**
 * Fetch featured programmes (`GET /programmes/featured`)
 */
export function useFeaturedProgrammesQuery() {
  return useQuery<ApiProgrammeSummary[]>({
    queryKey: queryKeys.programmes.featured(),
    queryFn: programmeService.getFeatured,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Fetch single programme detail & curriculum (`GET /programmes/:slug`)
 */
export function useProgrammeDetailQuery(slug?: string) {
  return useQuery<ApiProgrammeDetail>({
    queryKey: queryKeys.programmes.detail(slug || ''),
    queryFn: () => programmeService.getProgrammeBySlug(slug!),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Recommend programmes (`POST /programmes/recommend`)
 */
export function useRecommendProgrammesMutation() {
  return useMutation<ApiProgrammeRecommendation[], Error, ApiProgrammeRecommendPayload>({
    mutationFn: programmeService.recommend,
  });
}
