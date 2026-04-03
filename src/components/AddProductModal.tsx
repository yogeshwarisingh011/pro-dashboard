import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
//for RHF Setup error/form handling
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormData } from "../validations/productSchema";
import { Product } from "../app/inventory/page";

interface AddProductModalProps {
  visible: boolean;
  onHide: () => void;
  onProductAdd: (data: ProductFormData) => void;
  onProductUpdate: (data: ProductFormData) => void; // 👈 Add this!
  editingProduct: Product | null;
}

const categories = [
  { label: "Furniture", value: "furniture" },
  { label: "Grocery", value: "grocery" },
  { label: "Electronics", value: "electronics" },
];

export default function AddProductModal({
  visible,
  onHide,
  onProductAdd,
  onProductUpdate,
  editingProduct,
}: AddProductModalProps) {
  // 🎯 RHF Hook Setup
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue, // 👈 Ye PrimeReact components ke liye kaam aayega!
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema), // 🤝 Zod rules ko RHF se jod diya!
    defaultValues: {
      name: "",
      price: 0,
      category: "",
      stock: 0,
    },
  });
  useEffect(() => {
    if (editingProduct) {
      // 📝 Agar edit ho raha hai, toh form mein purana data reset karke bhar do!
      reset({
        name: editingProduct.name,
        category: editingProduct.category,
        price: editingProduct.price,
        stock: editingProduct.stock,
      });
    } else {
      // 📝 Agar add ho raha hai, toh khali values do!
      reset({
        name: "",
        category: "",
        price: 0,
        stock: 0,
      });
    }
  }, [editingProduct, reset]); // 👈 Jab bhi editingProduct badlega, ye useEffect chalega!

  const onSave = (data: ProductFormData) => {
    if (editingProduct) {
      onProductUpdate(data); // 🔥 Agar edit ho raha tha, toh update wala function chalao!
    } else {
      onProductAdd(data); // ➕ Agar naya tha, toh add wala function chalao!
    }

    reset();
    onHide();
  };

  return (
    <Dialog
      header="Add Product"
      visible={visible}
      style={{ width: "40vw" }}
      onHide={onHide}
      className="p-fluid"
    >
      <div className="flex flex-col gap-4 p-2">
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm text-gray-700">
            Product Name
          </label>
          <InputText
            {...register("name")} // 👈 Standard Input ko register kar diya!
            placeholder="Ex: Sofa"
            invalid={!!errors.name}
          />
          {errors.name && (
            <small className="text-red-500 text-xs">
              {errors.name?.message}
            </small>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm text-gray-700">
            Category
          </label>
          <Dropdown
            value={watch("category")} // 👈 RHF se current value ko 'watch' (dekhne) ke liye
            options={categories}
            onChange={(e) =>
              setValue("category", e.value, { shouldValidate: true })
            } // 👈 Chupke se value set kar di aur validate bhi kar liya!
            placeholder="Select Category"
            className={errors.category ? "p-invalid" : ""}
          />
          {errors.category && (
            <small className="text-red-500 text-xs">
              {errors.category?.message}
            </small>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm text-gray-700">Price</label>
          <InputNumber
            value={watch("price")}
            mode="currency"
            currency="INR"
            locale="en-IN"
            onValueChange={(e) =>
              setValue("price", e.value || 0, { shouldValidate: true })
            }
            className={errors.price ? "p-invalid" : ""}
          />
          {errors.price && (
            <small className="text-red-500 text-xs">
              {errors.price?.message}
            </small>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm text-gray-700">Stock</label>
          <InputNumber
            value={watch("stock")}
            onValueChange={(e) =>
              setValue("stock", e.value || 0, { shouldValidate: true })
            }
            placeholder="Enter quantity"
            className={errors.stock ? "p-invalid" : ""}
          />
          {errors.stock && (
            <small className="text-red-500 text-xs">
              {errors.stock?.message}
            </small>
          )}
        </div>

        <div className="flex  gap-2 mt-4">
          <Button
            className="px-4 py-2 border rounded-lg text-gray-600 cursor-pointer justify-center cancle-btn"
            onClick={onHide}
          >
            Cancel
          </Button>
          <Button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold cursor-pointer justify-center save-btn"
            onClick={handleSubmit(onSave)}
          >
            Save Product
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
