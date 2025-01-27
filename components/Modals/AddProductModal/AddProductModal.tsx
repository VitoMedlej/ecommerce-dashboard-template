"use client";

import CategorySelector from "@/components/CategorySelector/CategorySelector";
import ImageUploader from "@/components/Cloudinary/ImageUploader";
import * as Dialog from "@radix-ui/react-dialog";
import * as Form from "@radix-ui/react-form";
import { useAddProductModalContext, useCurrentProductContext } from "app/context/ContextProvider";
import { useProductForm } from "app/Hooks/useProductForm";
import { useProductVariants, Variant } from "app/Hooks/useProductVariants";
import { useEffect } from "react";
import { addProduct } from "utils/productApi";
import { Categories } from "utils/SanityFunctions";
import Variants from "../Variants";

const AddProductModal = ({ categories }: { categories: Categories }) => {
  const {
    productData,
    handleChange,
    uploadedImages,
    setUploadedImages,
    resetForm,
    restoreStashedChanges,
    clearStashedChanges,
    setProductData,
  } = useProductForm({
    title: "",
    description: "",
    price: "",
    stock: "",
    tags: "",
    category: "",
    subcategory: "",
    images: [],
    variants: [],
  });

  const { ProductModalOpen, SetProductModalOpen } = useAddProductModalContext();
  const { setCurrentProduct } = useCurrentProductContext();

  const  { variants, addVariant, updateVariant, deleteVariant, resetVariants }  = useProductVariants();

  useEffect(() => {
    if (ProductModalOpen) {
      restoreStashedChanges();
    }
  }, [ProductModalOpen, restoreStashedChanges]);

  const handleSave = async () => {
    try {
      const FinalProduct = { ...productData, images: uploadedImages, variants };
      const result = await addProduct(FinalProduct);
      if (result.success) {
        const { _id, ...rest } = result.responseObject as any;
        setCurrentProduct({ product: { ...rest, id: _id?.toString() }, isNew: true });
        resetForm();
        SetProductModalOpen(false);
      } else {
        throw result?.error;
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error);
    }
  };

  return (
    <Dialog.Root open={ProductModalOpen} onOpenChange={SetProductModalOpen}>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
      <Dialog.Content className="overflow-y-auto max-w-[95vw] max-h-[90vh] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg w-full max-w-lg z-50">
        <Dialog.Title className="sr-only">Add a New Product</Dialog.Title>
        <h1 className="text-lg font-bold pb-4">Add a New Product</h1>
        <Form.Root
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          {[
            { name: "title", type: "text", label: "Product title" },
            { name: "description", type: "textarea", label: "Product Description" },
            { name: "price", type: "number", label: "Product Price" },
            { name: "stock", type: "number", label: "Stock Quantity" },
            { name: "tags", type: "text", label: `Tags (Separate by ",")` },
          ].map((input) => (
            <Form.Field key={input.name} name={input.name}>
              <Form.Label className="block text-sm pb-1 font-medium">{input.label}</Form.Label>
              <Form.Control asChild>
                {input.type === "textarea" ? (
                  <textarea
                    name={input.name}
                    value={productData[input.name] as string}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <input
                    type={input.type}
                    name={input.name}
                    value={productData[input.name] as string}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                )}
              </Form.Control>
            </Form.Field>
          ))}

          <CategorySelector handleChange={handleChange} productData={productData} categories={categories} />


        
          { <Variants deleteVariant={deleteVariant} updateVariant={updateVariant} resetVariants={resetVariants} variants={variants} addVariant={addVariant}  />}

          <ImageUploader uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} />



          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={() => {
                clearStashedChanges();
                SetProductModalOpen(false);
              }}
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
