"use client";

import { ArrowUpRight, MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

type ContactCtaProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "gold" | "outline" | "text";
  location: string;
  className?: string;
  openForm?: boolean;
};

export function ContactCta({
  href = "#contato",
  children,
  variant = "gold",
  location,
  className = "",
  openForm = false,
}: ContactCtaProps) {
  const isWhatsapp = href.startsWith("https://wa.me/");
  const content = (
    <>
      {variant === "gold" && <MessageCircle aria-hidden="true" size={18} strokeWidth={1.8} />}
      <span>{children}</span>
      {variant !== "gold" && <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />}
    </>
  );

  if (openForm) {
    return (
      <button
        className={`button button-${variant} ${className}`}
        type="button"
        onClick={() => window.dispatchEvent(new CustomEvent("open-contact-modal", { detail: { location } }))}
      >
        {content}
      </button>
    );
  }

  return (
    <a
      className={`button button-${variant} ${className}`}
      href={href}
      target={isWhatsapp ? "_blank" : undefined}
      rel={isWhatsapp ? "noreferrer" : undefined}
      onClick={() => {
        if (isWhatsapp) trackEvent("cta_whatsapp_click", { cta_location: location });
      }}
    >
      {content}
    </a>
  );
}
