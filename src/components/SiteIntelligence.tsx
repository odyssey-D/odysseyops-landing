"use client";

import { content } from "@/content";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function SiteIntelligence() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 px-6 bg-neutral-900 text-white" ref={ref}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className={`text-3xl sm:text-4xl font-semibold mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {content.siteIntelligence.title}
        </h2>
        <div className={`space-y-6 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {content.siteIntelligence.body.map((paragraph, i) => (
            <p
              key={i}
              className="text-lg text-neutral-300 leading-relaxed"
              data-testid={`intelligence-para-${i}`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
