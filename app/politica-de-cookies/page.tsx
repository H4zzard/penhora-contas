import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Política de Cookies", alternates: { canonical: `${siteConfig.baseUrl}/politica-de-cookies` } };

export default function CookiesPage() {
  return <><Header/><main className="legal-page"><div className="container narrow"><p className="section-index">COOKIES</p><h1>Política de Cookies</h1><p className="legal-date">Última atualização: 9 de outubro de 2026</p>
    <p>Este site utiliza armazenamento local e, quando autorizado, tecnologias de mensuração para oferecer a experiência e compreender o desempenho da página.</p>
    <h2>Necessários</h2><p>A preferência de consentimento é guardada no navegador para que sua escolha seja respeitada. Esses recursos não dependem de autorização para a operação básica do site.</p>
    <h2>Análise e atribuição</h2><p>Quando você autoriza, o site pode carregar o Google Tag Manager configurado pelo escritório e guardar parâmetros como gclid, gbraid, wbraid e UTMs. Não devem ser transmitidos ao GA4 ou ao Google Ads dados sobre documentos, processos ou o conteúdo jurídico do atendimento.</p>
    <h2>Como alterar a escolha</h2><p>Você pode remover os dados do site nas configurações do navegador. Ao retornar, o aviso de preferências será apresentado novamente.</p>
    <h2>Tags de terceiros</h2><p>Nenhuma identificação fictícia é incluída. Ferramentas externas só são carregadas quando existe configuração válida e consentimento.</p>
    <p className="legal-disclaimer">Esta política deve ser revisada sempre que a configuração de mensuração for alterada.</p><Link className="back-link" href="/bloqueio-judicial-de-conta">← Voltar à página principal</Link></div></main><Footer/></>;
}
