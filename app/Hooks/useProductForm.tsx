import  ProductData, { defaultValues }  from "@/components/Modals/AddProductModal/AddProductModal";
import { useState, useEffect } from "react";
import { Variant } from "./useProductVariants";


export const inputs = [
  { name: "title", type: "text", label: "Product title" },
  { name: "description", type: "textarea", label: "Product Description" },
  { name: "price", type: "number", label: "Product Price" },
  { name: "newPrice", type: "number", label: "New Price Offer"  },
  { name: "trackStock", type: "boolean", label: "Track Stock" },
  { name: "stock", type: "number", label: "Stock Quantity" },
  { name: "tags", type: "text", label: `Tags (Separate by ",")` },
]

export type ProductData = {
  [key in typeof inputs[number]["name"] | "category" | "subcategory" | "images" | "variants" | "_id"]: string | number | string[] | Variant[] | boolean;
};


export const useProductForm = (initialProductData: ProductData, isEditMode?: boolean) => {
  const [productData, setProductData] = useState<ProductData>(initialProductData);
  console.log('productData: ', productData);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  useEffect(() => {
    if (isEditMode && Array.isArray(productData.images) && productData.images.length > 0) {
      setUploadedImages(productData.images as string[] || []);
    }
  }, [isEditMode, productData.images]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  
    // Check if price or newPrice is being updated
    if (name === "price" || name === "newPrice" || name === "stock") {
      // Remove anything that's not a digit, then strip leading zeros
      const sanitizedValue = value.replace(/\D/g, "").replace(/^0+/, "");
  
      // Ensure it's within range
      if (sanitizedValue && (Number(sanitizedValue) < 0 || Number(sanitizedValue) > 10000)) {
        return;
      }
  
      setProductData(prev => ({
        ...prev,
        [name]: sanitizedValue,
      }));
  
      return;
    }
    else {
      setProductData(prev => ({
        ...prev,
        [name]: type === "number" && value === "" ? "" : value,
      }));
    }
  };

  const handleBooleanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    console.log('value: ', value);
    setProductData(prev => ({
      ...prev,
      [name]:  value === "true",
    }));

  }

  const resetForm = () => {
    setProductData(initialProductData); // Reset product data to initial values
    setUploadedImages([]); // Clear uploaded images
  };

  // Stash current data to localStorage
  const stashChanges = () => {
    const draft = { productData };
    localStorage.setItem("draftProduct", JSON.stringify(draft));
  };

  // Clear stashed data from localStorage
  const clearStashedChanges = () => {
    localStorage.removeItem("draftProduct");
    setProductData(defaultValues);
  };

  // Restore stashed data from localStorage
  const restoreStashedChanges = () => {
    const stashed = JSON.parse(localStorage.getItem("draftProduct") || "{}");
    if (stashed?.productData) {
      setProductData(stashed.productData);
    }
  };

  return { 
    productData, 
    setProductData, 
    uploadedImages, 
    setUploadedImages, 
    handleChange, 
    resetForm, 
    stashChanges, 
    clearStashedChanges, 
    restoreStashedChanges,
    handleBooleanChange
  };
};