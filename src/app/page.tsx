import { About } from "@/components/lunov/About";
import { Cta } from "@/components/lunov/Cta";
import { Footer } from "@/components/lunov/Footer";
import { Header } from "@/components/lunov/Header";
import { Hero } from "@/components/lunov/Hero";
import { Process } from "@/components/lunov/Process";
import { Projects } from "@/components/lunov/Projects";
import { Reveal } from "@/components/lunov/Reveal";
import { Services } from "@/components/lunov/Services";

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <Hero />
        <Reveal delayMs={0}>
          <Services />
        </Reveal>
        <Reveal delayMs={45}>
          <Projects />
        </Reveal>
        <Reveal delayMs={85}>
          <About />
        </Reveal>
        <Reveal delayMs={125}>
          <Process />
        </Reveal>
        <Reveal delayMs={165}>
          <Cta />
        </Reveal>
      </main>
      <Reveal delayMs={40}>
        <Footer />
      </Reveal>
    </>
  );
}
