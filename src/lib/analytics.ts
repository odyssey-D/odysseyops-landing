declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean> }
    ) => void;
  }
}

export type AnalyticsEvent =
  | "view_landing"
  | "click_join_waitlist"
  | "submit_waitlist"
  | "submit_waitlist_success"
  | "submit_waitlist_error";

export function trackEvent(
  event: AnalyticsEvent,
  props?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && window.plausible) {
    window.plausible(event, props ? { props } : undefined);
  }
}
