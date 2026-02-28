'use client';

import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

export type HeaderMenuItem = {
  label: string;
  href: string;
};

type NavMenuProps = {
  items: HeaderMenuItem[];
  activeLink: string;
  onItemClick: (href: string) => void;
};

export default function NavMenu({ items, activeLink, onItemClick }: NavMenuProps) {
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const lineRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const textRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      lineRefs.current.forEach((line, index) => {
        if (!line) {
          return;
        }

        gsap.set(line, {
          scaleX: items[index].href === activeLink ? 1 : 0,
          transformOrigin: 'left center',
        });
      });
    });

    return () => ctx.revert();
  }, [activeLink, items]);

  const animateIn = (index: number) => {
    const line = lineRefs.current[index];
    const text = textRefs.current[index];
    if (!line || !text) {
      return;
    }

    gsap.to(line, { scaleX: 1, duration: 0.3, ease: 'power2.out' });
    gsap.to(text, { y: -2, duration: 0.3, ease: 'power2.out' });
  };

  const animateOut = (index: number) => {
    const line = lineRefs.current[index];
    const text = textRefs.current[index];
    if (!line || !text) {
      return;
    }

    gsap.to(line, {
      scaleX: items[index].href === activeLink ? 1 : 0,
      duration: 0.3,
      ease: 'power2.out',
    });
    gsap.to(text, { y: 0, duration: 0.3, ease: 'power2.out' });
  };

  return (
    <nav className="relative z-10 hidden items-center gap-9 md:flex" aria-label="Main navigation">
      {items.map((item, index) => (
        <Link
          key={item.href}
          ref={(node) => {
            itemRefs.current[index] = node;
          }}
          href={item.href}
          onClick={() => onItemClick(item.href)}
          onMouseEnter={() => animateIn(index)}
          onMouseLeave={() => animateOut(index)}
          className={cn(
            'nav-item relative pb-1 text-[0.93rem] font-medium tracking-[-0.01em] text-[#17254f]/86 transition-colors duration-200 will-change-transform',
            activeLink === item.href ? 'text-[#0b1230]' : 'hover:text-[#0b1230]'
          )}
        >
          <span
            ref={(node) => {
              textRefs.current[index] = node;
            }}
            className="block will-change-transform"
          >
            {item.label}
          </span>
          <span
            ref={(node) => {
              lineRefs.current[index] = node;
            }}
            className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left bg-[#0b1230]/70 will-change-transform"
          />
        </Link>
      ))}
    </nav>
  );
}
