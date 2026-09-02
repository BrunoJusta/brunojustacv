import Link from 'next/link';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <section className="shell flex min-h-[70dvh] flex-col justify-center py-section">
        <p className="meta text-accent">404</p>
        <h1 className="mt-6 max-w-measure text-display-lg">This page does not exist.</h1>
        <p className="mt-6 max-w-measure text-body text-muted">
          The link may be out of date. Everything lives on one page, so the way back is short.
        </p>
        <Link
          href="/"
          className="link-rule meta mt-10 inline-flex w-fit items-center gap-2 transition-colors duration-300 hover:text-ink"
        >
          <ArrowLeft size={13} weight="bold" aria-hidden />
          Back to the start
        </Link>
      </section>
      <Footer />
    </>
  );
}
