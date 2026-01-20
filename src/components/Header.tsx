"use client";

import { trackEvent } from "@/lib/analytics";

export function Header() {
  const handleClick = () => {
    trackEvent("click_join_waitlist");
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="font-semibold text-neutral-900 tracking-tight">
          Odyssey Ops
        </div>
        <button
          onClick={handleClick}
          className="px-5 py-2 bg-neutral-900 text-white text-sm rounded-full font-medium hover:bg-neutral-800 transition-colors"
          data-testid="button-header-cta"
        >
          Join Waitlist
        </button>
      </div>
    </header>
  );
}
