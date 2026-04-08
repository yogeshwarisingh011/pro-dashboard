import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 1. Ek Product kaisa dikhta hai (Interface)
export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string; // Ye add kiya taaki UI mein error na aaye
  description: string; // Ye bhi add kiya
  rating: number; // Ye bhi add kiya
}

// 2. Slice ki State kaisi hogi
interface ProductState {
  items: Product[]; // Ab ye 'unknown' nahi, 'Product' ka array hai
  loading: boolean;
  error: string | null;
}

// 3. Initial State
const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
};

// 1. "fetchProducts" hamara thunk (delivery boy) hai.
// 2. Pehla argument "products/get" iska 'Type' hai (id card).
// 3. Dusra argument ek async function hai jo 'Side-effect' (API call) karega.
//4. "products/get" => [FeatureName]/[ActionName]

export const fetchProducts = createAsyncThunk("products/get", async () => {
  // Bahar ki duniya (API) se data mangwaya
  const response = await axios.get("https://dummyjson.com/products");
  // Sirf products wala array return kiya
  return response.data.products;
});

// 2. Delete Thunk (The Delivery Boy for Deleting)
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: number) => {
    // Real World: Server ko request bheji ki ye ID wala product hata do
    await axios.delete(`https://dummyjson.com/products/${id}`);

    // Server ne OK bola, toh hum wahi ID return kar dete hain
    return id;
  },
);
// 3. Add Product Thunk
export const addProduct = createAsyncThunk(
  "products/add",
  async (newProduct: unknown) => {
    // Fake API ko request bhej rahe hain
    const response = await axios.post(
      "https://dummyjson.com/products/add",
      newProduct,
    );

    // Server naya object return karega (with a new ID)
    return response.data;
  },
);
const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    // Yahan normal functions aate hain (jaise clearCart)
  },

  // 🎯 Aaj ka Hero: extraReducers
  extraReducers: (builder) => {
    builder
      // Case 1: Jab API call shuru hui
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Case 2: Jab data successfully aa gaya
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // API ka data yahan milta hai
      })
      // Case 3: Jab API fail ho gayi
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops! Something went wrong.";
      })

      // DELETE Cases
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true; // Delete hote waqt bhi loading dikha sakte hain
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        // 🔥 ASLI MAGIC: Filter method
        // Hum keh rahe hain: "Saare products rakho, bas wo wala hata do jiski ID match ho gayi"
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.loading = false;
        state.error = "Delete karne mein error aaya!";
      })

      // Add product Cases
      .addCase(addProduct.pending, (state) => {
        state.loading = true; // Delete hote waqt bhi loading dikha sakte hain
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        // 🔥 ASLI MAGIC: Filter method
        // Hum keh rahe hain: "Saare products rakho, bas wo wala hata do jiski ID match ho gayi"
        state.items = [action.payload, ...state.items];
      })
      .addCase(addProduct.rejected, (state) => {
        state.loading = false;
        state.error = "Add karne mein error aaya!";
      });
  },
});

export default productSlice.reducer;
