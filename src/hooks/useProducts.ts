// src/hooks/useProducts.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

import { ProductFormData } from "../validations/productSchema";
import toast from "react-hot-toast";
import { Product } from "../app/inventory/page";

// --- API Functions (Private to this file) ---
const fetchProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};

const deleteProduct = async (id: number) => {
  await api.delete(`/products/${id}`);
};

const addProduct = async (newData: ProductFormData) => {
  const { data } = await api.post("/products", newData);
  return data;
};

// --- The Custom Hook (Public) ---
export const useProducts = () => {
  const queryClient = useQueryClient();

  // 1. Fetching Logic
  const productsQuery = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // 2. Delete Logic
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted!");
    },
  });

  // 3. Add Logic
  const addMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product added!");
    },
  });

  // Sab kuch return kar do jo UI ko chahiye
  return {
    products: productsQuery.data ?? [],
    isLoading: productsQuery.isLoading,
    isError: productsQuery.isError,
    deleteProduct: deleteMutation.mutate,
    addProduct: addMutation.mutate,
    isAdding: addMutation.isPending, // Add button loading state ke liye
  };
};
