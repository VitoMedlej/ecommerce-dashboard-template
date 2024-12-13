import React from 'react'
import AddProductModal, { ProductData } from './AddProductModal/AddProductModal'
import EditProductModal from './EditProductModal/EditProductModal'

const ProductModals = ({productToEdit, categories} : {productToEdit:ProductData, categories : any}) => {
  return (
    <>
       <EditProductModal data={productToEdit} categories={categories} />
       <AddProductModal  categories={categories} />
    </>
  )
}

export default ProductModals