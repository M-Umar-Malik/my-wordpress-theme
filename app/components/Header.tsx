'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Portfolio', href: '/#portfolio' },
  { label: 'Contact', href: '/#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 pt-3 animate-[header-enter_0.55s_ease-out]">
      <div
        className={`mx-auto w-[min(1100px,92vw)] rounded-2xl border text-slate-100 transition-all duration-300 ${
          isScrolled
            ? 'mt-1 border-blue-200/25 bg-[#0d1c49e0] px-5 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl'
            : 'mt-3 border-blue-200/20 bg-[#07123195] px-5 py-4 shadow-[0_10px_24px_rgba(0,0,0,0.16)] backdrop-blur-md'
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="text-[1.04rem] font-bold tracking-[0.08em] text-slate-100 hover:text-white" aria-label="Umar Dev Home">
            UMAR DEV
          </Link>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative text-[0.93rem] font-medium text-slate-300 transition-colors duration-200 hover:text-slate-50"
              >
                {item.label}
                <span className="pointer-events-none absolute -bottom-1.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-blue-500 to-blue-300 transition-transform duration-200 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="inline-flex h-9 w-10 flex-col justify-center gap-[0.28rem] rounded-lg border border-blue-200/35 bg-blue-950/65 px-2 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            <span className={`block h-0.5 w-full rounded bg-blue-100 transition-all duration-200 ${mobileOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
            <span className={`block h-0.5 w-full rounded bg-blue-100 transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-full rounded bg-blue-100 transition-all duration-200 ${mobileOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      <nav
        className={`mx-auto w-[min(1100px,92vw)] overflow-hidden transition-all duration-300 md:hidden ${
          mobileOpen ? 'mb-1 max-h-80 translate-y-0 opacity-100' : 'max-h-0 -translate-y-1.5 opacity-0'
        }`}
        aria-label="Mobile navigation"
      >
        {navItems.map((item, index) => (
          <Link
            key={`mobile-${item.label}`}
            href={item.href}
            className={`block border border-blue-200/20 bg-blue-950/85 px-4 py-3.5 text-[0.95rem] text-slate-300 transition-colors duration-200 hover:bg-blue-900/80 hover:text-slate-100 ${
              index === 0 ? 'rounded-t-xl border-t' : 'border-t-0'
            } ${index === navItems.length - 1 ? 'rounded-b-xl' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
