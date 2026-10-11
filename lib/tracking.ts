export const ATTRIBUTION_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type TrackedEvent =
  | "page_view"
  | "cta_whatsapp_click"
  | "contact_form_submit"
  | "lead_qualification_confirmed";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function hasAnalyticsConsent() {
  return typeof window !== "undefined" && localStorage.getItem("analytics_consent") === "granted";
}

export function trackEvent(event: TrackedEvent, details: Record<string, unknown> = {}) {
  if (!hasAnalyticsConsent()) return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...details, page_service: "bloqueio_conta" });
}

export function readAttribution() {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return {};
  const raw = localStorage.getItem("marketing_attribution");
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return {};
  }
}
