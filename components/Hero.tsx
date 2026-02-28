'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const headlineWords = [
  { text: 'Transforming', emphasized: false },
  { text: 'Brands,', emphasized: true },
  { text: 'Building', emphasized: false },
  { text: 'Futures', emphasized: true },
];

export default function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('[data-hero-word]');
      const subtitle = rootRef.current?.querySelector('[data-hero-subtitle]');

      gsap.fromTo(
        words,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.04,
          duration: 0.85,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        }
      );

      if (subtitle) {
        gsap.fromTo(
          subtitle,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, delay: 0.25, duration: 0.6, ease: 'power2.out' }
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="flex min-h-screen items-center py-24" ref={rootRef}>
      <div className="w-full">
        <h1 className="max-w-5xl text-[clamp(3rem,9vw,6rem)] font-medium leading-[0.95] tracking-tight text-white">
          {headlineWords.map((word, index) => (
            <span key={`${word.text}-${index}`} className="mr-3 inline-block overflow-hidden align-top md:mr-4">
              <span
                data-hero-word
                className={`inline-block ${word.emphasized ? 'italic [font-family:var(--font-serif-display)] text-neutral-200' : ''}`}
              >
                {word.text}
              </span>
            </span>
          ))}
        </h1>

        <p
          data-hero-subtitle
          className="mt-8 max-w-xl text-sm leading-relaxed tracking-wide text-neutral-300 md:text-base"
        >
          We craft strategic digital experiences for ambitious companies with a focus on design clarity,
          business impact, and technical precision.
        </p>
      </div>
    </section>
  );
}
