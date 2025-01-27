// Variants.tsx
"use client";

import { Variant } from "app/Hooks/useProductVariants";

interface VariantsProps {
  variants: Variant[];
  addVariant: () => void;
  updateVariant: (index: number, field: "key" | "value", value: string) => void;
  deleteVariant: (index: number) => void;
  resetVariants: () => void;
}

const Variants = ({
  variants,
  addVariant,
  updateVariant,
  deleteVariant,
  resetVariants,
}: VariantsProps) => {
  return (
    <div
    
    style={{
        padding: "1em",
        border: "1px solid #8080802e",
        borderRadius: "7px",
      }}
    >
      <h2 className="text-sm font-medium mb-2">Variants</h2>
      {variants.map((variant, index) => (
        <div key={index} className="flex space-x-2 mb-2">
          <input
            type="text"
            placeholder="Key (e.g., Color)"
            value={variant.key}
            onChange={(e) => updateVariant(index, "key", e.target.value)}
            className="p-2 border rounded flex-1"
          />
          <input
            type="text"
            placeholder="Value (e.g., Red)"
            value={variant.value}
            onChange={(e) => updateVariant(index, "value", e.target.value)}
            className="p-2 border rounded flex-1"
          />
          <button
            type="button"
            onClick={() => deleteVariant(index)}
            className="px-2  py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addVariant}
        className="px-4 py-1 bg-blue-500 text-white rounded mt-2"
      >
        Add Variant
      </button>
   {variants.length > 0 &&   <button
        type="button"
        onClick={resetVariants}
        className="px-4 py-1 text-red-500  rounded mt-2 ml-2"
      >
        Reset Variants
      </button>}
    </div>
  );
};

export default Variants;
