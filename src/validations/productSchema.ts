import { z } from "zod";

// 📝 Product validation rules (Centralized)
export const productSchema = z.object({
  name: z
    .string()
    .min(1, "Product Name is required") // 👈 Pehla Rule: Agar poora khali hai
    .min(3, "Product Name must be at least 3 characters long"), // 👈 Doosra Rule: Agar letters 3 se kam hain!,
  category: z.string().min(1, "Please select a category"),
  price: z.number().min(1, "Price must be greater than zero"),
  stock: z.number().min(0, "Stock cannot be negative"),
});

// 🔍 TypeScript Type export kar rahe hain hume do bar type define krne ki need nhi hai eski help se
export type ProductFormData = z.infer<typeof productSchema>;
