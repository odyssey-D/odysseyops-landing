"use client";

import { content } from "@/content";

export function Segments() {
  return (
    <section className="relative z-[60] py-24 px-6 bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-white">
            For single-site operators
          </h3>

          <ul className="space-y-4 text-white text-base md:text-lg leading-relaxed">
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

          <ul className="space-y-4 text-white text-base md:text-lg leading-relaxed">
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
