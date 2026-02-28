import { getAllPosts, WPPost } from './lib/wordpress';
import Link from 'next/link';

export default async function HomePage() {
  // Fetch posts from WordPress at build time
  const posts = await getAllPosts();

  return (
    <div>
      {/* Page Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Latest Posts</h1>
      <p className="text-gray-500 mb-10">Fresh thoughts, ideas, and stories.</p>

      {/* Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: WPPost) => (
          <article
            key={post.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
          >
            {/* Post Date */}
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            {/* Post Title */}
            <h2
              className="text-lg font-semibold text-gray-800 mb-3 leading-snug"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            {/* Post Excerpt */}
            <div
              className="text-gray-500 text-sm mb-4 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />

            {/* Read More Link */}
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-600 text-sm font-semibold hover:underline"
            >
              Read More →
            </Link>
          </article>
        ))}
      </div>

      {/* Empty state */}
      {posts.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl">No posts yet.</p>
          <p className="text-sm mt-2">Go add some posts in WordPress!</p>
        </div>
      )}
    </div>
  );
}