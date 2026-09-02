import { site } from '@/lib/content';
import { ThemeToggle } from './ThemeToggle';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule py-10">
      <div className="shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="meta">
          {site.name}, {site.location}
        </p>

        <div className="flex items-center gap-6">
          <a href="#top" className="link-rule meta transition-colors duration-300 hover:text-ink">
            Back to top
          </a>
          <p className="meta">{year}</p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
