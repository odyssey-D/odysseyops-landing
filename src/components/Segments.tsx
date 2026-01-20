"use client";

import { content } from "@/content";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Segments() {
  const { ref, isVisible } = useScrollAnimation();

  const segments = [
    content.segments.singleSite,
    content.segments.multiSite,
  ];

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className={`grid md:grid-cols-2 gap-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {segments.map((segment, i) => (
            <div key={i} className="space-y-6" data-testid={`segment-${i}`}>
              <h3 className="text-2xl font-semibold text-neutral-900">
                {segment.title}
              </h3>
              <ul className="space-y-3">
                {segment.points.map((point, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-neutral-600"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2.5 shrink-0" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
