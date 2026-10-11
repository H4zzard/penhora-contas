"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setVisible(localStorage.getItem("analytics_consent") === null);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  function choose(value: "granted" | "denied") {
    localStorage.setItem("analytics_consent", value);
    window.dispatchEvent(new Event("analytics-consent-changed"));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside className="cookie-banner" aria-label="Preferências de cookies">
      <div>
        <strong>Privacidade e cookies</strong>
        <p>
          Cookies necessários mantêm o site funcionando. Com sua autorização, dados de navegação e
          atribuição ajudam a avaliar esta página, sem transmitir informações jurídicas sensíveis.{" "}
          <Link href="/politica-de-cookies">Saiba mais</Link>.
        </p>
      </div>
      <div className="cookie-actions">
        <button className="cookie-secondary" type="button" onClick={() => choose("denied")}>
          Somente necessários
        </button>
        <button className="cookie-primary" type="button" onClick={() => choose("granted")}>
          Autorizar análise
        </button>
      </div>
    </aside>
  );
}
