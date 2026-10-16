import About from '@/components/About';
import Contact from '@/components/Contact';
import Experience from '@/components/Experience';
import Experiments from '@/components/Experiments';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Photography from '@/components/Photography';
import ProjectSection from '@/components/ProjectSection';
import ScrollProgress from '@/components/ScrollProgress';
import SocialRail from '@/components/SocialRail';
// import Playground from '@/components/Playground'; — parked, see below.
import Testimonials from '@/components/Testimonials';
import XOGame from '@/components/XOGame';
import { industryProjects, personalProjects } from '@/data/projects';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <SocialRail />
      {/* Clip, not hidden: nothing may widen the page on phones (the project
          cards' hover glow, the About board before it scales), and unlike
          overflow:hidden it keeps About's sticky heading working. */}
      <main className="overflow-x-clip">
        <Hero />
        <Experience />
        {/* `work` is the id the navbar's Work link and the hero button point at. */}
        <ProjectSection
          id="work"
          eyebrow="Industry Projects"
          title="Shipped for the real world."
          accent="real world"
          projects={industryProjects}
          row
        />
        <ProjectSection
          id="projects"
          eyebrow="Personal Projects"
          title="Ideas I couldn’t leave alone."
          accent="leave alone"
          projects={personalProjects}
          className="border-t border-rule"
        />
        <Experiments />
        {/* Visual Playground is parked for now. To bring it back, uncomment
            this, its import above and its nav link in data/site.ts:
            <Playground /> */}
        <Photography />
        <About />
        <Testimonials />
        <XOGame />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
