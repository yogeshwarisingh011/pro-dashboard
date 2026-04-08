import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { AddItemFormData, additemSchema } from "../validations/additemSchema";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addProduct } from "../redux/productSlice";

interface Category {
  name: string;
  code: string;
}

interface AddItemPopupProps {
  visible: boolean;
  onHide: () => void;
}

const AddItemsPopup = ({ visible, onHide }: AddItemPopupProps) => {
  // 🎯 RHF Hook Setup
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddItemFormData>({
    resolver: zodResolver(additemSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      price: 0,
      rating: 0,
    },
  });
  const dispatch = useDispatch<AppDispatch>();

  const categories: Category[] = [
    { name: "Beauty", code: "NY" },
    { name: "Furniture", code: "RM" },
    { name: "Groceries", code: "LDN" },
  ];

  // Form Submit Hone par kya hoga
  // const onSubmit = (data: AddItemFormData) => {
  //   console.log("Form Submitted Successfully:", data);
  //   // Yahan hum apna API call (dispatch) karenge
  //   reset(); // Form khali karne ke liye
  //   onHide(); // Modal band karne ke liye
  // };
  const onSubmit = (data: AddItemFormData) => {
    // Hum dummy data ke liye ek fake ID aur image add kar dete hain
    const finalData = {
      ...data,
      id: crypto.randomUUID(), // Temporary ID
      thumbnail: "https://picsum.photos/200", // Fake Image
    };

    dispatch(addProduct(finalData)); // 🚀 Redux ko bheja!
    console.log("Form Submitted Successfully:", finalData);
    reset();
    onHide();
  };
  if (!visible) return null;

  return (
    <Dialog
      header="Add New Item"
      visible={visible}
      style={{ width: "40vw" }}
      onHide={onHide}
      className="p-fluid"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Image Upload Placeholder (Keeping it as you requested) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Product Image
          </label>
          <InputText
            type="file"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Product Name
          </label>
          <InputText
            {...register("title")}
            placeholder="e.g. Apple iPhone 15"
            className={errors.title ? "p-invalid" : ""}
          />
          {errors.title && (
            <small className="p-error">{errors.title.message}</small>
          )}
        </div>

        {/* Description - Controller added */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Description
          </label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <InputTextarea
                {...field}
                rows={5}
                className={errors.description ? "p-invalid" : ""}
                placeholder="Tell us about the product..."
              />
            )}
          />
          {errors.description && (
            <small className="p-error">{errors.description.message}</small>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Price - Controller added */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Price ($)
            </label>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <InputNumber
                  value={field.value}
                  onValueChange={(e) => field.onChange(e.value)}
                  mode="currency"
                  currency="INR"
                  locale="en-IN"
                  placeholder="0.00"
                  className={errors.price ? "p-invalid" : ""}
                />
              )}
            />
            {errors.price && (
              <small className="p-error">{errors.price.message}</small>
            )}
          </div>

          {/* Rating - Controller added */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Rating (1-5)
            </label>
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <InputNumber
                  value={field.value}
                  onValueChange={(e) => field.onChange(e.value)}
                  placeholder="4.5"
                  min={0}
                  max={5}
                  step={0.1}
                  className={errors.rating ? "p-invalid" : ""}
                />
              )}
            />
            {errors.rating && (
              <small className="p-error">{errors.rating.message}</small>
            )}
          </div>
        </div>

        {/* Category - Controller added */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Category
          </label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Dropdown
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                options={categories}
                optionLabel="name"
                optionValue="name"
                placeholder="Select a Category"
                className={errors.category ? "p-invalid w-full" : "w-full"}
              />
            )}
          />
          {errors.category && (
            <small className="p-error">{errors.category.message}</small>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2.5 pt-4">
          <Button
            type="button"
            label="Cancel"
            onClick={onHide}
            className="p-button-secondary p-button-text"
          />
          <Button
            type="submit"
            label="Add Product"
            className="p-button-primary"
          />
        </div>
      </form>
    </Dialog>
  );
};

export default AddItemsPopup;
