"use client";

import { content } from "@/content";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Segments() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      ref={ref}
      className="py-24 px-6 bg-black text-white"
      style={{ opacity: 1 }} // NOTE: won't override a parent's opacity, but prevents local accidents
    >
      <div
        className={[
          "max-w-4xl mx-auto",
          "transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        ].join(" ")}
      >
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-white">
            For single-site operators
          </h3>

          <ul className="space-y-4 text-white leading-relaxed text-base md:text-lg">
            {content.segments.single.map((item: string, i: number) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-white shrink-0" />
                <span className="text-white">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-white">
            For multi-site operators
          </h3>

          <ul className="space-y-4 text-white leading-relaxed text-base md:text-lg">
            {content.segments.multi.map((item: string, i: number) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-white shrink-0" />
                <span className="text-white">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
