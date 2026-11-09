import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Handles } from "@/components/handles";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Pages } from "@/components/pages";
import { Process } from "@/components/process";
import { Scripts } from "@/components/scripts";
import { Skills } from "@/components/skills";
import { Work } from "@/components/work";

/* Built like a reel: the hook, the body, then the call to action. */
export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Handles />
        <Scripts />
        <Work />
        <Pages />
        <Process />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
