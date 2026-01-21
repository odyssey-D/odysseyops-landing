"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { content } from "@/content";
import { trackEvent } from "@/lib/analytics";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const SITE_COUNT_OPTIONS = [
  { value: "1", label: "1 site" },
  { value: "2-5", label: "2-5 sites" },
  { value: "6-10", label: "6-10 sites" },
  { value: "11+", label: "11+ sites" },
];

interface FormData {
  name: string;
  email: string;
  businessName: string;
  siteCount: string;
  timezone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  businessName?: string;
  siteCount?: string;
  timezone?: string;
}

export function WaitlistForm() {
  const router = useRouter();
  const { ref, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    businessName: "",
    siteCount: "",
    timezone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.businessName.trim())
      newErrors.businessName = "Business name is required";

    if (!formData.siteCount)
      newErrors.siteCount = "Please select number of sites";

    if (!formData.timezone.trim()) newErrors.timezone = "Timezone is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    if (!validate()) return;

    setIsSubmitting(true);
    trackEvent("submit_waitlist");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      trackEvent("submit_waitlist_success");
      router.push("/thank-you");
    } catch (error) {
      trackEvent("submit_waitlist_error");
      setErrors({
        email: error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange =
    (field: keyof FormData) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      setFormData({ ...formData, [field]: e.target.value });
      if (errors[field as keyof FormErrors]) {
        setErrors({ ...errors, [field]: undefined });
      }
    };

  return (
    <section
      id="waitlist"
      ref={ref}
      className="relative z-[60] py-24 px-6 bg-black text-white"
    >
      <div className="max-w-xl mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
            {content.beta.title}
          </h2>
          <p className="text-white/80 leading-relaxed">
            {content.beta.description}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`space-y-5 transition-all duration-700 delay-100 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="absolute opacity-0 pointer-events-none"
            tabIndex={-1}
            autoComplete="off"
          />

          <div>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange("name")}
              className={`w-full px-5 py-4 rounded-xl border ${
                errors.name
                  ? "border-red-300 bg-red-50/30"
                  : "border-neutral-700"
              } bg-black/40 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-neutral-500 transition-all`}
              data-testid="input-name"
            />
            {errors.name && (
              <p className="mt-1.5 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange("email")}
              className={`w-full px-5 py-4 rounded-xl border ${
                errors.email
                  ? "border-red-300 bg-red-50/30"
                  : "border-neutral-700"
              } bg-black/40 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-neutral-500 transition-all`}
              data-testid="input-email"
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Business name"
              value={formData.businessName}
              onChange={handleChange("businessName")}
              className={`w-full px-5 py-4 rounded-xl border ${
                errors.businessName
                  ? "border-red-300 bg-red-50/30"
                  : "border-neutral-700"
              } bg-black/40 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-neutral-500 transition-all`}
              data-testid="input-business-name"
            />
            {errors.businessName && (
              <p className="mt-1.5 text-sm text-red-400">
                {errors.businessName}
              </p>
            )}
          </div>

          <div>
            <select
              value={formData.siteCount}
              onChange={handleChange("siteCount")}
              className={`w-full px-5 py-4 rounded-xl border ${
                errors.siteCount
                  ? "border-red-300 bg-red-50/30"
                  : "border-neutral-700"
              } bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-neutral-500 transition-all appearance-none`}
              data-testid="select-site-count"
            >
              <option value="">Number of sites</option>
              {SITE_COUNT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.siteCount && (
              <p className="mt-1.5 text-sm text-red-400">{errors.siteCount}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Country / Timezone"
              value={formData.timezone}
              onChange={handleChange("timezone")}
              className={`w-full px-5 py-4 rounded-xl border ${
                errors.timezone
                  ? "border-red-300 bg-red-50/30"
                  : "border-neutral-700"
              } bg-black/40 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-neutral-500 transition-all`}
              data-testid="input-timezone"
            />
            {errors.timezone && (
              <p className="mt-1.5 text-sm text-red-400">{errors.timezone}</p>
            )}
          </div>

          <div>
            <textarea
              placeholder="What should Odyssey Ops solve first? (optional)"
              value={formData.message}
              onChange={handleChange("message")}
              rows={3}
              className="w-full px-5 py-4 rounded-xl border border-neutral-700 bg-black/40 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-neutral-500 transition-all resize-none"
              data-testid="input-message"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="button-submit-waitlist"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Joining...
              </span>
            ) : (
              content.beta.cta
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
