import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOG } from '@/shared/constants/academyData';
import { Icon } from '@/shared/components/ui/Icon';
import { BlogCard, BlogCover, CtaBand } from '@/shared/components/ui/Illustrations';
import { BlogCardSkeleton, Spinner } from '@/shared/components/ui/Loading';
import {
  mapApiBlogSummaryToPost,
  useBlogCategoriesQuery,
  useBlogPostsQuery,
} from '@/hooks/queries';
import type { BlogPost } from '@/shared/types/academy';

export default function BlogPage() {
  const [blogCat, setBlogCat] = useState('all');
  const [bq, setBq] = useState('');
  const [debouncedQ, setDebouncedQ] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQ(bq.trim()), 250);
    return () => clearTimeout(timer);
  }, [bq]);

  const { data: apiCategories } = useBlogCategoriesQuery();
  const {
    data: apiPostsPage,
    isLoading: isPostsLoading,
    isFetching: isPostsFetching,
    isError: isPostsError,
  } = useBlogPostsQuery({
    category: blogCat !== 'all' ? blogCat : undefined,
    q: debouncedQ || undefined,
    per_page: 20,
  });

  const categories = useMemo<Array<[slug: string, name: string]>>(() => {
    if (apiCategories && apiCategories.length > 0) {
      return [
        ['all', 'All articles'],
        ...[...apiCategories]
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((c): [string, string] => [c.slug, c.name]),
      ];
    }
    return [
      ['all', 'All articles'],
      ...Array.from(new Set(BLOG.map((b) => b.cat))).map((c): [string, string] => [c, c]),
    ];
  }, [apiCategories]);

  const q = bq.trim().toLowerCase();
  const localFiltered = useMemo(
    () =>
      BLOG.filter(
        (b) =>
          (blogCat === 'all' ||
            b.cat === blogCat ||
            b.cat.toLowerCase().replace(/[^a-z0-9]+/g, '-') === blogCat) &&
          (!q || (b.t + ' ' + b.ex + ' ' + b.cat).toLowerCase().includes(q)),
      ),
    [blogCat, q],
  );

  const list = useMemo<BlogPost[]>(() => {
    if (!isPostsError && apiPostsPage?.data) {
      return apiPostsPage.data.map(mapApiBlogSummaryToPost);
    }
    return localFiltered;
  }, [apiPostsPage, isPostsError, localFiltered]);

  const showFeatured = blogCat === 'all' && !debouncedQ && list.length > 0;
  const feat = showFeatured ? list[0] : null;
  const gridList = showFeatured ? list.slice(1) : list;

  return (
    <>
      <section className="phead">
        <div className="wrap">
          <div className="crumbs">
            <Link to="/">Home</Link>
            <Icon name="chevron-down" />
            <span>Blog</span>
          </div>
          <h1>The TFN Academy blog</h1>
          <p className="lede">
            Career advice, study tips and industry insights to help you learn, build and grow.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="toolbar">
            <div className="tabs-scroll" id="blogcats" style={{ margin: 0, paddingBottom: 2 }}>
              {categories.map(([slug, label]) => (
                <button
                  key={slug}
                  type="button"
                  className={`chip ${blogCat === slug ? 'on' : ''}`.trim()}
                  onClick={() => setBlogCat(slug)}
                >
                  {label}
                </button>
              ))}
            </div>
            <label className="search">
              <Icon name="search" />
              <input
                type="search"
                placeholder="Search articles"
                value={bq}
                onChange={(e) => setBq(e.target.value)}
                aria-label="Search articles"
              />
              {isPostsFetching && !isPostsLoading ? (
                <Spinner size="xs" variant="muted" label="Searching..." />
              ) : null}
            </label>
          </div>

          <div id="bgrid">
            {isPostsLoading && !apiPostsPage ? (
              <div className="blogs">
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
              </div>
            ) : !list.length ? (
              <div className="empty">
                <h3>No articles found</h3>
                <p>Try a different category or search term.</p>
                {bq || blogCat !== 'all' ? (
                  <p style={{ marginTop: 16 }}>
                    <button
                      type="button"
                      className="btn btn-line btn-sm"
                      onClick={() => {
                        setBq('');
                        setBlogCat('all');
                      }}
                    >
                      Reset filters
                    </button>
                  </p>
                ) : null}
              </div>
            ) : (
              <>
                {feat ? (
                  <Link className="bfeat" to={`/blog/${feat.slug}`}>
                    <BlogCover post={feat} />
                    <div className="bbody">
                      <div className="bmeta">
                        <span className="pill ac">{feat.cat}</span>
                        <span>{feat.read}</span>
                      </div>
                      <h3>{feat.t}</h3>
                      <p>{feat.ex}</p>
                      <span className="go tlink" style={{ alignSelf: 'flex-start' }}>
                        Read article <Icon name="arrow-right" />
                      </span>
                    </div>
                  </Link>
                ) : null}

                {gridList.length > 0 ? (
                  <div className="blogs">
                    {gridList.map((b) => (
                      <BlogCard key={b.slug} post={b} />
                    ))}
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </section>

      <section className="sec-sm">
        <div className="wrap">
          <CtaBand />
        </div>
      </section>
    </>
  );
}
