"use client";

import { ProductData } from "@/components/Modals/AddProductModal/AddProductModal";
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

export const CurrentProductContext = createContext<{
  currentProduct: { product: any | null; isNew: boolean };
  setCurrentProduct: Dispatch<SetStateAction<{ product: any | null; isNew: boolean }>>;
}>({
  currentProduct: { product: null, isNew: false },
  setCurrentProduct: () => {},
});


const ContextWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isProductEditModalOpen, setIsProductEditModalOpen] = useState<boolean>(false);
  const [ProductModalOpen, SetProductModalOpen] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<{
    product: ProductData | null;
    isNew: boolean;
  }>({
    product: null,
    isNew: false,
  });

  return (
    <ProductEditModalContext.Provider value={{ isProductEditModalOpen, setIsProductEditModalOpen }}>
      <AddProductModalContext.Provider value={{ ProductModalOpen, SetProductModalOpen }}>
      <CurrentProductContext.Provider value={{ currentProduct, setCurrentProduct }}>

        {children}
      </CurrentProductContext.Provider>
      </AddProductModalContext.Provider>
    </ProductEditModalContext.Provider>
  );
};

export default ContextWrapper;

export const useProductEditModalContext = () => useContext(ProductEditModalContext);
export const useAddProductModalContext = () => useContext(AddProductModalContext);
export const useCurrentProductContext = () => useContext(CurrentProductContext);