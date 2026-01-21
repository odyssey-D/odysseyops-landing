"use client";

import { content } from "@/content";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Outcomes() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="py-24 px-6 bg-black"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-12">
          What’s inside
        </h2>

        {/* Cards */}
        <div
          className={`grid md:grid-cols-3 gap-8 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          {content.outcomes.map((outcome, i) => (
            <div
              key={i}
              data-testid={`card-outcome-${i}`}
              className="p-8 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                {outcome.title}
              </h3>

              <p className="text-neutral-600 leading-relaxed">
                {outcome.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
