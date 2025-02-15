'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Product } from './product';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCurrentProductContext } from 'app/context/ContextProvider';
import { useEffect, useState } from 'react';
import AddProductModal from '@/components/Modals/AddProductModal/AddProductModal';
import { Categories } from 'utils/SanityFunctions';
import EditProductModal from '@/components/Modals/EditProductModal/EditProductModal';
import { deleteProduct } from './actions';
import { ProductData } from 'app/Hooks/useProductForm';
import { SearchInput } from './search';

const deleteTestProduct = async (id : string) => {
  try {
    const response = await fetch(`https://millionairebia.com/api/test/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TKN}`,
      },
      mode: 'cors',  // Explicitly setting cors mode
    });

    if (!response.ok) {
      throw new Error(`Failed to delete product: ${response.statusText}`);
    }

    const result = await response.json();
    console.log(result);  // Should log success message from the backend

    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    alert('Error deleting product');
    return false;
  }
};





export function ProductsTable({
  products,
  offset,
  totalProducts,
  categories
}: {
  products: ProductData[];
  offset: number;
  totalProducts: number;
  categories:Categories | null;
}) {
  let router = useRouter();
  
  let productsPerPage = 12;
  const { currentProduct } = useCurrentProductContext();
  const [currentProducts, setCurrentProducts] = useState(products);

 
  const [productIdToEdit, setEditProductId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (id) {
        const success = await deleteProduct(id);
        if (success) {
            setCurrentProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
        }
    }
};
 

  const getProductToEdit = (id: string | null): ProductData | null => {
    if (!id) return null;
    return currentProducts.find(product => product.id === id) || null;
  };
  
 

useEffect(() => {
  if (!currentProduct.product) return;

  setCurrentProducts((prev) => 
    currentProduct.isNew
      ? [...prev, currentProduct.product]
      : prev.map((product) => product.id === currentProduct.product.id ? currentProduct.product : product)
  );
}, [currentProduct]);

useEffect(()=>{
  if (products) {
    setCurrentProducts(products)
  }
},[products])

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/?offset=${offset}`, { scroll: false });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <button onClick={()=>deleteTestProduct('1234567')}>
          delete
        </button>
        <CardDescription className='pb-2'>
          Manage your products and view their sales performance.
        </CardDescription>
        <SearchInput/>
      </CardHeader>
    {currentProducts && currentProducts?.length > 0 ?  <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">
                <span className="">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>
                 Stock</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">
                Category
              </TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProducts && [...currentProducts].reverse().map((product) => (
              <Product
              handleDelete={handleDelete}
              setEditProductId={setEditProductId} key={`${product.id}`} product={product} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    :
    <div className='p-6  font-semibold'>
      No Products Found...
    </div>  
    }
    { <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.max(0, Math.min(offset - productsPerPage, totalProducts) + 1)}-{offset}
            </strong>{' '}
            of <strong>{totalProducts}</strong> products
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === productsPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + productsPerPage > totalProducts}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
        <EditProductModal data={getProductToEdit(productIdToEdit)} categories={categories || []} />
       <AddProductModal  categories={categories || []} />
        {/* <ProductModals categories={categoriesData} productToEdit={products[0]} /> */}
      </CardFooter>}
    </Card>
  );
}
