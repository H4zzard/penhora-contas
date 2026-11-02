import { z } from "zod";

export const propertySituationOptions = [
  "Imóvel penhorado",
  "Risco de penhora",
  "Leilão agendado",
  "Outra situação",
] as const;

export const propertyValueOptions = [
  "Até R$ 500 mil",
  "De R$ 500 mil a R$ 1 milhão",
  "Acima de R$ 1 milhão",
] as const;

const baseContactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(100),
  whatsapp: z
    .string()
    .trim()
    .min(10, "Informe um WhatsApp com DDD.")
    .max(20, "Revise o número informado.")
    .regex(/^[+()\d\s-]+$/, "Use apenas números e os símbolos +, (, ), espaço ou hífen."),
  city: z.string().optional(),
  situation: z.string().optional(),
  propertyValue: z.string().optional(),
  blockedAmount: z.string().optional(),
  privacyAccepted: z.boolean().refine((value) => value, {
    message: "É necessário aceitar a Política de Privacidade.",
  }),
});

export const propertyContactSchema = baseContactSchema.extend({
  situation: z.enum(propertySituationOptions, { message: "Selecione uma situação." }),
  propertyValue: z.enum(propertyValueOptions, { message: "Selecione o valor do imóvel." }),
  city: z.string().trim().min(2, "Informe cidade e UF.").max(100),
});

export const accountContactSchema = baseContactSchema.extend({
  blockedAmount: z
    .string()
    .trim()
    .min(1, "Informe o valor bloqueado.")
    .max(21, "Revise o valor informado.")
    .regex(/^\d{1,3}(?:\.\d{3})*$/, "Informe um valor válido.")
    .refine((value) => Number.isSafeInteger(Number(value.replace(/\./g, ""))), {
      message: "Revise o valor informado.",
    })
    .refine((value) => Number(value.replace(/\D/g, "")) > 50000, {
      message: "O valor bloqueado precisa ser superior a R$ 50 mil.",
    }),
});

export type ContactInput = z.infer<typeof propertyContactSchema> | z.infer<typeof accountContactSchema>;
