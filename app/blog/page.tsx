import Link from 'next/link';
import { getAllPosts, WPPost } from '../../lib/wordpress';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <h1 className="mb-2 text-4xl font-semibold tracking-tight text-slate-100 md:text-5xl">Blog</h1>
      <p className="mb-10 text-base text-slate-300">All posts from WordPress.</p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: WPPost) => (
          <article
            key={post.id}
            className="rounded-2xl border border-blue-200/20 bg-blue-950/35 p-6 shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200/40"
          >
            <p className="mb-3 text-xs uppercase tracking-wide text-blue-100/75">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            <h2
              className="mb-3 text-xl font-semibold leading-snug text-slate-100"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            <div
              className="mb-5 line-clamp-3 text-[15px] leading-7 text-slate-200/90 [&_p]:m-0"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />

            <Link
              href={`/blog/${post.slug}`}
              className="text-sm font-semibold text-blue-200 transition-colors hover:text-blue-100"
            >
              Read More
            </Link>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="py-20 text-center text-blue-200/70">
          <p className="text-xl">No posts yet.</p>
          <p className="mt-2 text-sm">Go add some posts in WordPress.</p>
        </div>
      )}
    </div>
  );
}
