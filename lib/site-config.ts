const productionSiteUrl = "https://contas.advsamuelsantos.com.br";
const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? productionSiteUrl).replace(/\/$/, "");
const allowIndexing =
  process.env.NODE_ENV === "production" &&
  process.env.VERCEL_ENV !== "preview" &&
  process.env.VERCEL_ENV !== "development" &&
  baseUrl === productionSiteUrl;
const configuredGtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();
const gtmId = configuredGtmId && /^GTM-[A-Z0-9]+$/.test(configuredGtmId)
  ? configuredGtmId
  : "GTM-5KHN42MZ";

export type PageService = "penhora_imovel" | "bloqueio_conta";

export const servicePages = {
  property: {
    service: "penhora_imovel" as const,
    path: "/penhora-de-imoveis",
    url: `${baseUrl}/penhora-de-imoveis/`,
    whatsappMessage:
      "Olá, Dr. Samuel. Gostaria de informações sobre atendimento jurídico relacionado à penhora de um imóvel.",
  },
  account: {
    service: "bloqueio_conta" as const,
    path: "/bloqueio-judicial-de-conta",
    url: `${baseUrl}/bloqueio-judicial-de-conta`,
    whatsappMessage:
      "Olá, Dr. Samuel! Gostaria de informações sobre atendimento jurídico relacionado a um bloqueio judicial em conta bancária.",
  },
} as const;

export const siteConfig = {
  name: "Dr. Samuel Santos",
  legalName: "Samuel dos Santos Silva Sociedade Individual de Advocacia",
  oab: "OAB/SP 349.894",
  cnpj: "35.852.807/0001-37",
  education: "Bacharel em Direito pela Universidade São Francisco",
  baseUrl,
  pagePath: servicePages.account.path,
  pageUrl: servicePages.account.url,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "contato@advsamuelsantos.com.br",
  address: process.env.NEXT_PUBLIC_OFFICE_ADDRESS?.trim() || "Atibaia — SP",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "5511936249503",
  whatsappDisplay: "(11) 93624-9503",
  whatsappMessage: servicePages.account.whatsappMessage,
  leadsWebhookUrl:
    process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL?.trim()
    || "https://script.google.com/macros/s/AKfycbwpPk9fLTa6fzrRvvIUmKDMRz6k7DwmEdPQhS5ADm_7--1wBNJMtWbcZIolbfCEo3KPPQ/exec",
  accountLeadsWebhookUrl:
    process.env.NEXT_PUBLIC_ACCOUNT_GOOGLE_APPS_SCRIPT_URL?.trim()
    || "https://script.google.com/macros/s/AKfycbwpPk9fLTa6fzrRvvIUmKDMRz6k7DwmEdPQhS5ADm_7--1wBNJMtWbcZIolbfCEo3KPPQ/exec",
  allowIndexing,
  gtmId,
} as const;

export function whatsappUrl(service: keyof typeof servicePages = "account") {
  if (!siteConfig.whatsapp) return "#contato";
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(servicePages[service].whatsappMessage)}`;
}
