// "use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

type Order = {
  id: number;
  customerName: string;
  productImage: string;
  productName: string;
  priceAfterDiscount: string;
  shippingCost: string;
  status: string;
  orderDate: string;
};

const orders: Order[] = [
  {
    id: 1,
    customerName: "John Doe",
    productImage: "/path/to/image1.jpg",
    productName: "Smartphone A",
    priceAfterDiscount: "$500",
    shippingCost: "$15",
    status: "Shipped",
    orderDate: "2024-12-01",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    productImage: "/path/to/image2.jpg",
    productName: "Laptop B",
    priceAfterDiscount: "$950",
    shippingCost: "$20",
    status: "Delivered",
    orderDate: "2024-11-20",
  },
  {
    id: 3,
    customerName: "Sam Wilson",
    productImage: "/path/to/image3.jpg",
    productName: "Headphones C",
    priceAfterDiscount: "$120",
    shippingCost: "$5",
    status: "Processing",
    orderDate: "2024-12-02",
  },
];

export default async function OrdersPage() {
  const session = await auth();

  if (!session) {
    // Redirect or render unauthorized UI
    redirect('/login'); // Ensure `redirect` is imported if used
  }
  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>View and manage all orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Price (After Discount)</TableHead>
                <TableHead>Shipping Cost</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <img
                      src={order.productImage}
                      alt={order.productName}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.productName}</TableCell>
                  <TableCell>{order.priceAfterDiscount}</TableCell>
                  <TableCell>{order.shippingCost}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="flex justify-between items-center w-full">
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-{orders.length}</strong> of <strong>{orders.length}</strong> orders
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="mr-2 h-4 w-4" /> Prev
              </Button>
              <Button variant="ghost" size="sm">
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
