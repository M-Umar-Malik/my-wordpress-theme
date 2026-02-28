import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type HeaderIntroArgs = {
  logoEl: HTMLElement;
  navItemEls: HTMLElement[];
};

type ScrollArgs = {
  onScrolledChange: (value: boolean) => void;
  progressEl: HTMLElement | null;
};

type MobileMenuArgs = {
  menuEl: HTMLElement;
  backdropEl: HTMLElement;
  panelEl: HTMLElement;
  linkEls: HTMLElement[];
};

export function createHeaderIntroTimeline({ logoEl, navItemEls }: HeaderIntroArgs) {
  return gsap
    .timeline()
    .from(logoEl, { y: -20, opacity: 0, duration: 0.6, ease: 'power3.out' })
    .from(
      navItemEls,
      { y: -10, opacity: 0, duration: 0.46, stagger: 0.08, ease: 'power2.out' },
      '-=0.3'
    );
}

export function createHeaderScrollTrigger({ onScrolledChange, progressEl }: ScrollArgs) {
  return ScrollTrigger.create({
    start: 80,
    end: 'max',
    onUpdate: (self) => {
      if (progressEl) {
        gsap.set(progressEl, { scaleX: self.progress, transformOrigin: 'left center' });
      }
    },
    onToggle: (self) => {
      onScrolledChange(self.isActive);
    },
    onLeaveBack: () => {
      onScrolledChange(false);
      if (progressEl) {
        gsap.set(progressEl, { scaleX: 0, transformOrigin: 'left center' });
      }
    },
  });
}

export function createMobileMenuTimeline({
  menuEl,
  backdropEl,
  panelEl,
  linkEls,
}: MobileMenuArgs) {
  gsap.set(menuEl, { display: 'none', autoAlpha: 0 });
  gsap.set(backdropEl, { autoAlpha: 0 });
  gsap.set(panelEl, { yPercent: -12, autoAlpha: 0 });

  return gsap
    .timeline({
      paused: true,
      onStart: () => {
        gsap.set(menuEl, { display: 'block' });
      },
      onReverseComplete: () => {
        gsap.set(menuEl, { display: 'none' });
      },
    })
    .to(backdropEl, { autoAlpha: 1, duration: 0.24, ease: 'power1.out' }, 0)
    .to(panelEl, { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out' }, 0)
    .from(
      linkEls,
      { opacity: 0, y: 20, stagger: 0.1, duration: 0.42, ease: 'power2.out' },
      0.08
    )
    .to(menuEl, { autoAlpha: 1, duration: 0.01 }, 0);
}

