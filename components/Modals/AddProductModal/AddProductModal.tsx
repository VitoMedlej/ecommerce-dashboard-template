"use client";

import ImageUploader from "@/components/Cloudinary/ImageUploader";
import * as Dialog from "@radix-ui/react-dialog";
import * as Form from "@radix-ui/react-form";
import { useAddProductModalContext, useNewProductContext } from "app/context/ContextProvider";
import { useProductForm } from "app/Hooks/useProductForm";
import { useState } from "react";
import { addProduct } from "utils/productApi";

export const inputs = [
  { name: "title", type: "text", label: "Product title" },
  { name: "description", type: "textarea", label: "Product Description" },
  { name: "price", type: "number", label: "Product Price" },
  { name: "stock", type: "number", label: "Stock Quantity" },
  { name: "tags", type: "text", label: `Tags (Separate by ",")` },
];

export type ProductData = {
  [key in typeof inputs[number]["name"] | "category" | "subcategory" | 'images' | '_id' ]: string | number | string[];
};

export type Category = {
  title: string;
  subcategories: string[];
};

export const initialProductData: ProductData = inputs.reduce((acc, input) => {
  acc[input.name] = input.type === "number" ? "" : "";
  return acc;
}, { category: "", subcategory: "", images:[] } as ProductData);

const AddProductModal = ({ categories }: { categories: Category[] }) => {
  const { productData, handleChange, uploadedImages, setUploadedImages, setProductData } = useProductForm(initialProductData);
  const { ProductModalOpen, SetProductModalOpen } = useAddProductModalContext();
  const { setNewProduct } = useNewProductContext();

  const handleSave = async () => {
    try {
      const FinalProduct = {...productData, images:uploadedImages}
      const result = await addProduct(FinalProduct);
      console.log('result: ', result);
      if (result.success) {
        setNewProduct(result.responseObject);
        SetProductModalOpen(false);
      } else {
        throw result?.error;
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Dialog.Root open={ProductModalOpen} onOpenChange={SetProductModalOpen}>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
      <Dialog.Content className="overflow-y-auto max-h-[90vh] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg w-full max-w-lg z-50">
        <Dialog.Title className="sr-only">Add a New Product</Dialog.Title>
        <h1 className="text-lg font-bold pb-4">Add a New Product</h1>
        <Form.Root
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          {inputs.map((input) => (
            <Form.Field key={input.name} name={input.name}>
              <Form.Label className="block text-sm pb-1 font-medium">{input.label}</Form.Label>
              <Form.Control asChild>
                {input.type === "textarea" ? (
                  <textarea
                    name={input.name}
                    value={productData[input.name as keyof typeof productData]}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <input
                    type={input.type}
                    name={input.name}
                    value={productData[input.name as keyof typeof productData]}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                )}
              </Form.Control>
            </Form.Field>
          ))}

          <Form.Field name="category">
            <Form.Label className="block text-sm pb-1 font-medium">Category</Form.Label>
            <select
              name="category"
              value={productData.category}
              onChange={(e) => {
                handleChange(e);
                setProductData((prev) => ({ ...prev, subcategory: "" }));
              }}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.title} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
          </Form.Field>

          {productData.category && (
            <Form.Field name="subcategory">
              <Form.Label className="block text-sm pb-1 font-medium">Subcategory</Form.Label>
              <select
                name="subcategory"
                value={productData.subcategory}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select a subcategory</option>
                {categories
                  .find((cat) => cat.title === productData.category)
                  ?.subcategories.map((subcategory) => (
                    <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
              </select>
            </Form.Field>
          )}

        <ImageUploader uploadedImages={uploadedImages} setUploadedImages={setUploadedImages}  />

          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={() => SetProductModalOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <Form.Submit asChild>
              <button className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
            </Form.Submit>
          </div>
        </Form.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddProductModal;
function useProduct(initialProductData: ProductData): { productData: any; handleChange: any; uploadedImages: any; setUploadedImages: any; } {
  throw new Error("Function not implemented.");
}

