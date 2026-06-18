import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Stack from "@/components/Stack";
import Work from "@/components/Work";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-ink">
      <Nav />
      <Hero />
      <Metrics />
      <About />
      <Capabilities />
      <Stack />
      <Work />
      <Footer />
    </main>
  );
}
