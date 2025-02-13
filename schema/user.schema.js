import { z } from "zod";

export const registerUserSchema = z.object({
  name: z
    .string({
      required_error: "El nombre es obligatorio"
    }).min(3, {
      message: "El nombre debe tener al menos 3 caracteres"
    }).regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
      message: "El nombre solo puede contener letras y espacios",
    }),
  email: z
    .string({ 
      required_error: "El email es obligatorio" 
    }).email({ 
      message: "El email debe ser válido" 
    }),

  password: z
    .string({ 
      required_error: "La contraseña es obligatoria" 
    }).min(8, { 
      message: "La contraseña debe tener mínimo 8 caracteres" 
    }).regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      {
        message:
          "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial",
      }
    ),
});
