"use client";

import { deleteProductById } from "@/lib/db";

export async function deleteProduct(id: string): Promise<boolean> {
    if (!id) {
        console.error("Product ID is required to delete a product.");
        return false;
    }

    try {
        const confirmation = confirm("Are you sure you want to delete this product?");
        if (!confirmation) return false;

        const result = await deleteProductById(id);

        if (result) {
            alert("Product deleted successfully.");
            return true;
        } else {
            alert("Failed to delete product. Please try again.");
            console.error("Delete product failed:");
            return false;
        }
    } catch (error) {
        alert("An error occurred while deleting the product.");
        console.error("Error deleting product:", error);
        return false;
      
      }
}