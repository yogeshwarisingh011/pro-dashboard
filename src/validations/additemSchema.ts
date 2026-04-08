import z from "zod";

// 📝 Product validation rules (Centralized)
export const additemSchema = z.object({
  title: z.string().min(1, "Product Name is required"), // 👈 Pehla Rule: Agar poora khali hai
  description: z
    .string()
    .min(1, "Please write a description at least 50-60 charater."),
  category: z.string().min(1, "Please select a category"),
  price: z.number().min(1, "Price must be greater than zero"),
  rating: z.number().min(0, "Rating cannot be negative"),
});

export type AddItemFormData = z.infer<typeof additemSchema>;
