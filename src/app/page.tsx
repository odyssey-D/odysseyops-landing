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
    <div className="relative isolate bg-black">
      <Header />
      <main className="relative z-0 min-h-screen">
        <Hero />
        <Outcomes />
        <Modules />
        <SiteIntelligence />
        <Segments />
        <WaitlistForm />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}
