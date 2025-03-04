import { z } from "zod";
import { convertNumberToDecimal } from "./utils";

export const productSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  slug: z.string().min(3, "slug deve ter no mínimo 3 caracteres"),
  category: z.string().min(3, "categoria deve ter no mínimo 3 caracteres"),
  description: z.string().min(3, "Descrição deve ter no mínimo 3 caracteres"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "Produto devem ter no mínimo 1 imagem"),
  isFeatured: z.boolean(),
  banner: z.string().optional(),
  brand: z.string().min(3, "Marca deve ter no mínimo 3 caracteres"),
  price: z
    .string()
    .refine(
      (val) => /^\d+(\.\d{2})?/.test(convertNumberToDecimal(Number(val))),
      { message: "Preço deve conter duas casas decimais" }
    ),
});

export const SignInFormSchema = z.object({
  email: z
    .string({
      message: "Email inválido",
    })
    .email("Email inválido"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

export const SignUpFormSchema = z
  .object({
    nome: z
      .string({
        message: "Nome é obrigatório",
      })
      .min(3, "Nome deve ter no mínimo 3 caracteres"),
    email: z
      .string({
        message: "Email inválido",
      })
      .email("Email inválido"),
    password: z
      .string({
        message: "Senha deve ter no mínimo 8 caracteres",
      })
      .min(8, "Senha deve ter no mínimo 8 caracteres"),
    confirmPassword: z
      .string({})
      .min(8, "Confirmação de senha deve ter no mínimo 8 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirmação de senha não confere com a senha",
    path: ["confirmPassword"],
  });
