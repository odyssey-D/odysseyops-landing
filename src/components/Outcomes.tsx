"use client";

import { content } from "@/content";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Outcomes() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 px-6 bg-neutral-50/50" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className={`grid md:grid-cols-3 gap-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {content.outcomes.map((outcome, i) => (
            <div
              key={i}
              className="p-8 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
              data-testid={`card-outcome-${i}`}
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
