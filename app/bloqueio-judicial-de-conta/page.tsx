import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  FileCheck2,
  FileSearch,
  LockKeyhole,
  Network,
  Scale,
  ShieldCheck,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { ContactCta } from "@/components/contact-cta";
import { ContactForm } from "@/components/contact-form";
import { ContactModal } from "@/components/contact-modal";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { servicePages, siteConfig, whatsappUrl } from "@/lib/site-config";

const accountPage = servicePages.account;

export const metadata: Metadata = {
  title: { absolute: "Bloqueio Judicial de Conta | Dr. Samuel Santos" },
  description:
    "Entenda o bloqueio judicial de contas bancárias, o SISBAJUD e as possibilidades de análise jurídica. Dr. Samuel Santos, OAB/SP 349.894.",
  alternates: { canonical: accountPage.url },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: accountPage.url,
    title: "Bloqueio Judicial de Conta | Dr. Samuel Santos",
    description:
      "Informação jurídica sobre bloqueio de contas bancárias, SISBAJUD e proteção de verbas.",
    siteName: "Dr. Samuel Santos — Advocacia",
    images: [
      {
        url: "/bloqueio-judicial-de-conta/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Dr. Samuel Santos — Bloqueio Judicial de Conta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bloqueio Judicial de Conta | Dr. Samuel Santos",
    description: "Informação jurídica sobre bloqueio de contas bancárias e SISBAJUD.",
    images: ["/bloqueio-judicial-de-conta/opengraph-image"],
  },
};

const situations = [
  {
    icon: LockKeyhole,
    title: "Conta bancária bloqueada judicialmente",
    text: "Identificação da ordem, do processo de origem e do alcance da indisponibilidade.",
  },
  {
    icon: Banknote,
    title: "Bloqueio de valores provenientes de salário",
    text: "Análise da origem comprovável dos recursos e das regras aplicáveis ao caso concreto.",
  },
  {
    icon: CircleDollarSign,
    title: "Aposentadoria ou benefício atingido",
    text: "Verificação documental da natureza da verba, sem presunção de liberação automática.",
  },
  {
    icon: UsersRound,
    title: "Bloqueio em conta conjunta",
    text: "Exame da titularidade, da origem dos depósitos e dos direitos das pessoas envolvidas.",
  },
  {
    icon: Scale,
    title: "Possível excesso de bloqueio judicial",
    text: "Comparação entre a ordem, o valor da execução e as quantias efetivamente alcançadas.",
  },
  {
    icon: Building2,
    title: "Recursos de pessoa jurídica bloqueados",
    text: "Avaliação do impacto e das circunstâncias processuais próprias da atividade empresarial.",
  },
];

const faq = [
  [
    "O que fazer quando a conta bancária é bloqueada judicialmente?",
    "Primeiro, preserve os comprovantes do bloqueio e procure identificar o processo que originou a ordem. Extratos que mostrem a origem dos valores, decisões, intimações e documentos de renda podem ser relevantes. A providência adequada depende do processo, da natureza da dívida e dos recursos atingidos.",
  ],
  [
    "Como descobrir qual processo determinou o bloqueio?",
    "O banco pode apresentar informações básicas sobre a ordem, como órgão judicial ou protocolo. Também é possível pesquisar processos vinculados ao titular nos portais dos tribunais. Quando a informação não é suficiente, a análise profissional pode ajudar a localizar os autos e a decisão responsável.",
  ],
  [
    "O que é bloqueio judicial via SISBAJUD?",
    "É a indisponibilidade de ativos decorrente de uma ordem transmitida eletronicamente pelo SISBAJUD às instituições participantes. O sistema comunica e registra o cumprimento da ordem; a validade da constrição e eventuais alegações de impenhorabilidade são apreciadas pelo juízo do processo.",
  ],
  [
    "Salário pode ser bloqueado judicialmente?",
    "O artigo 833 do Código de Processo Civil prevê proteção para salários e outras verbas remuneratórias, mas a legislação contém exceções e a aplicação depende das circunstâncias e da prova da origem do dinheiro. Não é seguro concluir pela liberação automática sem examinar o caso.",
  ],
  [
    "Aposentadoria pode sofrer penhora?",
    "Proventos de aposentadoria aparecem entre as verbas protegidas pelo CPC. Ainda assim, existem exceções legais e discussões judiciais relacionadas, por exemplo, à natureza da dívida, ao montante recebido e à preservação da subsistência. A documentação da origem dos créditos é relevante.",
  ],
  [
    "Uma conta conjunta pode ser atingida?",
    "Uma ordem pode alcançar valores existentes em conta conjunta vinculada à pessoa executada. Isso não define, por si só, a propriedade integral do saldo. Titularidade, movimentação e origem dos depósitos precisam ser demonstradas e avaliadas no processo.",
  ],
  [
    "É possível questionar um bloqueio excessivo?",
    "O bloqueio deve observar os limites da ordem e da execução. Se houver indisponibilidade superior ao montante devido ou repetição sobre os mesmos recursos, os dados precisam ser documentados e apresentados ao juízo pela medida processual adequada.",
  ],
  [
    "Quanto tempo pode durar um bloqueio judicial?",
    "Não existe uma duração única para todos os casos. O tempo depende do teor da ordem, das respostas das instituições, da manifestação das partes e das decisões do juízo. Somente a consulta aos autos permite avaliar o estágio e os prazos aplicáveis.",
  ],
  [
    "Quais documentos podem ser necessários para análise?",
    "Podem ser úteis a identificação do processo, a comunicação do banco, extratos que demonstrem a origem dos créditos, comprovantes de salário ou benefício e documentos relacionados à execução. A lista deve ser definida conforme o caso, por canal seguro.",
  ],
  [
    "Qual a diferença entre penhora e bloqueio judicial de valores?",
    "O bloqueio torna ativos indisponíveis em cumprimento a uma ordem judicial. A penhora é o ato processual que vincula o bem ou valor à execução. Na prática, a indisponibilidade eletrônica pode anteceder a formalização da penhora e os atos posteriores previstos no processo.",
  ],
] as const;

export default function BloqueioJudicialDeContaPage() {
  const legalServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: siteConfig.legalName,
    url: accountPage.url,
    taxID: siteConfig.cnpj,
    telephone: siteConfig.whatsappDisplay,
    email: siteConfig.email,
    address: { "@type": "PostalAddress", addressLocality: "Atibaia", addressRegion: "SP" },
    founder: { "@type": "Person", name: "Samuel Santos", identifier: siteConfig.oab },
    serviceType: "Atuação jurídica em Direito Civil, execuções e bloqueio judicial de valores",
  };
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Samuel Santos",
    honorificPrefix: "Dr.",
    jobTitle: "Advogado",
    identifier: siteConfig.oab,
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universidade São Francisco" },
    worksFor: { "@type": "LegalService", name: siteConfig.legalName },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: siteConfig.baseUrl },
      { "@type": "ListItem", position: 2, name: "Bloqueio judicial de conta", item: accountPage.url },
    ],
  };

  return (
    <>
      {[legalServiceJsonLd, personJsonLd, breadcrumbJsonLd].map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
        />
      ))}
      <Header pagePath={accountPage.path} />
      <main>
        <section className="hero" id="inicio">
          <div className="hero-rule" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <nav className="breadcrumb" aria-label="Navegação estrutural">
                <Link href="/">Início</Link><span>/</span><span>Bloqueio judicial de conta</span>
              </nav>
              <p className="eyebrow"><span /> DIREITO CIVIL • EXECUÇÕES JUDICIAIS</p>
              <h1>Sua conta bancária sofreu um <em>bloqueio judicial?</em></h1>
              <p className="hero-lead">
                Entenda quais circunstâncias podem justificar a análise jurídica de um bloqueio judicial de valores e quais medidas podem ser avaliadas conforme as particularidades do seu caso.
              </p>
              <div className="hero-actions">
                <ContactCta href={whatsappUrl("account")} location="hero">Solicitar atendimento jurídico</ContactCta>
                <a className="quiet-link" href="#entenda">Entenda como funciona <ArrowDown aria-hidden="true" size={16} /></a>
              </div>
              <div className="lawyer-id"><span>SS</span><p><strong>Dr. Samuel Santos</strong><small>{siteConfig.oab}</small></p></div>
            </div>
            <div className="hero-portrait-wrap">
              <div className="portrait-frame">
                <Image
                  src="/images/samuel-santos-upscale.jpeg"
                  alt="Retrato profissional do Dr. Samuel Santos"
                  fill
                  priority
                  sizes="(max-width: 900px) 92vw, 42vw"
                  className="portrait-image"
                />
                <div className="portrait-vignette" />
                <div className="portrait-caption"><span>Atuação em</span><strong>Direito Civil</strong><small>Execuções e bloqueios</small></div>
              </div>
              <div className="document-motif bank-motif" aria-hidden="true"><LockKeyhole size={22} /><span /><span /><span /></div>
              <div className="gold-square" aria-hidden="true" />
            </div>
          </div>
          <div className="container trust-strip">
            <span><BadgeCheck size={18} aria-hidden="true" />Identificação profissional verificável</span>
            <span><FileCheck2 size={18} aria-hidden="true" />Análise documental e processual</span>
            <span><ShieldCheck size={18} aria-hidden="true" />Atendimento com confidencialidade</span>
          </div>
        </section>

        <section className="section light" id="situacoes">
          <div className="container">
            <div className="section-heading split-heading">
              <div><p className="section-index">01 — SITUAÇÕES QUE MERECEM ATENÇÃO</p><h2>Quando um bloqueio judicial de valores exige atenção jurídica?</h2></div>
              <p>Nem todo bloqueio é indevido. A origem do dinheiro, os limites da ordem e o processo responsável precisam ser examinados antes de definir qualquer medida.</p>
            </div>
            <div className="situations-grid">
              {situations.map(({ icon: Icon, title, text }, index) => (
                <article className="situation-card" key={title}>
                  <span className="card-number">0{index + 1}</span><Icon aria-hidden="true" size={25} strokeWidth={1.5} />
                  <h3>{title}</h3><p>{text}</p>
                </article>
              ))}
            </div>
            <div className="section-cta-row">
              <ContactCta openForm location="situations_section" className="section-contact-button">Apresentar minha situação</ContactCta>
              <p>Informe apenas dados iniciais, sem documentos ou detalhes bancários.</p>
            </div>
          </div>
        </section>

        <section className="section paper-section" id="entenda">
          <div className="container editorial-grid">
            <div className="sticky-title"><p className="section-index">02 — ENTENDA O BLOQUEIO</p><h2>O que significa ter uma conta bancária bloqueada judicialmente?</h2><div className="editorial-mark"><WalletCards size={34} aria-hidden="true" /></div></div>
            <div className="editorial-copy">
              <p className="lead-serif">O bloqueio judicial torna valores temporariamente indisponíveis por determinação de um juízo, geralmente no contexto de uma execução ou de outra medida de constrição patrimonial.</p>
              <p>A instituição financeira cumpre a ordem recebida dentro dos parâmetros comunicados. O banco não decide, por conta própria, se o valor deve permanecer bloqueado: eventuais alegações sobre excesso, origem protegida ou titularidade são analisadas no processo.</p>
              <div className="process-line">
                {[["01","Identificar a comunicação do banco"],["02","Localizar o processo responsável"],["03","Examinar a ordem e o valor atingido"],["04","Reunir prova da origem dos recursos"]].map(([number, title]) => <div key={number}><span>{number}</span><strong>{title}</strong></div>)}
              </div>
              <aside className="legal-note"><FileSearch size={22} aria-hidden="true" /><p><strong>O processo é o ponto de partida.</strong> A tela do aplicativo bancário mostra o efeito do bloqueio, mas a decisão judicial e os autos esclarecem sua origem, limites e fase processual.</p></aside>
            </div>
          </div>
        </section>

        <section className="section risk-section sisbajud-section">
          <div className="container">
            <div className="section-heading centered"><p className="section-index">03 — SISBAJUD</p><h2>O que é o SISBAJUD e como ele funciona?</h2><p>O SISBAJUD é a ferramenta eletrônica que intermedeia ordens judiciais entre o Poder Judiciário e instituições financeiras. O sistema não torna todo bloqueio automaticamente correto ou incorreto.</p></div>
            <div className="sisbajud-flow">
              {[
                [Scale,"01","Existência de uma ordem judicial","O juízo define a medida e o montante indicado no processo."],
                [Network,"02","Comunicação às instituições","A ordem é transmitida eletronicamente às instituições participantes."],
                [LockKeyhole,"03","Bloqueio conforme a ordem","Ativos disponíveis podem ser tornados indisponíveis até os limites comunicados."],
              ].map(([Icon, number, title, text]) => {
                const StepIcon = Icon as typeof Scale;
                return <article key={String(number)}><div><span>{String(number)}</span><StepIcon size={27} aria-hidden="true" /></div><h3>{String(title)}</h3><p>{String(text)}</p></article>;
              })}
            </div>
            <div className="official-source-row">
              <a className="source-link source-link-dark" href="https://www.cnj.jus.br/sistemas/sisbajud/" target="_blank" rel="noreferrer">Conhecer o SISBAJUD no portal do CNJ <ArrowRight size={16} /></a>
              <ContactCta openForm location="sisbajud_section" className="section-contact-button">Solicitar análise do bloqueio</ContactCta>
            </div>
          </div>
        </section>

        <section className="section dark-section">
          <div className="container family-grid">
            <div className="family-visual account-visual" aria-hidden="true"><ShieldCheck size={58} strokeWidth={1.15} /><div className="orbit orbit-one" /><div className="orbit orbit-two" /><span>CPC<br/><strong>Art. 833</strong><br/>e exceções</span></div>
            <div className="family-copy">
              <p className="section-index gold">04 — VALORES IMPENHORÁVEIS</p>
              <h2>Existem valores que podem ser protegidos contra penhora?</h2>
              <p>O artigo 833 do Código de Processo Civil prevê hipóteses de impenhorabilidade, incluindo, em regra, salários, aposentadorias, pensões e outras verbas destinadas à subsistência. A lei também contempla determinadas quantias depositadas em poupança.</p>
              <p>Essas proteções <strong>não devem ser tratadas como automáticas</strong>. O próprio CPC estabelece exceções, e a aplicação pode depender da natureza da dívida, do montante, da origem comprovada dos créditos e da interpretação judicial no caso concreto.</p>
              <div className="principles">
                <span><CheckCircle2 size={18} />Origem dos valores comprovada por documentos</span>
                <span><CheckCircle2 size={18} />Exceções legais consideradas na análise</span>
                <span><CheckCircle2 size={18} />Preservação da subsistência avaliada no caso</span>
              </div>
              <a className="source-link" href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105compilada.htm#art833" target="_blank" rel="noreferrer">Consultar o artigo 833 do CPC no Planalto <ArrowRight size={16} /></a>
              <div className="section-cta-row dark-cta-row align-start"><ContactCta openForm location="protected_funds_section" className="section-contact-button">Conversar sobre a origem dos valores</ContactCta></div>
            </div>
          </div>
        </section>

        <section className="section method-section" id="atuacao">
          <div className="container">
            <div className="section-heading split-heading"><div><p className="section-index">05 — ATENDIMENTO</p><h2>Como funciona a análise jurídica do seu caso?</h2></div><p>O atendimento começa pela compreensão objetiva da situação. Qualquer medida depende da leitura dos autos e dos documentos pertinentes.</p></div>
            <div className="method-flow">
              {[
                ["01","Primeiro contato","O interessado apresenta informações iniciais sobre a situação."],
                ["02","Identificação do bloqueio","Verificação das circunstâncias gerais da ordem judicial."],
                ["03","Análise jurídica","Avaliação da documentação e das possíveis medidas cabíveis."],
                ["04","Orientação","Esclarecimento sobre os próximos passos, conforme o caso concreto."],
              ].map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="section about-section" id="sobre">
          <div className="container about-grid">
            <div className="about-photo"><Image src="/images/samuel-santos-upscale.jpeg" alt="Dr. Samuel Santos, advogado inscrito na OAB/SP 349.894" fill sizes="(max-width: 900px) 92vw, 40vw" className="about-image" /><span className="photo-label">Atuação profissional<br/>em Direito Civil</span></div>
            <div className="about-copy">
              <p className="section-index">06 — SOBRE O ADVOGADO</p><h2>Conheça o Dr. Samuel Santos</h2><p className="oab-line">{siteConfig.oab}</p>
              <p className="lead-serif">Atuação em demandas relacionadas ao Direito Civil, execuções judiciais e questões patrimoniais.</p>
              <p>Dr. Samuel Santos, inscrito na OAB/SP sob o nº 349.894, é bacharel em Direito pela Universidade São Francisco. O atendimento é conduzido a partir da análise dos documentos e do contexto de cada processo, com comunicação clara sobre as alternativas juridicamente cabíveis.</p>
              <div className="credentials"><div><span>Formação</span><strong>Universidade São Francisco</strong></div><div><span>Sociedade</span><strong>{siteConfig.legalName}</strong></div></div>
              <div className="section-cta-row align-start"><ContactCta openForm location="about_section" className="section-contact-button">Falar com o escritório</ContactCta></div>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="duvidas">
          <div className="container">
            <div className="faq-grid">
              <div className="faq-intro"><p className="section-index">07 — PERGUNTAS FREQUENTES</p><h2>Informação clara para compreender o próximo passo.</h2><p>As respostas são gerais, não substituem a análise dos autos e não representam promessa de desbloqueio.</p></div>
              <div className="faq-list">{faq.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2,"0")}</span>{question}<i aria-hidden="true">+</i></summary><p>{answer}</p></details>)}</div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contato">
          <div className="container contact-grid">
            <div className="contact-copy">
              <p className="section-index gold">08 — CONTATO</p><h2>Sua conta foi atingida por um bloqueio judicial?</h2>
              <p>A análise das circunstâncias do processo pode ajudar a identificar as medidas juridicamente cabíveis.</p>
              <ContactCta openForm location="final_cta" variant="outline">Entrar em contato com o escritório</ContactCta>
              <small>Não envie CPF, dados bancários, senhas, documentos ou detalhes confidenciais pelo formulário.</small>
            </div>
            <div className="form-card">
              <div className="form-card-heading"><span>Solicitação de contato</span><p>Informe apenas os dados iniciais.</p></div>
              <ContactForm whatsappNumber={siteConfig.whatsapp} leadsWebhookUrl={siteConfig.accountLeadsWebhookUrl} location="contact_section" pageService="bloqueio_conta" />
            </div>
          </div>
        </section>
      </main>
      <ContactModal whatsappNumber={siteConfig.whatsapp} leadsWebhookUrl={siteConfig.accountLeadsWebhookUrl} pageService="bloqueio_conta" />
      <Footer pagePath={accountPage.path} />
    </>
  );
}
