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
  const { products, newOffset, totalProducts } = await getProducts(
    search,
    Number(offset)
  );
const {data : categories} = await fetchSanityCategories()
console.log('categories: ', categories);

  return (
    <>
      <Tabs defaultValue="all">
        <DashboardOptions />
        <TabsContent value="all">
   
          <ProductsTable
            products={products}
            offset={newOffset ?? 0}
            totalProducts={totalProducts}
          />
        </TabsContent>
      </Tabs>
      
      <ProductModals categories={categories} productToEdit={products[0]}/>
   
    </>
  );
}
