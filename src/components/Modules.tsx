"use client";

import { content } from "@/content";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Modules() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 px-6 bg-black">
      <div className="max-w-3xl mx-auto text-center">
        {/* Fix: explicit readable heading */}
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-10">
          What’s inside
        </h2>

        <div
          className={`space-y-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {(content.modules ?? []).map((item: any, i: number) => (
            <div
              key={i}
              className="w-full bg-white rounded-2xl border border-neutral-200 shadow-sm"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Button/pill */}
              <div className="px-6 py-5 text-lg font-medium text-neutral-900">
                {typeof item === "string" ? item : item.title}
              </div>

              {/* Optional description (only renders if present) */}
              {typeof item !== "string" && item.description ? (
                <div className="px-6 pb-5 -mt-2 text-sm leading-relaxed text-neutral-600">
                  {item.description}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
