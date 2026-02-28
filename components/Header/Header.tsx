'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import NavMenu, { type HeaderMenuItem } from './NavMenu';
import MobileMenu from './MobileMenu';
import { useHeaderStore } from './header.store';
import { createHeaderIntroTimeline, createHeaderScrollTrigger } from './header.animations';
import { cn } from '@/lib/utils';

const menuItems: HeaderMenuItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Portfolio', href: '/#portfolio' },
  { label: 'Contact', href: '/#contact' },
];

function getActiveFromPath(pathname: string) {
  if (pathname.startsWith('/about')) {
    return '/about';
  }
  if (pathname.startsWith('/blog')) {
    return '/blog';
  }
  return '/';
}

export default function Header() {
  const pathname = usePathname();
  const rootRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const isMenuOpen = useHeaderStore((state) => state.isMenuOpen);
  const isScrolled = useHeaderStore((state) => state.isScrolled);
  const activeLink = useHeaderStore((state) => state.activeLink);
  const toggleMenu = useHeaderStore((state) => state.toggleMenu);
  const closeMenu = useHeaderStore((state) => state.closeMenu);
  const setScrolled = useHeaderStore((state) => state.setScrolled);
  const setActiveLink = useHeaderStore((state) => state.setActiveLink);

  const mobileLabel = useMemo(() => (isMenuOpen ? 'Close menu' : 'Open menu'), [isMenuOpen]);

  useEffect(() => {
    setActiveLink(getActiveFromPath(pathname));
    closeMenu();
  }, [pathname, setActiveLink, closeMenu]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeMenu]);

  useLayoutEffect(() => {
    const rootEl = rootRef.current;
    const logoEl = logoRef.current;
    if (!rootEl || !logoEl) {
      return;
    }

    let introTimeline: gsap.core.Timeline | null = null;
    let scrollTrigger: { kill: () => void } | null = null;

    const ctx = gsap.context(() => {
      const navItemEls = Array.from(rootEl.querySelectorAll('.nav-item')) as HTMLElement[];
      introTimeline = createHeaderIntroTimeline({ logoEl, navItemEls });
      scrollTrigger = createHeaderScrollTrigger({
        onScrolledChange: setScrolled,
        progressEl: progressRef.current,
      });
    }, rootEl);

    return () => {
      introTimeline?.kill();
      scrollTrigger?.kill();
      ctx.revert();
    };
  }, [setScrolled]);

  return (
    <>
      <header ref={rootRef} className="fixed inset-x-0 top-5 z-50">
        <div
          className={cn(
            'mx-auto transition-all duration-500',
            isScrolled ? 'w-[min(640px,96vw)] pt-0 md:pt-0' : 'w-[min(1160px,94vw)] pt-4 md:pt-6'
          )}
        >
          <div
            className={cn(
              'relative overflow-hidden flex items-center justify-between border border-white/35 transition-all duration-500 will-change-transform',
              isScrolled
                ? 'rounded-[0.36rem] px-4 py-3 md:px-5 md:py-3.5 bg-[linear-gradient(90deg,rgba(201,219,248,0.74)_0%,rgba(176,202,240,0.7)_100%)] shadow-[0_6px_20px_rgba(7,22,60,0.22)] backdrop-blur-md'
                : 'rounded-[0.72rem] px-5 py-3 md:px-6 md:py-3.5 bg-[linear-gradient(90deg,rgba(201,219,248,0.74)_0%,rgba(176,202,240,0.7)_100%)] shadow-[0_6px_20px_rgba(7,22,60,0.22)] backdrop-blur-md'
            )}
          >
            {!isScrolled && (
              <>
                <div aria-hidden className="pointer-events-none absolute -left-12 top-0 h-full w-36 rotate-12 bg-white/35 blur-[18px]" />
                <div aria-hidden className="pointer-events-none absolute left-1/3 top-0 h-full w-24 -rotate-6 bg-white/20 blur-[14px]" />
              </>
            )}
            <Link
              ref={logoRef}
              href="/"
              onClick={() => setActiveLink('/')}
              className={cn(
                'nav-logo relative z-10 font-medium tracking-[-0.04em] text-[#0b1230] transition-all duration-500',
                isScrolled ? 'text-[2.2rem] md:text-[2.3rem]' : 'text-[1.9rem] md:text-[2rem]'
              )}
            >
              UMAR DEV
            </Link>

            {!isScrolled && (
              <NavMenu items={menuItems} activeLink={activeLink} onItemClick={setActiveLink} />
            )}

            <button
              type="button"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label={mobileLabel}
              className={cn(
                'group relative z-10 inline-flex h-10 w-12 items-center justify-center rounded-md border border-[#17254f]/20 text-[#17254f] transition-colors hover:text-[#0b1230]',
                isScrolled ? '' : 'md:hidden'
              )}
            >
              <span className="relative h-4 w-5">
                <span
                  className={cn(
                    'absolute left-0 top-[2px] h-px w-full bg-current transition-all duration-300',
                    isMenuOpen ? 'translate-y-[6px] rotate-45' : ''
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current transition-all duration-200',
                    isMenuOpen ? 'opacity-0' : ''
                  )}
                />
                <span
                  className={cn(
                    'absolute bottom-[1px] left-0 h-px w-full bg-current transition-all duration-300',
                    isMenuOpen ? '-translate-y-[6px] -rotate-45' : ''
                  )}
                />
              </span>
            </button>
          </div>
        </div>
       
      </header>

      <MobileMenu
        items={menuItems}
        isOpen={isMenuOpen}
        activeLink={activeLink}
        onClose={closeMenu}
        onItemClick={setActiveLink}
      />

      <div aria-hidden className="h-24 md:h-28" />
    </>
  );
}
