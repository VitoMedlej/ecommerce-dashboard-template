import { ProductData } from "@/components/Modals/AddProductModal/AddProductModal";

export type IProduct = {
  _id: string;
  title: string;
  description: string;
  price: number;
  newPrice: number;
  category: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
};


export async function getProducts(
  search: string,
  offset: number
): Promise<{
  products: ProductData[];
  newOffset: number | null;
  totalProducts: number;
}> {
  try {
    const response = await fetch(`${process.env.EXTERNAL_API_URL}/products?search=${search}&offset=${offset}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TKN}`,
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      products: data?.responseObject,
      newOffset: data.newOffset || 12,
      totalProducts: data?.responseObject?.length,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [], newOffset: null, totalProducts: 0 };
  }
}

export async function deleteProductById(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.EXTERNAL_API_URL}/products/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete product: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
}
