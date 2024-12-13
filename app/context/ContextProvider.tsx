"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

// Define the context for ProductEditModal
export const ProductEditModalContext = createContext<{
  isProductEditModalOpen: boolean;
  setIsProductEditModalOpen: Dispatch<SetStateAction<boolean>>;
}>({
  isProductEditModalOpen: false,
  setIsProductEditModalOpen: () => {},
});

// Define the context for AddProductModal
export const AddProductModalContext = createContext<{
  ProductModalOpen: boolean;
  SetProductModalOpen: Dispatch<SetStateAction<boolean>>;
}>({
  ProductModalOpen: false,
  SetProductModalOpen: () => {},
});

// New context for newly added product
export const NewProductContext = createContext<{
  newProduct: any | null;
  setNewProduct: Dispatch<SetStateAction<any | null>>;
}>({
  newProduct: null,
  setNewProduct: () => {},
});


const ContextWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isProductEditModalOpen, setIsProductEditModalOpen] = useState<boolean>(false);
  const [ProductModalOpen, SetProductModalOpen] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState<any | null>(null);

  return (
    <ProductEditModalContext.Provider value={{ isProductEditModalOpen, setIsProductEditModalOpen }}>
      <AddProductModalContext.Provider value={{ ProductModalOpen, SetProductModalOpen }}>
      <NewProductContext.Provider value={{ newProduct, setNewProduct }}>

        {children}
      </NewProductContext.Provider>
      </AddProductModalContext.Provider>
    </ProductEditModalContext.Provider>
  );
};

export default ContextWrapper;

export const useProductEditModalContext = () => useContext(ProductEditModalContext);
export const useAddProductModalContext = () => useContext(AddProductModalContext);
export const useNewProductContext = () => useContext(NewProductContext);