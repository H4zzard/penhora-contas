import Link from "next/link";
import { Scale } from "lucide-react";
import { ContactCta } from "@/components/contact-cta";

export function Header({ pagePath = "/bloqueio-judicial-de-conta" }: { pagePath?: string }) {
  const nav = [
    ["Início", `${pagePath}#inicio`],
    ["Situações atendidas", `${pagePath}#situacoes`],
    ["Sobre", `${pagePath}#sobre`],
    ["Dúvidas", `${pagePath}#duvidas`],
    ["Contato", `${pagePath}#contato`],
  ] as const;

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href={pagePath} aria-label="Página inicial — Dr. Samuel Santos">
          <span className="brand-mark"><Scale aria-hidden="true" size={21} strokeWidth={1.5} /></span>
          <span>
            <strong>Samuel Santos</strong>
            <small>Advocacia</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <ContactCta openForm location="header" className="header-cta">
          Falar com o escritório
        </ContactCta>
      </div>
    </header>
  );
}
