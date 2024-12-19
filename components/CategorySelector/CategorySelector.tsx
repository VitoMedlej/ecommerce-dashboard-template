import React from 'react';
import * as Form from "@radix-ui/react-form";
import { Category, initialProductData, ProductData } from '../Modals/AddProductModal/AddProductModal';
import { useProductForm } from 'app/Hooks/useProductForm';





interface CategorySelectorProps {
  categories: Category[];
  productData: ProductData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, productData, handleChange }) => {
    
  return (
    <>
      <Form.Field name="category">
        <Form.Label className="block text-sm pb-1 font-medium">Category</Form.Label>
        <select
          name="category"
          value={productData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.title} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
      </Form.Field>

      {productData.category && (
        <Form.Field name="subcategory">
          <Form.Label className="block text-sm pb-1 font-medium">Subcategory</Form.Label>
          <select
            name="subcategory"
            value={productData.subcategory}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a subcategory</option>
            {categories
              .find((cat) => cat.title === productData.category)
              ?.subcategories.map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
          </select>
        </Form.Field>
      )}
    </>
  );
};

export default CategorySelector;
