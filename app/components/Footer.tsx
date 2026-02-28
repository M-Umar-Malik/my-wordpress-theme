'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const footerLinks = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Disclaimer', href: '/disclaimer' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = footerRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`border-t border-blue-200/20 bg-gradient-to-b from-[#07102bb8] to-[#050b1ff2] ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } transition-all duration-500`}
    >
      <div className="mx-auto grid w-[min(1100px,92vw)] grid-cols-1 gap-6 py-10 md:grid-cols-[1.2fr_1fr_0.9fr] md:gap-8">
        <div>
          <p className="m-0 text-sm font-bold tracking-[0.08em] text-slate-100">UMAR DEV</p>
          <p className="mt-2 max-w-[300px] text-sm leading-relaxed text-blue-200/70">
            Developer portfolio and writing on modern web engineering.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-blue-100">Menu</h3>
          <ul className="grid list-none gap-1.5 p-0">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="inline-block text-sm text-slate-300 transition-all duration-200 hover:translate-x-1 hover:text-slate-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-blue-100">Social</h3>
          <div className="flex gap-2.5">
            <a
              href="#"
              className="inline-flex h-8 w-8 items-center justify-center rounded-[0.6rem] border border-blue-200/25 text-blue-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200/55 hover:bg-blue-900/70"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" role="img" aria-hidden="true" className="h-4 w-4">
                <path
                  fill="currentColor"
                  d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.26c-3.34.73-4.04-1.41-4.04-1.41a3.18 3.18 0 0 0-1.34-1.76c-1.1-.75.08-.74.08-.74a2.53 2.53 0 0 1 1.85 1.24 2.59 2.59 0 0 0 3.53 1 2.58 2.58 0 0 1 .77-1.62c-2.66-.3-5.46-1.32-5.46-5.88a4.59 4.59 0 0 1 1.23-3.2 4.24 4.24 0 0 1 .12-3.15s1-.32 3.3 1.22a11.5 11.5 0 0 1 6 0c2.29-1.54 3.29-1.22 3.29-1.22a4.24 4.24 0 0 1 .12 3.15 4.58 4.58 0 0 1 1.23 3.2c0 4.57-2.81 5.58-5.49 5.88a2.9 2.9 0 0 1 .82 2.24v3.31c0 .32.21.7.83.58A12 12 0 0 0 12 .5"
                />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex h-8 w-8 items-center justify-center rounded-[0.6rem] border border-blue-200/25 text-blue-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200/55 hover:bg-blue-900/70"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" role="img" aria-hidden="true" className="h-4 w-4">
                <path
                  fill="currentColor"
                  d="M20.45 20.45h-3.56v-5.59c0-1.33-.03-3.05-1.86-3.05-1.87 0-2.16 1.46-2.16 2.96v5.68H9.31V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 .01-4.14 2.07 2.07 0 0 1-.01 4.14ZM7.13 20.45H3.56V9h3.57v11.45Z"
                />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex h-8 w-8 items-center justify-center rounded-[0.6rem] border border-blue-200/25 text-blue-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200/55 hover:bg-blue-900/70"
              aria-label="X"
            >
              <svg viewBox="0 0 24 24" role="img" aria-hidden="true" className="h-4 w-4">
                <path
                  fill="currentColor"
                  d="M18.9 2H22l-6.77 7.75L23 22h-6.1l-4.78-6.26L6.58 22H3.47l7.25-8.29L1.2 2h6.26l4.32 5.7L18.9 2Zm-1.07 18h1.69L6.56 3.9H4.74L17.83 20Z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto w-[min(1100px,92vw)] border-t border-blue-200/15 py-4 pb-6">
        <p className="m-0 text-xs text-blue-200/60">(c) {new Date().getFullYear()} Umar Dev. All rights reserved.</p>
      </div>
    </footer>
  );
}
