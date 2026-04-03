"use client";
import React, { useEffect, useState } from "react";
import { Star, ShoppingCart } from "lucide-react"; // Icons ke liye
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import { fetchProducts } from "@/src/redux/productSlice";
import AddItemsPopup from "@/src/components/AddItemsPopup";

// 1. Dummy Data (Asli API se pehle)
// const dummyProducts = [
//   {
//     id: 1,
//     title: "iPhone 15 Pro",
//     category: "Smartphones",
//     price: 999,
//     rating: 4.8,
//     description: "Apple's latest flagship with Titanium design.",
//     thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
//   },
//   {
//     id: 2,
//     title: "MacBook Pro M3",
//     category: "Laptops",
//     price: 1999,
//     rating: 4.9,
//     description: "Powerful performance for pros.",
//     thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
//   },
//   {
//     id: 3,
//     title: "Samsung Galaxy S24 Ultra",
//     category: "Smartphones",
//     price: 1199,
//     rating: 4.7,
//     description: "AI-powered smartphone with S Pen.",
//     thumbnail: "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg",
//   },
//   {
//     id: 4,
//     title: "Apple Watch Series 9",
//     category: "Watches",
//     price: 399,
//     rating: 4.6,
//     description: "Advanced health features and faster chip.",
//     thumbnail: "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
//   },
// ];
interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string; // 👈 Ye add kiya
  description: string; // 👈 Ye add kiya
  rating: number; // 👈 Ye add kiya
}

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Store se data nikaalna (Selectors)
  const { items, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  // 2. Page load hote hi API call trigger karna
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // 3. Loading State handle karna
  if (loading)
    return <div className="p-10 text-center">Loading Products... 🚀</div>;

  // 4. Error State handle karna
  if (error)
    return <div className="p-10 text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6 md:p-8 bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">
            ProDash Inventory
          </h1>
          <p className="text-slate-600 mt-1">
            Browse and manage your product catalogue.
          </p>
        </div>
        <AddItemsPopup
          visible={isModalOpen}
          onHide={() => {
            setIsModalOpen(false);
          }}
        />
        <button
          className="bg-blue-600 text-white px-5 py-2.5 rounded-full font-semibold flex items-center gap-2 hover:bg-blue-700 transition-all text-sm shadow-sm"
          onClick={() => setIsModalOpen(true)}
        >
          <ShoppingCart size={18} /> Add New Product
        </button>
      </div>

      {/* 2. Grid Container (For Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {(items as Product[]).map((product: Product) => (
          // 3. The Product Card
          <div
            key={product.id}
            className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col group overflow-hidden"
          >
            {/* Image Container */}
            <div className="aspect-4/3 rounded-2xl bg-slate-100 mb-5 overflow-hidden border border-slate-50">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 flex flex-col">
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit mb-3">
                {product.category}
              </span>
              <h3 className="text-xl font-bold text-slate-950 leading-snug mb-2 line-clamp-1">
                {product.title}
              </h3>
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>

              {/* Price & Rating */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                <span className="text-2xl font-extrabold text-slate-950">
                  ${product.price}
                </span>
                <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1.5 rounded-xl border border-amber-100">
                  <Star size={16} className="text-amber-500 fill-amber-400" />
                  <span className="font-bold text-amber-700 text-sm">
                    {product.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
