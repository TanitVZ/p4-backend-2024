import { z } from "zod";
import { validarDNI, validarIBAN } from "./validateCustom";

export const idParamSchema = z.object({
    id: z.coerce.number(),
  });
  
  const nomValid =  z.string().trim().min(2).max(25)
  const cognomsValid = z.string().trim().min(2).max(200)
  const dniValid = z
  .string()
  .trim()
  .max(9)
  .toUpperCase()
  .refine((v) => validarDNI(v), "DNI incorrecte")
  const  emailValid = z.string().email("Email incorrecte")
  const ibanValid =  z
  .string()
  .length(24)
  .refine((v) => validarIBAN(v), "IBAN incorrecte")

  export const sociBodyUpdateSchema= z.object({
    nom: nomValid.optional(),
    cognoms: cognomsValid.optional(),
    dni: dniValid.optional(),
    email: emailValid.optional(),
  });
  

 

  export type SociBodyUpdate = z.infer<typeof sociBodyUpdateSchema>;

 export const sociQuotaBodySchema = z.object({
  nom: nomValid,
  cognoms: cognomsValid,
  dni:dniValid,
  email: emailValid,
    quotaSoci: z.object({
      quantitat: z.coerce.number().min(5),
      iban:ibanValid,
      quotaId: z.coerce.number(),
    }),
  });
  
 export const sociComissioBodySchema = z.object({
    comissioId: z.array(z.coerce.number()),
    sociId: z.coerce.number(),
  });
  