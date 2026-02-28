import type { Metadata } from 'next';
import Header from './components/Header';
import Footer from './components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Umar Dev | Portfolio',
  description: 'Modern developer portfolio and blog powered by Next.js and WordPress.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="m-0 flex min-h-screen flex-col bg-[radial-gradient(circle_at_18%_12%,rgba(75,125,255,0.18),transparent_40%),radial-gradient(circle_at_82%_-10%,rgba(55,89,182,0.2),transparent_34%),linear-gradient(180deg,#0f1e48_0%,#050b1f_56%,#030713_100%)] text-[#e6edff]">
        <Header />
        <main className="mx-auto w-[min(1100px,92vw)] flex-1 py-[clamp(2.25rem,4vw,3.4rem)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
