import { z } from "zod";
import { validarDNI, validarIBAN } from "./validateCustom";

export const idParamSchema = z.object({
    id: z.coerce.number(),
  });
  
  
  
 export const sociQuotaBodySchema = z.object({
    nom: z.string().trim().min(2).max(25),
    cognoms: z.string().trim().min(2).max(200),
    dni: z
      .string()
      .trim()
      .max(9)
      .toUpperCase()
      .refine((v) => validarDNI(v), "DNI incorrecte"),
    email: z.string().email("Email incorrecte"),
    quotaSoci: z.object({
      quantitat: z.coerce.number().min(5),
      iban: z
        .string()
        .length(24)
        .refine((v) => validarIBAN(v), "IBAN incorrecte"),
      quotaId: z.coerce.number(),
    }),
  });
  
 export const sociComissioBodySchema = z.object({
    comissioId: z.array(z.coerce.number()),
    sociId: z.coerce.number(),
  });
  