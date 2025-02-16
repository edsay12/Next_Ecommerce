import { z } from "zod";
import { convertNumberToDecimal } from "./utils";

export const productSchema = z.object({
  name: z.string().min(3,"Nome deve ter no mínimo 3 caracteres"),
  slug: z.string().min(3,"slug deve ter no mínimo 3 caracteres"),
  category: z.string().min(3,"categoria deve ter no mínimo 3 caracteres"),
  description: z.string().min(3,"Descrição deve ter no mínimo 3 caracteres"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1,"Produto devem ter no mínimo 1 imagem"),
  isFeatured: z.boolean(),
  banner: z.string().optional(),
  price:z.string().refine((val)=>  /^\d+(\.\d{2})?/.test(convertNumberToDecimal(Number(val))),{message:"Preço deve conter duas casas decimais"}),
});