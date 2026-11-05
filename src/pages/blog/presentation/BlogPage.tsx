import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOG } from '@/shared/constants/academyData';
import { Icon } from '@/shared/components/ui/Icon';
import { BlogCard, BlogCover, CtaBand, OdTag } from '@/shared/components/ui/Illustrations';

export default function BlogPage() {
  const [blogCat, setBlogCat] = useState('all');
  const [bq, setBq] = useState('');

  const categories = ['all', ...Array.from(new Set(BLOG.map((b) => b.cat)))];
  const q = bq.trim().toLowerCase();
  const list = BLOG.filter(
    (b) =>
      (blogCat === 'all' || b.cat === blogCat) &&
      (!q || (b.t + ' ' + b.ex + ' ' + b.cat).toLowerCase().includes(q)),
  );

  const showFeatured = blogCat === 'all' && !q && list.length > 0;
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
          <div className="review-only">
            <OdTag id="OD-05" />
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="toolbar">
            <div className="tabs-scroll" id="blogcats" style={{ margin: 0, paddingBottom: 2 }}>
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`chip ${blogCat === c ? 'on' : ''}`.trim()}
                  onClick={() => setBlogCat(c)}
                >
                  {c === 'all' ? 'All articles' : c}
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
            </label>
          </div>

          <div id="bgrid">
            {!list.length ? (
              <div className="empty">
                <h3>No articles found</h3>
                <p>Try a different category or search term.</p>
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
