"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  accountContactSchema,
  accountSituationOptions,
  propertyContactSchema,
  propertySituationOptions,
  propertyValueOptions,
  type ContactInput,
} from "@/lib/contact-schema";
import type { PageService } from "@/lib/site-config";
import { readAttribution, trackEvent } from "@/lib/tracking";

type ContactFormProps = {
  whatsappNumber: string;
  leadsWebhookUrl: string;
  location: "contact_section" | "contact_modal";
  pageService?: PageService;
};

async function deliverLead(url: string, payload: Record<string, unknown>) {
  if (!url) return;

  const request = fetch(url, {
    method: "POST",
    mode: "no-cors",
    keepalive: true,
    headers: { "Content-Type": "text/plain;charset=UTF-8" },
    body: JSON.stringify(payload),
  }).catch(() => undefined);

  await Promise.race([
    request,
    new Promise((resolve) => window.setTimeout(resolve, 1500)),
  ]);
}

export function ContactForm({
  whatsappNumber,
  leadsWebhookUrl,
  location,
  pageService = "penhora_imovel",
}: ContactFormProps) {
  const isAccountPage = pageService === "bloqueio_conta";
  const schema = isAccountPage ? accountContactSchema : propertyContactSchema;
  const situationOptions = isAccountPage ? accountSituationOptions : propertySituationOptions;
  const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm<ContactInput>({
    resolver: zodResolver(schema),
    defaultValues: { privacyAccepted: false },
    mode: "onChange",
  });

  async function onSubmit(values: ContactInput) {
    if (!whatsappNumber) return;
    const leadId = crypto.randomUUID();
    const leadPayload = {
      formKey: isAccountPage ? "bloqueio_conta_site_v1" : "imovel_site_v1",
      leadId,
      submittedAt: new Date().toISOString(),
      pageService,
      pageUrl: window.location.href,
      formLocation: location,
      name: values.name,
      whatsapp: values.whatsapp,
      situation: values.situation,
      propertyValue: "propertyValue" in values ? values.propertyValue : undefined,
      city: values.city,
      privacyAccepted: values.privacyAccepted,
      attribution: readAttribution(),
    };

    await deliverLead(leadsWebhookUrl, leadPayload);

    const message = [
      "Olá, Dr. Samuel.",
      isAccountPage
        ? "Gostaria de informações sobre atendimento jurídico relacionado a um bloqueio judicial em conta bancária."
        : "Vim pelo site advsamuelsantos.com.br e preciso de ajuda com penhora de imóveis.",
      "",
      `Nome: ${values.name}`,
      `WhatsApp: ${values.whatsapp}`,
      `Situação: ${values.situation}`,
      ...(isAccountPage || !("propertyValue" in values) ? [] : [`Valor do imóvel: ${values.propertyValue}`]),
      `Cidade/UF: ${values.city}`,
    ].join("\n");

    trackEvent("contact_form_submit", { form_location: location, destination: "whatsapp" });
    window.location.assign(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="field-row">
        <label>Nome<input autoComplete="name" required {...register("name")} aria-invalid={!!errors.name} /></label>
        <label>WhatsApp<input autoComplete="tel" inputMode="tel" required placeholder="(11) 99999-9999" {...register("whatsapp")} aria-invalid={!!errors.whatsapp} /></label>
      </div>
      <div className="field-row">
        <label>Tipo de situação
          <select defaultValue="" required {...register("situation")} aria-invalid={!!errors.situation}>
            <option value="" disabled>Selecione</option>
            {situationOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        {!isAccountPage && (
          <label>Valor aproximado do imóvel
            <select defaultValue="" required {...register("propertyValue")} aria-invalid={!!errors.propertyValue}>
              <option value="" disabled>Selecione</option>
              {propertyValueOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
        )}
        {isAccountPage && <label>Cidade/UF<input autoComplete="address-level2" required placeholder="Ex.: Campinas/SP" {...register("city")} aria-invalid={!!errors.city} /></label>}
      </div>
      {!isAccountPage && <label className="field-full">Cidade/UF<input autoComplete="address-level2" required placeholder="Ex.: Campinas/SP" {...register("city")} aria-invalid={!!errors.city} /></label>}
      <div className="form-errors" aria-live="polite">
        {Object.values(errors)[0]?.message && <p>{String(Object.values(errors)[0]?.message)}</p>}
      </div>
      <label className="check-field">
        <input type="checkbox" required {...register("privacyAccepted")} />
        <span>Li e aceito a <Link href="/politica-de-privacidade" target="_blank">Política de Privacidade</Link>. Não inclua documentos ou detalhes confidenciais.</span>
      </label>
      <button className="button button-gold form-submit" type="submit" disabled={!isValid || isSubmitting || !whatsappNumber}>
        <MessageCircle aria-hidden="true" size={18} />
        {isSubmitting ? "Registrando contato…" : "Enviar pelo WhatsApp"}
      </button>
      {!isValid && <p className="form-config-note">Preencha todos os campos e aceite a Política de Privacidade para habilitar o envio.</p>}
      {!whatsappNumber && <p className="form-config-note">O número do WhatsApp precisa ser configurado antes do envio.</p>}
    </form>
  );
}
