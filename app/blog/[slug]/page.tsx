import { getPostBySlug, getAllPostSlugs, WPPost } from '../../../lib/wordpress';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post: WPPost | null = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return (
    <article className="mx-auto max-w-3xl rounded-2xl border border-blue-200/20 bg-[#08132f99] p-6 md:p-8">
      <Link href="/blog" className="mb-6 inline-block text-sm font-medium text-blue-200 transition-colors hover:text-blue-100">
        Back to all posts
      </Link>

      {featuredImage && (
        <img
          src={featuredImage}
          alt="Featured"
          className="mb-8 h-64 w-full rounded-2xl border border-blue-200/20 object-cover md:h-80"
        />
      )}

      <p className="mb-2 text-xs uppercase tracking-[0.16em] text-blue-100/70">
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>

      <h1
        className="mb-8 text-3xl font-bold leading-tight text-slate-50 md:text-4xl"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      <div
        className="text-[17px] leading-8 text-slate-100/95 [&_a]:font-medium [&_a]:text-blue-200 [&_a]:underline [&_a]:decoration-blue-300/60 [&_a]:underline-offset-4 hover:[&_a]:text-blue-100 [&_blockquote]:my-7 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-300/50 [&_blockquote]:bg-blue-900/20 [&_blockquote]:px-4 [&_blockquote]:py-3 [&_blockquote]:italic [&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:leading-tight [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-snug [&_h3]:mb-3 [&_h3]:mt-7 [&_h3]:text-xl [&_h3]:font-semibold [&_img]:my-7 [&_img]:rounded-xl [&_img]:border [&_img]:border-blue-200/20 [&_li]:my-1 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-5 [&_strong]:text-white [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  );
}
