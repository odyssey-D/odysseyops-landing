import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Outcomes } from "@/components/Outcomes";
import { Modules } from "@/components/Modules";
import { SiteIntelligence } from "@/components/SiteIntelligence";
import { Segments } from "@/components/Segments";
import { WaitlistForm } from "@/components/WaitlistForm";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <Hero />
        <Outcomes />
        <Modules />
        <SiteIntelligence />
        <Segments />
        <WaitlistForm />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}
