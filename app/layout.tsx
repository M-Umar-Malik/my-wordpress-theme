import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'A beautiful blog powered by WordPress and Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">

        {/* ───── HEADER ───── */}
        <header className="bg-blue-700 text-white shadow-lg">
          <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
            {/* Site Logo/Name */}
            <a href="/" className="text-2xl font-bold tracking-tight hover:opacity-80">
              UMAR DEV
            </a>

            {/* Navigation Links */}
            <nav className="flex gap-6 text-sm font-medium">
              <a href="/" className="hover:underline underline-offset-4">Home</a>
              <a href="/blog" className="hover:underline underline-offset-4">Blog</a>
              <a href="/about" className="hover:underline underline-offset-4">About</a>
            </nav>
          </div>
        </header>

        {/* ───── PAGE CONTENT ───── */}
        <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
          {children}
        </main>

        {/* ───── FOOTER ───── */}
        <footer className="bg-gray-800 text-gray-300 text-center py-6 text-sm">
          <p>© {new Date().getFullYear()} Umar Dev · Built with Next.js + WordPress</p>
        </footer>

      </body>
    </html>
  );
}