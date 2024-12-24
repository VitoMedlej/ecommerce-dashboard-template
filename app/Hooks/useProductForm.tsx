"use client";
import { ProductData } from "@/components/Modals/AddProductModal/AddProductModal";
import { useState, useEffect } from "react";

export const useProductForm = (initialProductData: ProductData, isEditMode ?: boolean) => {
  const [productData, setProductData] = useState<ProductData>(initialProductData);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  useEffect(() => {
    if (isEditMode && Array.isArray(productData.images) && productData.images.length > 0) {
      setUploadedImages(productData.images || []);
    }
  }, [isEditMode, productData.images]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setProductData(prev => ({
      ...prev,
      [name]: type === "number" && value === "" ? "" : value,
    }));
  };
  const resetForm = () => {
    setProductData(initialProductData); // Reset product data to initial values
    setUploadedImages([]); // Clear uploaded images
  };
  return { productData, setProductData, uploadedImages, setUploadedImages, handleChange, resetForm };
};
