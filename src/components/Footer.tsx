"use client";

import { content } from "@/content";

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-neutral-100">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-neutral-500 text-sm">
          {content.footer.note}
        </p>
        <a
          href={`mailto:${content.footer.contact}`}
          className="text-neutral-600 text-sm hover:text-neutral-900 transition-colors mt-2 inline-block"
          data-testid="link-contact"
        >
          {content.footer.contact}
        </a>
      </div>
    </footer>
  );
}
