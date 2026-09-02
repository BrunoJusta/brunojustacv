import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

/**
 * One header pattern for the whole page: a hairline, then the title in the
 * display serif. No eyebrows, no section numbers.
 */
export function SectionHeading({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <Reveal>
      <div className="rule-top pt-6">
        <h2 id={id} className="max-w-measure text-display-md">
          {children}
        </h2>
      </div>
    </Reveal>
  );
}
