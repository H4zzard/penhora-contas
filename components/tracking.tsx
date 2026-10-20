"use client";

import { useEffect } from "react";
import { ATTRIBUTION_KEYS, hasAnalyticsConsent, trackEvent } from "@/lib/tracking";

export function Tracking() {
  useEffect(() => {
    const initialize = () => {
      const granted = hasAnalyticsConsent();
      if (!granted) return;

      const params = new URLSearchParams(window.location.search);
      const attribution: Record<string, string> = {};
      for (const key of ATTRIBUTION_KEYS) {
        const value = params.get(key);
        if (value) attribution[key] = value.slice(0, 300);
      }
      if (Object.keys(attribution).length > 0) {
        localStorage.setItem("marketing_attribution", JSON.stringify(attribution));
      }
      trackEvent("page_view");
    };

    initialize();
    window.addEventListener("analytics-consent-changed", initialize);
    return () => window.removeEventListener("analytics-consent-changed", initialize);
  }, []);

  return null;
}
