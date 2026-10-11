"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { ATTRIBUTION_KEYS, hasAnalyticsConsent, trackEvent } from "@/lib/tracking";

export function Tracking({ gtmId }: { gtmId: string }) {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const initialize = () => {
      const granted = hasAnalyticsConsent();
      setConsented(granted);
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

  if (!gtmId || !consented) return null;

  return (
    <Script id="gtm-loader" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
    </Script>
  );
}
