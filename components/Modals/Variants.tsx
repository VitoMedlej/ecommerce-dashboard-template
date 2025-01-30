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
    <div className="p-4 border border-gray-300 rounded-lg bg-white">
      <h2 className="text-lg font-semibold mb-3">Variants</h2>
      {variants.map((variant, index) => (
        <div key={index} className="space-y-3 mb-4">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Variant Name (e.g., Color)"
              value={variant.key}
              onChange={(e) => updateVariant(index, "key", e.target.value)}
              className="p-2 border rounded-md flex-1"
            />
            <button
              type="button"
              onClick={() => deleteVariant(index)}
              className="px-3 py-2 bg-red-500 text-white rounded-md"
            >
              Delete
            </button>
          </div>
          {variant.value.split(",").map((value, i) => (
            <div key={i} className="flex items-center space-x-2">
              <input
                type="text"
                placeholder={`Value ${i + 1}`}
                value={value}
                onChange={(e) => {
                  const newValue = [...variant.value.split(",")];
                  newValue[i] = e.target.value;
                  updateVariant(index, "value", newValue.join(","));
                }}
                className="p-2 border rounded-md flex-1"
              />
              {i === variant.value.split(",").length - 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const newValue = variant.value ? `${variant.value}, ` : "";
                    updateVariant(index, "value", newValue);
                  }}
                  className="px-3 py-2 bg-blue-500 text-white rounded-md"
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
        className="px-4 py-2 bg-green-500 text-white rounded-md"
      >
        Add Variant
      </button>
      {variants.length > 0 && (
        <button
          type="button"
          onClick={resetVariants}
          className="px-4 py-2 text-red-500 rounded-md mt-3"
        >
          Reset Variants
        </button>
      )}
    </div>
  );
};

export default Variants;
