"use client";

import { content } from "@/content";

export function Segments() {
  return (
    <section
      className="
        py-24 px-6 bg-black
        relative
        isolate
        transform-gpu
      "
      style={{ opacity: 1 }}
    >
      <div
        className="
          max-w-4xl mx-auto
          text-white
          relative
          z-10
        "
        style={{ opacity: 1 }}
      >
        {/* Single-site */}
        <div className="mb-16">
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white">
            For single-site operators
          </h3>

          <ul className="space-y-3 leading-relaxed">
            {content.segments.single.map((item: string, i: number) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white shrink-0" />
                <span className="text-white">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Multi-site */}
        <div>
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white">
            For multi-site operators
          </h3>

          <ul className="space-y-3 leading-relaxed">
            {content.segments.multi.map((item: string, i: number) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white shrink-0" />
                <span className="text-white">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
