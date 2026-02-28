import { getPostBySlug, getAllPostSlugs, WPPost } from '../../lib/wordpress';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// This tells Next.js to pre-generate pages for all posts
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post: WPPost | null = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Get featured image if it exists
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return (
    <article className="max-w-2xl mx-auto">
      {/* Back button */}
      <Link href="/" className="text-blue-600 text-sm hover:underline mb-6 inline-block">
        
      </Link>

      {/* Featured Image */}
      {featuredImage && (
        <img
          src={featuredImage}
          alt="Featured"
          className="w-full h-64 object-cover rounded-2xl mb-8"
        />
      )}

      {/* Post Date */}
      <p className="text-sm text-gray-400 uppercase tracking-wide mb-2">
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>

      {/* Post Title */}
      <h1
        className="text-4xl font-bold text-gray-900 mb-8 leading-tight"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      {/* Post Content */}
      <div
        className="prose prose-lg prose-blue max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  );
}
