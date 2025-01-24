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
  const defaultResponse = { products: [], newOffset: null, totalProducts: 0 };

  try {
    const response = await fetch(`${process.env.EXTERNAL_API_URL}/dashboard/fetch-products?search=${search}&offset=${offset}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TKN}`,
      },
      next: {revalidate: 0}
    });

    if (response.status !== 200) {
      console.warn('Invalid or non-JSON response received.');
      return defaultResponse;
    }

    const data = await response.json();
    return {
      products: data?.responseObject.data || [],
      newOffset: data?.newOffset || 12,
      totalProducts: data?.responseObject?.total,
    };
  } catch (error : any)  {
    console.warn('Error fetching products:', error.message || error);
    return defaultResponse;
  }
}

export async function deleteProductById(id: string): Promise<boolean> {
  try {
     
    const response = await fetch(`${process.env.EXTERNAL_API_URL || process.env.EXTERNAL_API_URL}/products/dashboard/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TKN}`,
      },
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
