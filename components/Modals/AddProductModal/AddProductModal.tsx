"use client";

import CategorySelector from "@/components/CategorySelector/CategorySelector";
import ImageUploader from "@/components/Cloudinary/ImageUploader";
import * as Dialog from "@radix-ui/react-dialog";
import * as Form from "@radix-ui/react-form";
import { useAddProductModalContext, useCurrentProductContext } from "app/context/ContextProvider";
import { inputs, useProductForm } from "app/Hooks/useProductForm";
import { useProductVariants, Variant } from "app/Hooks/useProductVariants";
import { useEffect } from "react";
import { addProduct } from "utils/productApi";
import { Categories } from "utils/SanityFunctions";
import Variants from "../Variants";


export const defaultValues = {
  title: "",
  description: "",
  price: "",
  newPrice: "",
  stock: "",
  tags: "",
  category: "",
  trackStock : true,
  subcategory: "",
  images: [],
  variants: [],
}

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
    handleBooleanChange
    
  } = useProductForm(defaultValues);

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
  const saveDisabled = !productData.title || !productData.price || !productData.category 
  return (
    <Dialog.Root open={ProductModalOpen} onOpenChange={SetProductModalOpen}>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
      <Dialog.Content className=" bg-grayish overflow-y-auto max-w-[95vw] max-h-[90vh] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg w-full z-50">
        <Dialog.Title className="sr-only">Add a New Product</Dialog.Title>
        <h1 className="text-2xl mb-4 font-600 pb-4">Add a New Product</h1>
    
        <Form.Root
          className="space-y-4 max-w-lg auto"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
      { inputs.map((input) => {

  if (input.type === 'boolean') {
    return (
          <div className="flex items-center space-x-4">
            <label>
              <input
                type="radio"
                name={input.name}
                value="true"
                checked={(Boolean(productData[input.name])) === true}
                onChange={handleBooleanChange}
                className="mr-2"
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name={input.name}
                value="false"
                checked={Boolean(productData[input.name]) === false}
                onChange={handleBooleanChange}
                className="mr-2"
              />
              No
            </label>
          </div>
      
    );
  }
  if (input.name==='stock' && !productData.trackStock ) return;
  return (
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
  );
})}

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
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Cancel
            </button>
            <Form.Submit  asChild>
            <button disabled={saveDisabled} className={`px-4 py-2 rounded ${saveDisabled ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-green-600 text-white'}`}>Save</button>
            </Form.Submit>
          </div>
        </Form.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddProductModal;
