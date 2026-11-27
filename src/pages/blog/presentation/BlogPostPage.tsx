import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { BLOG } from '@/shared/constants/academyData';
import { Icon } from '@/shared/components/ui/Icon';
import { BlogCard, BlogCover } from '@/shared/components/ui/Illustrations';
import { GlobalLoading } from '@/shared/components/ui/Loading';
import { useSite } from '@/shared/context/SiteContext';
import {
  mapApiBlogDetailToPost,
  mapApiBlogSummaryToPost,
  useBlogPostDetailQuery,
} from '@/hooks/queries';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { startApplyNew } = useSite();

  const { data: apiDetail, isLoading: isDetailLoading } = useBlogPostDetailQuery(slug);

  const staticPost = useMemo(() => BLOG.find((x) => x.slug === slug), [slug]);
  const b = useMemo(() => {
    if (apiDetail) return mapApiBlogDetailToPost(apiDetail);
    return staticPost;
  }, [apiDetail, staticPost]);

  const more = useMemo(() => {
    if (apiDetail?.related_posts && apiDetail.related_posts.length > 0) {
      return apiDetail.related_posts.slice(0, 3).map(mapApiBlogSummaryToPost);
    }
    return BLOG.filter((x) => x.slug !== slug).slice(0, 3);
  }, [apiDetail?.related_posts, slug]);

  if (isDetailLoading && !b) {
    return <GlobalLoading message="Loading article..." />;
  }

  if (!b) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <section className="phead">
        <div className="wrap">
          <div className="article">
            <div className="crumbs">
              <Link to="/">Home</Link>
              <Icon name="chevron-down" />
              <Link to="/blog">Blog</Link>
              <Icon name="chevron-down" />
              <span>{b.cat}</span>
            </div>
            <div className="bmeta">
              <span className="pill ac">{b.cat}</span>
              <span>{b.read}</span>
              <span>By {b.authorName || 'the TFN Academy team'}</span>
            </div>
            <h1>{b.t}</h1>
            <p className="lede">{b.ex}</p>
            <BlogCover post={b} extraClass="cover" />

            {b.body.map(([k, v], idx) => {
              if (k === 'p') return <p key={idx}>{v as string}</p>;
              if (k === 'h') return <h3 key={idx}>{v as string}</h3>;
              return (
                <ul key={idx}>
                  {(v as string[]).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            })}

            <div className="callout">
              <Icon name="graduation-cap" />
              <span>
                Ready to put this into practice? <Link to="/programmes">Explore our programmes</Link>{' '}
                or{' '}
                <Link to="/apply" onClick={startApplyNew}>
                  apply now
                </Link>
                .
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-sm on-mist">
        <div className="wrap">
          <h2 style={{ fontSize: '1.9rem', marginBottom: 28 }}>Keep reading</h2>
          <div className="blogs">
            {more.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
