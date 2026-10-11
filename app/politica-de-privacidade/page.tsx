import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Política de Privacidade", alternates: { canonical: `${siteConfig.baseUrl}/politica-de-privacidade` } };

export default function PrivacyPage() {
  return <><Header/><main className="legal-page"><div className="container narrow"><p className="section-index">PRIVACIDADE</p><h1>Política de Privacidade</h1><p className="legal-date">Última atualização: 9 de outubro de 2026</p>
    <p>Esta política descreve como {siteConfig.legalName}, CNPJ {siteConfig.cnpj}, trata dados pessoais fornecidos neste site.</p>
    <h2>Dados informados no formulário</h2><p>Os formulários solicitam nome, WhatsApp, tipo geral de situação, cidade/UF e aceite de privacidade. A página de imóveis também solicita uma faixa aproximada do valor do bem; a página de bloqueio de conta não solicita valores, dados bancários, CPF ou número de processo. Após a validação, os dados podem ser registrados em uma planilha de atendimento quando essa integração estiver configurada e são organizados em uma mensagem para redirecionamento ao WhatsApp. Não envie documentos ou detalhes jurídicos confidenciais.</p>
    <h2>Finalidades e bases</h2><p>Os dados informados são usados para iniciar o atendimento solicitado. Depois que o visitante prossegue para o WhatsApp, a comunicação também fica sujeita aos termos e às práticas de privacidade dessa plataforma. Mediante consentimento, dados não sensíveis de navegação e atribuição podem ser utilizados para mensuração.</p>
    <h2>Compartilhamento e conservação</h2><p>Dados podem ser processados pelos fornecedores necessários à hospedagem, comunicação e mensuração, sempre limitados à finalidade correspondente. O período de conservação das conversas pelo escritório deve observar a necessidade do atendimento, obrigações legais e o exercício regular de direitos.</p>
    <h2>Direitos do titular</h2><p>O titular pode solicitar confirmação de tratamento, acesso, correção, eliminação quando cabível e informações sobre compartilhamento, nos termos da legislação aplicável.</p>
    <h2>Contato</h2><p>{siteConfig.email ? <>Solicitações podem ser enviadas para <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</> : <>O canal de privacidade deve ser configurado antes da publicação final. Consulte o escritório pelo canal indicado na página principal.</>}</p>
    <p className="legal-disclaimer">Este texto deve passar por validação do responsável pelo tratamento antes da publicação definitiva.</p><Link className="back-link" href="/bloqueio-judicial-de-conta">← Voltar à página principal</Link></div></main><Footer/></>;
}
