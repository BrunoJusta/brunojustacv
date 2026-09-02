import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { site } from '@/lib/content';
import { Grain } from '@/components/Grain';
import { Nav } from '@/components/Nav';
import { ScrollProgress } from '@/components/ScrollProgress';
import { SmoothScroll } from '@/components/SmoothScroll';
import { ThemeProvider, themeInitScript } from '@/components/ThemeProvider';

/* Three registers, self-hosted so there is no third-party font request:
   Playfair Display for display, IBM Plex Sans for body, IBM Plex Mono for
   dates and metadata. The same system as the CV. */
const display = localFont({
  src: './fonts/PlayfairDisplay-Variable.woff2',
  weight: '400 900',
  style: 'normal',
  variable: '--font-display',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  adjustFontFallback: 'Times New Roman',
});

const sans = localFont({
  src: './fonts/IBMPlexSans-Variable.woff2',
  weight: '100 700',
  style: 'normal',
  variable: '--font-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Segoe UI', 'Helvetica Neue', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

const mono = localFont({
  src: './fonts/IBMPlexMono-400.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-mono',
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}, ${site.role}`,
    template: `%s, ${site.name}`,
  },
  description: site.description,
  keywords: [
    'Digital Product Manager',
    'AI Lead',
    'Product Design',
    'UX Design',
    'AI agents',
    'Porto',
    'Portugal',
    'Bruno Justa',
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    siteName: site.name,
    title: `${site.name}, ${site.role}`,
    description: site.description,
    url: site.url,
    locale: 'en_GB',
    firstName: 'Bruno',
    lastName: 'Justa',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name}, ${site.role}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'portfolio',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fcfbf8' },
    { media: '(prefers-color-scheme: dark)', color: '#131110' },
  ],
};

/** JSON-LD Person, so search engines read the role, place and projects. */
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  description: site.description,
  url: site.url,
  email: `mailto:${site.email}`,
  telephone: site.phone,
  image: `${site.url}/opengraph-image.png`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Porto',
    addressCountry: 'PT',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Sogrape Vinhos S.A.',
  },
  alumniOf: [
    { '@type': 'EducationalOrganization', name: 'EDIT. Disruptive Digital Education' },
    { '@type': 'EducationalOrganization', name: 'Polytechnic Institute of Cávado and Ave' },
    { '@type': 'EducationalOrganization', name: 'Polytechnic Institute of Porto' },
  ],
  knowsLanguage: [
    { '@type': 'Language', name: 'Portuguese' },
    { '@type': 'Language', name: 'English' },
  ],
  knowsAbout: [
    'Product management',
    'Product design',
    'AI agent design',
    'Prompt engineering',
    'AI-assisted development',
    'UX research',
  ],
  sameAs: [site.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Paints the stored palette before first paint, so dark mode never flashes. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-overlay focus:border focus:border-accent focus:bg-paper focus:px-4 focus:py-2 focus:text-[0.875rem] focus:text-ink"
          >
            Skip to content
          </a>
          <SmoothScroll />
          <ScrollProgress />
          <Grain />
          <Nav />
          <main id="main">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
