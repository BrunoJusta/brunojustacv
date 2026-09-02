import { BeyondWork } from '@/components/BeyondWork';
import { Capabilities } from '@/components/Capabilities';
import { Contact } from '@/components/Contact';
import { Education } from '@/components/Education';
import { Experience } from '@/components/Experience';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { Impact } from '@/components/Impact';
import { SelectedWork } from '@/components/SelectedWork';
import { Statement } from '@/components/Statement';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <Impact />
      <SelectedWork />
      <Experience />
      <Capabilities />
      <Education />
      <BeyondWork />
      <Contact />
      <Footer />
    </>
  );
}
