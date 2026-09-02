'use client';

import { MoonStars, SunDim } from '@phosphor-icons/react/dist/ssr';
import { useTheme } from './ThemeProvider';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className={`group inline-flex h-9 w-9 items-center justify-center border border-rule text-muted transition-colors duration-300 ease-editorial hover:border-accent hover:text-accent active:scale-[0.96] ${className}`}
    >
      {isDark ? (
        <SunDim size={17} weight="regular" aria-hidden />
      ) : (
        <MoonStars size={16} weight="regular" aria-hidden />
      )}
    </button>
  );
}
