"use client";

import { useState } from "react";
import { content } from "@/content";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function FAQ() {
  const { ref, isVisible } = useScrollAnimation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 bg-neutral-50/50" ref={ref}>
      <div className="max-w-2xl mx-auto">
        <h2 className={`text-3xl sm:text-4xl font-semibold text-neutral-900 text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          Frequently asked questions
        </h2>
        <div className={`space-y-3 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {content.faq.map((item, i) => (
            <div
              key={i}
              className="border border-neutral-200 rounded-xl bg-white overflow-hidden"
              data-testid={`faq-${i}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-neutral-50 transition-colors"
                data-testid={`faq-toggle-${i}`}
              >
                <span className="font-medium text-neutral-900">{item.q}</span>
                <span className={`text-neutral-400 transition-transform duration-200 ${openIndex === i ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <p className="px-6 pb-5 text-neutral-600 leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
