// useProductVariants.tsx
"use client";

import { useState } from "react";

export type Variant = {
  key: string;
  value: string;
};

export const useProductVariants = () => {
  const [variants, setVariants] = useState<Variant[]>([]);

  const addVariant = () => {
    setVariants((prev) => [...prev, { key: "", value: "" }]);
  };

  const updateVariant = (index: number, field: "key" | "value", value: string) => {
    setVariants((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const deleteVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const resetVariants = () => {
    setVariants([]);
  };

  return { variants, addVariant, updateVariant, deleteVariant, resetVariants };
};
