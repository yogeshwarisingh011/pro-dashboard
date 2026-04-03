import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useState } from "react";

interface Category {
  name: string;
  code: string;
}

interface AddItemPopupProps {
  visible: boolean;
  onHide: () => void;
}

const AddItemsPopup = ({ visible, onHide }: AddItemPopupProps) => {
  const [value, setValue] = useState<string>("");

  const [category, setCategory] = useState<Category | null>(null);
  const categories: Category[] = [
    { name: "Beauty", code: "NY" },
    { name: "Furniture", code: "RM" },
    { name: "Groceries", code: "LDN" },
  ];

  if (!visible) return null;

  return (
    <Dialog
      header="Add New Item"
      visible={visible}
      style={{ width: "40vw" }}
      onHide={onHide}
      className="p-fluid"
    >
      <form className="space-y-4">
        {/* Image Upload Placeholder */}
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
          <InputText placeholder="e.g. Apple iPhone 15" />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Description
          </label>
          <InputTextarea
            value={value}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setValue(e.target.value)
            }
            rows={5}
            cols={30}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Price ($)
            </label>
            <InputNumber
              mode="currency"
              currency="INR"
              locale="en-IN"
              placeholder="0.00"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Rating (1-5)
            </label>
            <InputNumber placeholder="4.5" />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Category
          </label>
          <Dropdown
            value={category}
            onChange={(e: DropdownChangeEvent) => setCategory(e.value)}
            options={categories}
            optionLabel="name"
            placeholder="Select a City"
            className="w-full md:w-14rem"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2.5 pt-4">
          <Button type="button" onClick={onHide} className="secondary-btn">
            Cancel
          </Button>
          <Button type="submit" className="primary-btn">
            Add Product
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default AddItemsPopup;
