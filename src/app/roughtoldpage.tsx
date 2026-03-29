"use client";
import React, { useEffect, useState } from "react";
import { Search, Package, AlertTriangle, CheckCircle } from "lucide-react";
import api from "../services/api";
import { useDebounce } from "../hooks/useDebounce";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "primereact/button";
import AddProductModal from "../components/AddProductModal";
import "./globals.css";
import { ProductFormData } from "../validations/productSchema";

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
};

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 500);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // useeffect for fatching the data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await api.get("/products");
        setProducts(response.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        toast.error(err.message || "Opps! Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((item) => {
    // 1. Check Search Match
    const matchesSearch = item.name
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    // 2. Check Category Match (Agar "" hai to All Products pass kar do, warna check karo)
    const matchesCategory =
      selectedCategory === "" ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();

    // 3. Dono TRUE hone chahiye!
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = (formData: ProductFormData) => {
    // 🆔 Ek temporary unique ID banate hain (abhi ke liye timestamp use kar lete hain)
    const newProductWithId: Product = {
      id: Date.now(), // 👈 Ye har baar ek unique number dega!
      ...formData, // 👈 Name, Price, Category, Stock apne aap yahan copy ho jayenge!
    };
    setProducts((prevProducts) => [newProductWithId, ...prevProducts]);
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts((prevProducts) =>
      prevProducts.filter((item) => item.id !== productId),
    );

    toast.success("Product deleted successfully!"); // 🍞 Pyara sa notification!
  };
  const handleEditProduct = (updatedData: ProductFormData) => {
    if (!editingProduct) return;

    setProducts((prevProducts) =>
      prevProducts.map(
        (item) =>
          item.id === editingProduct.id
            ? { ...item, ...updatedData } // 🔄 ID match hui toh purana data naye se replace kar do!
            : item, // ⬅️ Baaki products ko waisa hi rehne do!
      ),
    );

    toast.success("Product updated successfully!");
    setEditingProduct(null); // 🧹 Edit state ko wapas khali kar do!
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Inventory Management
          </h1>
          <p className="text-slate-500 text-sm">
            Track and manage your products real-time
          </p>
        </div>
        <div>
          {/* 🟢 Button Jo modal ko kholega */}
          <Button
            label="Add Product"
            icon="pi pi-plus"
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white  rounded-lg flex items-center gap-2 transition-all"
          />

          {/* 🔴 Modal Ko props pass karte hue */}
          <AddProductModal
            visible={isModalOpen}
            onHide={() => {
              setIsModalOpen(false);
              setEditingProduct(null);
            }}
            onProductAdd={handleAddProduct}
            onProductUpdate={handleEditProduct}
            editingProduct={editingProduct} // 👈 Humne pura data modal ko bhej diya!
          />
        </div>
      </div>

      {/* Stats Cards (Theory: Visualizing Data) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Total Products</p>
            <p className="text-xl font-bold">120</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Low Stock</p>
            <p className="text-xl font-bold text-orange-600">5 Items</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-lg text-green-600">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">In Stock</p>
            <p className="text-xl font-bold text-green-600">115</p>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 -transform -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-all text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="beauty">Accessories</option>
            <option value="groceries">Groceries</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase">
                Product Name
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase">
                Category
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase">
                Price
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase">
                Stock
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-slate-500">
                  Loading products...
                </td>
              </tr>
            ) : (
              filteredProducts.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {item.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600 font-medium">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-blue-600">
                    ₹{item.price}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${item.stock > 10 ? "bg-green-500" : "bg-red-500"}`}
                      ></div>
                      <span className="text-slate-700">{item.stock}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="text-red-500 hover:text-red-600 font-medium text-sm mr-4 cursor-pointer"
                      onClick={() => handleDeleteProduct(item.id)}
                    >
                      <i className="pi pi-trash"></i>
                    </button>
                    <button
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm cursor-pointer"
                      onClick={() => {
                        setEditingProduct(item);
                        setIsModalOpen(true);
                      }}
                    >
                      <i className="pi pi-pencil"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Toaster position="top-right" />
      </div>
    </div>
  );
}
