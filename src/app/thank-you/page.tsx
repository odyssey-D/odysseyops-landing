import Link from "next/link";

export default function ThankYou() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-lg mx-auto text-center">
        <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-neutral-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-neutral-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold text-neutral-900 mb-4">
          You're on the list
        </h1>
        <p className="text-lg text-neutral-600 leading-relaxed mb-8">
          Thank you for joining the Odyssey Ops beta waitlist. We'll be in touch
          when it's your turn.
        </p>
        <Link
          href="/"
          className="inline-flex px-6 py-3 text-neutral-600 hover:text-neutral-900 transition-colors"
          data-testid="link-back-home"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
