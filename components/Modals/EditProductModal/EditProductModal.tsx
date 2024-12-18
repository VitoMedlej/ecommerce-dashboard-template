'use client';

import * as Dialog from "@radix-ui/react-dialog";
import * as Form from "@radix-ui/react-form";
import { useState } from "react";
import { useProductEditModalContext } from "app/context/ContextProvider";
// import { IProduct } from "@/lib/db";
import { initialProductData, inputs, ProductData } from "../AddProductModal/AddProductModal";
import { editProduct } from "utils/productApi";
import { Categories } from "utils/SanityFunctions";

const ProductEditModal = ({ data , categories }: { data: ProductData, categories : Categories }) => {
  console.log('data: ', data);
  const { isProductEditModalOpen, setIsProductEditModalOpen } = useProductEditModalContext();
  const [productData, setProductData] = useState<ProductData>(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const result = await editProduct(`${data._id}`, productData);

      if (!result.success) {
        throw new Error(result.error || "Failed to update product.");
      }

      setIsProductEditModalOpen(false);
    } catch (error) {
      alert(`${error}`);
    }
  };
  if (!data) return <></>
  return (
    <Dialog.Root open={isProductEditModalOpen} onOpenChange={setIsProductEditModalOpen}>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
      <Dialog.Content className="overflow-y-auto max-h-[90vh] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg w-full max-w-lg z-50">
        <Dialog.Title className="sr-only">Edit Product</Dialog.Title>
        <h1 className="text-lg font-bold pb-4">Edit Product</h1>
        <Form.Root
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          {inputs && inputs.map((input) => (
            <Form.Field key={input.name} name={input.name}>
              <Form.Label className="block text-sm pb-1 font-medium">{input.label}</Form.Label>
              <Form.Control asChild>
                {input.type === "textarea" ? (
                  <textarea
                    name={input.name}
                    value={productData[input.name as keyof ProductData]}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <input
                    type={input.type}
                    name={input.name}
                    value={productData[input.name as keyof ProductData]}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                )}
              </Form.Control>
            </Form.Field>
          ))}
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={() => setIsProductEditModalOpen(false)}
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

export default ProductEditModal;
