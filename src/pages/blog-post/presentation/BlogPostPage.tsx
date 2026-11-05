import { Link, Navigate, useParams } from 'react-router-dom';
import { Icon } from '@/shared/components/ui/Icon';
import { BLOG_POSTS } from '@/shared/constants/academyData';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;

  return (
    <article className="mx-auto max-w-2xl px-5 py-14 md:px-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted">
        <Link to="/blog" className="hover:text-ink dark:hover:text-white">
          Blog
        </Link>
        <Icon name="chevron-right" size={14} />
        <span>{post.cat}</span>
      </nav>
      <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-brand">
        <Icon name={post.ic} size={16} /> {post.cat} &middot; {post.read}
      </span>
      <h1 className="mb-6 text-3xl md:text-4xl">{post.t}</h1>
      <div className="prose-like grid gap-4 text-ink-2 dark:text-white/80">
        {post.body.map((block, i) => {
          if (block[0] === 'h') return <h2 key={i} className="mt-4 text-xl text-ink dark:text-white">{block[1]}</h2>;
          if (block[0] === 'ul')
            return (
              <ul key={i} className="grid gap-2 pl-5">
                {block[1].map((item) => (
                  <li key={item} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            );
          return <p key={i}>{block[1]}</p>;
        })}
      </div>
      <Link to="/blog" className="mt-10 inline-flex items-center gap-2 font-bold text-brand">
        <Icon name="arrow-left" size={16} /> Back to all posts
      </Link>
    </article>
  );
}
