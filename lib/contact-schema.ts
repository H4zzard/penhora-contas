import { z } from "zod";

export const propertySituationOptions = [
  "Imóvel penhorado",
  "Risco de penhora",
  "Leilão agendado",
  "Outra situação",
] as const;

export const accountSituationOptions = [
  "Conta bloqueada judicialmente",
  "Bloqueio de salário ou benefício",
  "Bloqueio de conta empresarial",
  "Possível excesso de bloqueio",
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
  city: z.string().trim().min(2, "Informe cidade e UF.").max(100),
  privacyAccepted: z.boolean().refine((value) => value, {
    message: "É necessário aceitar a Política de Privacidade.",
  }),
});

export const propertyContactSchema = baseContactSchema.extend({
  situation: z.enum(propertySituationOptions, { message: "Selecione uma situação." }),
  propertyValue: z.enum(propertyValueOptions, { message: "Selecione o valor do imóvel." }),
});

export const accountContactSchema = baseContactSchema.extend({
  situation: z.enum(accountSituationOptions, { message: "Selecione uma situação." }),
  propertyValue: z.string().optional(),
});

export type ContactInput = z.infer<typeof propertyContactSchema> | z.infer<typeof accountContactSchema>;
