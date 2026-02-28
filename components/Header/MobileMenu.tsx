'use client';

import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import type { HeaderMenuItem } from './NavMenu';
import { createMobileMenuTimeline } from './header.animations';
import { cn } from '@/lib/utils';

type MobileMenuProps = {
  items: HeaderMenuItem[];
  isOpen: boolean;
  activeLink: string;
  onClose: () => void;
  onItemClick: (href: string) => void;
};

export default function MobileMenu({
  items,
  isOpen,
  activeLink,
  onClose,
  onItemClick,
}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const menuEl = menuRef.current;
    const backdropEl = backdropRef.current;
    const panelEl = panelRef.current;

    if (!menuEl || !backdropEl || !panelEl) {
      return;
    }

    const ctx = gsap.context(() => {
      const links = linkRefs.current.filter((link): link is HTMLAnchorElement => Boolean(link));
      timelineRef.current = createMobileMenuTimeline({
        menuEl,
        backdropEl,
        panelEl,
        linkEls: links,
      });
    }, menuEl);

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) {
      return;
    }

    if (isOpen) {
      timeline.play();
      document.body.style.overflow = 'hidden';
      return;
    }

    timeline.reverse();
    document.body.style.overflow = '';
  }, [isOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div ref={menuRef} className="fixed inset-0 z-[70]" aria-hidden={!isOpen}>
      <button
        type="button"
        aria-label="Close mobile navigation"
        className="absolute inset-0 cursor-default bg-black/55"
        ref={backdropRef}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className="relative h-screen w-full bg-[linear-gradient(170deg,#0f1e48_0%,#070f2f_42%,#040819_100%)] px-7 pb-12 pt-24"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="absolute right-6 top-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/90 transition-colors hover:text-white"
        >
          <span className="relative block h-4 w-4">
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-45 bg-current" />
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-45 bg-current" />
          </span>
        </button>

        <nav
          className="mx-auto grid h-full w-full max-w-[520px] content-center justify-items-center gap-6 pb-10"
          aria-label="Mobile navigation"
        >
          {items.map((item, index) => (
            <Link
              key={`mobile-${item.href}`}
              ref={(node) => {
                linkRefs.current[index] = node;
              }}
              href={item.href}
              onClick={() => {
                onItemClick(item.href);
                onClose();
              }}
              className={cn(
                'mobile-link text-center text-[clamp(2rem,9vw,2.9rem)] font-medium tracking-tight text-white/85 transition-colors will-change-transform',
                activeLink === item.href ? 'text-white' : 'hover:text-white'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
