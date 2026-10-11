"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ContactForm } from "@/components/contact-form";
import type { PageService } from "@/lib/site-config";

export function ContactModal({
  whatsappNumber,
  leadsWebhookUrl,
  pageService = "penhora_imovel",
}: {
  whatsappNumber: string;
  leadsWebhookUrl: string;
  pageService?: PageService;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    const open = () => {
      setFormKey((current) => current + 1);
      dialogRef.current?.showModal();
    };
    window.addEventListener("open-contact-modal", open as EventListener);
    return () => window.removeEventListener("open-contact-modal", open as EventListener);
  }, []);

  function close() {
    dialogRef.current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      className="contact-modal"
      aria-labelledby="contact-modal-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="contact-modal-panel">
        <button className="modal-close" type="button" onClick={close} aria-label="Fechar formulário">
          <X aria-hidden="true" size={21} />
        </button>
        <div className="modal-heading">
          <p className="section-index">ATENDIMENTO JURÍDICO</p>
          <h2 id="contact-modal-title">Conte brevemente sua situação.</h2>
          <p>Preencha os dados iniciais. Ao enviar, você será direcionado ao WhatsApp do escritório.</p>
        </div>
        <ContactForm key={formKey} whatsappNumber={whatsappNumber} leadsWebhookUrl={leadsWebhookUrl} location="contact_modal" pageService={pageService} />
      </div>
    </dialog>
  );
}
