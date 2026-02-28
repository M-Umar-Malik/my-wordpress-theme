import { create } from 'zustand';

type HeaderStore = {
  isMenuOpen: boolean;
  isScrolled: boolean;
  activeLink: string;
  toggleMenu: () => void;
  closeMenu: () => void;
  setScrolled: (value: boolean) => void;
  setActiveLink: (href: string) => void;
};

export const useHeaderStore = create<HeaderStore>((set) => ({
  isMenuOpen: false,
  isScrolled: false,
  activeLink: '/',
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
  setScrolled: (value) => set({ isScrolled: value }),
  setActiveLink: (href) => set({ activeLink: href }),
}));
