import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Footer({ pagePath = "/bloqueio-judicial-de-conta" }: { pagePath?: string }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-identity">
          <p className="footer-kicker">ADVOCACIA • DIREITO CIVIL</p>
          <h2>Dr. Samuel Santos</h2>
          <p>{siteConfig.oab}</p>
          <p className="footer-note">Informação jurídica com sobriedade, clareza e análise individualizada.</p>
        </div>
        <div>
          <h3>Institucional</h3>
          <Link href={`${pagePath}#sobre`}>Sobre o advogado</Link>
          <Link href={`${pagePath}#atuacao`}>Como funciona o atendimento</Link>
          <Link href={`${pagePath}#duvidas`}>Dúvidas frequentes</Link>
          <Link href="/bloqueio-judicial-de-conta">Bloqueio de conta</Link>
        </div>
        <div>
          <h3>Informações</h3>
          <Link href="/politica-de-privacidade">Política de Privacidade</Link>
          <Link href="/politica-de-cookies">Política de Cookies</Link>
          {siteConfig.whatsapp && <a href={`tel:+${siteConfig.whatsapp}`}>{siteConfig.whatsappDisplay}</a>}
          {siteConfig.email && <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>}
          {siteConfig.address && <p>{siteConfig.address}</p>}
        </div>
        <div className="footer-legal">
          <h3>Identificação</h3>
          <p>{siteConfig.legalName}</p>
          <p>CNPJ {siteConfig.cnpj}</p>
          <a href={`${pagePath}#inicio`}>Voltar ao topo <ArrowUpRight aria-hidden="true" size={15} /></a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.legalName}.</span>
        <span>Conteúdo informativo. A análise jurídica depende das particularidades de cada caso.</span>
      </div>
    </footer>
  );
}
