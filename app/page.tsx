import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Stack from "@/components/Stack";
import Work from "@/components/Work";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <main className="min-h-screen bg-ink">
      <Nav />
      <Hero />
      {/* Metrics, Capabilities, Stack and Work animate their own items in a
          stagger, so they are not wrapped here (nesting Reveals would defeat the
          per-item cascade). About and Footer reveal as a whole section. */}
      <Metrics />
      <Reveal>
        <About />
      </Reveal>
      <Capabilities />
      <Stack />
      <Work />
      <Reveal>
        <Footer />
      </Reveal>
    </main>
  );
}
