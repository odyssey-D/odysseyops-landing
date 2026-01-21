"use client";

import { content } from "@/content";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  const handleClick = () => {
    trackEvent("click_join_waitlist");
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-[90vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-neutral-900 leading-tight">
          {content.hero.title}
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          {content.hero.subtitle}
        </p>

        <button
          onClick={handleClick}
          data-testid="button-hero-cta"
          className="mt-10 px-8 py-4 bg-neutral-900 text-white rounded-full text-base font-medium hover:bg-neutral-800 transition-all duration-300"
        >
          {content.hero.cta}
        </button>
      </div>
    </section>
  );
}
