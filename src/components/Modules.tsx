"use client";

import { content } from "@/content";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Modules() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <h2 className={`text-3xl sm:text-4xl font-semibold text-neutral-900 text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          What's inside
        </h2>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {content.modules.map((module, i) => (
            <div
              key={i}
              className="px-6 py-4 bg-neutral-50 rounded-xl text-neutral-700 text-center font-medium border border-neutral-100 hover:bg-neutral-100 transition-colors duration-200"
              data-testid={`module-${i}`}
            >
              {module}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
