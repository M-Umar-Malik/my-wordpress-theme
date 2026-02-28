'use client';

import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

type MenuItem = {
  label: string;
  href: string;
};

const navItems: MenuItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'Approach', href: '#approach' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const infoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!overlayRef.current) {
        return;
      }

      gsap.set(overlayRef.current, { yPercent: 100, autoAlpha: 0 });

      timelineRef.current = gsap
        .timeline({ paused: true })
        .to(overlayRef.current, {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: 'power4.inOut',
        })
        .from(
          linkRefs.current,
          {
            y: 50,
            opacity: 0,
            stagger: 0.07,
            duration: 0.5,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .from(
          infoRefs.current,
          {
            y: 20,
            opacity: 0,
            stagger: 0.05,
            duration: 0.4,
            ease: 'power2.out',
          },
          '-=0.2'
        );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) {
      return;
    }

    if (menuOpen) {
      timeline.play();
      document.body.style.overflow = 'hidden';
      return;
    }

    timeline.reverse();
    document.body.style.overflow = '';
  }, [menuOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`mx-auto mt-4 flex w-[min(1240px,94vw)] items-center justify-between rounded-xl px-5 py-4 text-xs uppercase tracking-[0.2em] text-white transition-all duration-300 ${
            scrolled ? 'bg-black/25 shadow-[0_12px_30px_rgba(0,0,0,0.2)] backdrop-blur-md' : 'bg-transparent'
          }`}
        >
          <Link href="/" className="text-[13px] font-medium mix-blend-difference">
            YourBrand
          </Link>

          <div className="flex items-center gap-8">
            <nav className="hidden items-center gap-7 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[12px] tracking-[0.22em] text-neutral-100 transition-colors hover:text-neutral-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="text-[12px] tracking-[0.22em] text-neutral-100 transition-colors hover:text-neutral-300"
              aria-label="Open menu"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <div
        ref={overlayRef}
        className="invisible fixed inset-0 z-[100] bg-neutral-950 px-6 py-6 text-neutral-100"
        aria-hidden={!menuOpen}
      >
        <div className="mx-auto flex h-full w-[min(1240px,94vw)] flex-col">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em]">
            <Link href="/" onClick={() => setMenuOpen(false)} className="text-[13px] font-medium">
              YourBrand
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="text-[12px] transition-colors hover:text-neutral-400"
              aria-label="Close menu"
            >
              Close
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-2 py-10 md:py-14">
            {navItems.map((item, index) => (
              <Link
                key={`overlay-${item.label}`}
                href={item.href}
                ref={(node) => {
                  linkRefs.current[index] = node;
                }}
                onClick={() => setMenuOpen(false)}
                className="w-fit text-[clamp(3rem,8vw,4.5rem)] leading-none tracking-tight transition-all duration-300 hover:italic hover:text-neutral-400"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="grid gap-6 border-t border-neutral-800 pt-6 text-sm text-neutral-300 md:grid-cols-2 md:gap-10 md:pt-8">
            <div
              ref={(node) => {
                infoRefs.current[0] = node;
              }}
            >
              <p className="mb-2 text-xs uppercase tracking-[0.16em] text-neutral-500">Visit</p>
              <p className="leading-relaxed">
                123 Studio Lane
                <br />
                New York, NY 10001
              </p>
            </div>
            <div
              ref={(node) => {
                infoRefs.current[1] = node;
              }}
            >
              <p className="mb-2 text-xs uppercase tracking-[0.16em] text-neutral-500">Work With Us</p>
              <a href="mailto:hello@yourbrand.com" className="block w-fit transition-colors hover:text-neutral-100">
                hello@yourbrand.com
              </a>
              <Link href="#contact" onClick={() => setMenuOpen(false)} className="mt-3 block w-fit text-neutral-100 underline underline-offset-4 hover:text-neutral-300">
                Start a project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
