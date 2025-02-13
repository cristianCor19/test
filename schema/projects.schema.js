import { z } from "zod";

export const searchProjectsSchema = z.object({
  value: z
    .string()
    .min(3, {
      message: "El término de búsqueda no puede estar vacío"
    }).regex(/^[a-zA-Z0-9\s]+$/, {
      message: "El término solo puede contener letras, números y espacios"
    }),
  page: z
    .string()
    .transform((val) => Number(val)) 
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: "El número de página debe ser un número entero positivo",
    }),

  limit: z
    .string()
    .transform((val) => Number(val)) 
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: "El límite debe ser un número entero positivo",
    }),
})