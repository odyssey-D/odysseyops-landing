"use client";

import { content } from "@/content";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Segments() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 px-6 bg-black">
      <div
        className={`max-w-4xl mx-auto transition-transform duration-700 ${
          isVisible ? "translate-y-0" : "translate-y-6"
        }`}
      >
        {/* Single-site */}
        <div className="mb-16">
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
            For single-site operators
          </h3>

          <ul className="space-y-3 text-white/80 leading-relaxed">
            {content.segments.single.map((item: string, i: number) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/70 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Multi-site */}
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
            For multi-site operators
          </h3>

          <ul className="space-y-3 text-white/80 leading-relaxed">
            {content.segments.multi.map((item: string, i: number) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/70 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
