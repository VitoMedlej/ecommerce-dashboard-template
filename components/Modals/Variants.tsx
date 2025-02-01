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
    <div className="p-1 py-3 border border-gray-300 rounded-lg bg-white ">
  <h2 className="text-xl font-semibold mb-4">Product Variants</h2>
  {variants.map((variant, index) => (
    <div key={index} className="space-y-4 mb-6">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Variant Name (e.g., Color)"
          value={variant.key}
          onChange={(e) => updateVariant(index, "key", e.target.value)}
          className="p-3 border border-gray-300 rounded-md w-1/2 text-sm"
        />
        <button
          type="button"
          onClick={() => deleteVariant(index)}
          className="px-3 py-2 bg-red-600 text-white rounded-md text-xs hover:bg-red-500"
        >
          Delete
        </button>
      </div>
      {variant.value.split(",").map((value, i) => (
    <div key={i} className="flex items-center space-x-3 w-full">
    <input
      type="text"
      placeholder={`Value ${i + 1} (e.g., Blue)`}
      value={value.trim()} // Ensure no unwanted leading/trailing spaces
      onChange={(e) => {
        const newValue = [...variant.value.split(",")];
        newValue[i] = e.target.value;
        updateVariant(index, "value", newValue.join(","));
      }}
      className="p-3 border w-full border-gray-300 rounded-md text-sm"
    />
    {i === variant.value.split(",").length - 1 && (
      <button
        type="button"
        onClick={() => {
          const newValue = variant.value ? `${variant.value},` : "";
          updateVariant(index, "value", newValue);
        }}
        className="px-1 py-2 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-400"
      >
        Add Value
      </button>
    )}
  </div>
   
      ))}
    </div>
  ))}
  <button
    type="button"
    onClick={addVariant}
    className="px-4 py-2 bg-green-700 text-white rounded-md text-sm w-full mt-4 hover:bg-green-400"
  >
    Add New Variant
  </button>
  {variants.length > 0 && (
    <button
      type="button"
      onClick={resetVariants}
      className="px-4 py-2 text-red-600 rounded-md mt-1 text-sm w-full hover:bg-red-100"
    >
      Reset Variants
    </button>
  )}
</div>

  );
};

export default Variants;
