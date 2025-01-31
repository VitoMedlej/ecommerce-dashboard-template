// "use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { fetchOrders } from "utils/FetchOrders";
import OrdersTableBody from "./components/OrdersTableBody";



export default async function OrdersPage() {
  const session = await auth();

  if (!session) {
    // Redirect or render unauthorized UI
    redirect('/login'); // Ensure `redirect` is imported if used
  }
  const orders = await fetchOrders(0,12, 20 )
  return (
    <div className="p-4 max-w-full overflow-x-auto">
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>View and manage all orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[600px] md:min-w-full">
            <TableHeader>
              <TableRow className=" md:table-row">
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Shipping</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <OrdersTableBody data={orders} />
          </Table>
        </div>
      </CardContent>
      <CardFooter>
        {!orders?.error && orders?.total > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-2">
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-{orders.orders.length}</strong> of <strong>{orders.total}</strong> orders
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
        )}
      </CardFooter>
    </Card>
  </div>
  );
}
