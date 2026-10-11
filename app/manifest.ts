import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dr. Samuel Santos — Bloqueio Judicial de Conta",
    short_name: "Samuel Santos",
    description: "Informações jurídicas sobre bloqueio judicial de contas bancárias e SISBAJUD.",
    start_url: "/bloqueio-judicial-de-conta",
    display: "standalone",
    background_color: "#0b0b0b",
    theme_color: "#0b0b0b",
    lang: "pt-BR",
  };
}
