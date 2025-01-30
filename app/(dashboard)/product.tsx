import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { useProductEditModalContext } from 'app/context/ContextProvider';
import { Dispatch, SetStateAction } from 'react';
import { ProductData } from 'app/Hooks/useProductForm';

export function Product({ product, setEditProductId, handleDelete }: {
  product: ProductData,
  setEditProductId: Dispatch<SetStateAction<string | null>>,
  handleDelete: (id: string) => void;
}) {
  const validImage = 
    Array.isArray(product?.images) && 
    product.images.find(
      (url) => typeof url === 'string' && /^https:\/\/res\.cloudinary\.com\/.*$/.test(url)
    );

  const { setIsProductEditModalOpen } = useProductEditModalContext();

  return (
    <TableRow>
      <TableCell className="sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height={64}
          width={64}
          src={`${validImage}` || 'https://authjs.dev/img/etc/logo-sm.webp'}
        />
      </TableCell>
      <TableCell className="font-medium">{product.title as string}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {Number(product?.stock) > 0 ? ` ${product?.stock}` : 'N/A'}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{`$${product.price}`}</TableCell>
      <TableCell className="hidden md:table-cell">{product.category as string}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                setEditProductId(`${product.id}`);
                setIsProductEditModalOpen(true);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleDelete(`${product.id}`)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
