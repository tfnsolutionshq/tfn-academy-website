import { Link, Navigate, useParams } from 'react-router-dom';
import { BLOG } from '@/shared/constants/academyData';
import { Icon } from '@/shared/components/ui/Icon';
import { BlogCard, BlogCover } from '@/shared/components/ui/Illustrations';
import { useSite } from '@/shared/context/SiteContext';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { startApplyNew } = useSite();

  const b = BLOG.find((x) => x.slug === slug);
  if (!b) {
    return <Navigate to="/blog" replace />;
  }

  const more = BLOG.filter((x) => x.slug !== slug).slice(0, 3);

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
              <span>By the TFN Academy team</span>
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

