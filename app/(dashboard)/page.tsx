import { Tabs, TabsContent } from '@/components/ui/tabs';
import { ProductsTable } from './products-table';
import { getProducts } from '@/lib/db';
import DashboardOptions from '@/components/DashboardOptions/DashboardOptions';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { fetchSanityCategories } from 'utils/SanityFunctions';
import ProductModals from '@/components/Modals/ProductModals';





export default async function ProductsPage(
  props: {
    searchParams: Promise<{ q: string; offset: string }>;
  }
) {
  const session = await auth();

  if (!session) {
    redirect('/login'); 
  }

  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;

  let productsData, categoriesData;
  try {
    productsData = await getProducts(search, Number(offset));
  } catch (error : any) {
    console.error('Error loading products:', error.message || error);
    productsData = { products: [], newOffset: null, totalProducts: 0 };
  }

  try {
    const { data: categories } = await fetchSanityCategories();
    categoriesData = categories || [];
  } catch (error : any) {
    console.error('Error loading categories:', error.message || error);
    categoriesData = [];
  }

  const { products, newOffset, totalProducts } = productsData;

  return (
    <>
      <Tabs defaultValue="all">
        <DashboardOptions />
        <TabsContent value="all">
          {products.length > 0 ? (
            <ProductsTable
              products={products}
              offset={newOffset ?? 0}
              totalProducts={totalProducts}
            />
          ) : (
            <div>No products available</div>
          )}
        </TabsContent>
      </Tabs>
      
      <ProductModals categories={categoriesData} productToEdit={products[0]} />
    </>
  );
}
