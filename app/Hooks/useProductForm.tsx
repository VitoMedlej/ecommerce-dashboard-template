"use client";
import { ProductData } from "@/components/Modals/AddProductModal/AddProductModal";
import { useState } from "react";

export const useProductForm = (initialProductData: ProductData) => {
  const [productData, setProductData] = useState<ProductData>(initialProductData);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: type === "number" && value === "" ? "" : value,
    }));
  };

  return { productData, setProductData, uploadedImages, setUploadedImages, handleChange };
};
