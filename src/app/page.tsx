import { About } from "@/components/lunov/About";
import { Cta } from "@/components/lunov/Cta";
import { Footer } from "@/components/lunov/Footer";
import { Header } from "@/components/lunov/Header";
import { Hero } from "@/components/lunov/Hero";
import { Process } from "@/components/lunov/Process";
import { Projects } from "@/components/lunov/Projects";
import { Services } from "@/components/lunov/Services";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Projects />
        <About />
        <Process />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
