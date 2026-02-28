// The base URL of your WordPress REST API
const WP_API = process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace(/\/$/, '');
const loggedFetchIssues = new Set<string>();

if (!WP_API) {
  throw new Error('NEXT_PUBLIC_WORDPRESS_API_URL is not set. Check your .env.local file.');
}

// This is what a WordPress Post object looks like
export interface WPPost {
  id: number;
  slug: string;
  date: string;
  title: {
    rendered: string; // HTML string like "<em>My Post</em>"
  };
  content: {
    rendered: string; // Full post HTML content
  };
  excerpt: {
    rendered: string; // Short summary HTML
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string; // URL to the featured image
    }>;
  };
}

// This is what a WordPress Page looks like
export interface WPPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
}

async function fetchWpJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${WP_API}${path}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`WordPress API request failed (${res.status}) for ${path}`);
      return fallback;
    }

    return (await res.json()) as T;
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    const errorCode = err?.code ?? 'UNKNOWN';
    const dedupeKey = `${path}:${errorCode}`;

    if (!loggedFetchIssues.has(dedupeKey)) {
      loggedFetchIssues.add(dedupeKey);

      if (errorCode === 'ENOTFOUND') {
        console.warn(
          `WordPress host is not resolvable (${WP_API}). Update NEXT_PUBLIC_WORDPRESS_API_URL in .env.local.`
        );
      } else {
        console.error(`WordPress API request error for ${path}:`, error);
      }
    }

    return fallback;
  }
}

// Get all blog posts (most recent 10)
export async function getAllPosts(): Promise<WPPost[]> {
  return fetchWpJson<WPPost[]>('/posts?_embed&per_page=10', []);
}

// Get one post by its slug (e.g. "hello-world")
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const posts = await fetchWpJson<WPPost[]>(`/posts?slug=${encodeURIComponent(slug)}&_embed`, []);
  return posts[0] ?? null;
}

// Get all slugs (used to pre-generate pages)
export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await fetchWpJson<WPPost[]>('/posts?per_page=100&_fields=slug', []);
  return posts.map((post) => post.slug);
}
