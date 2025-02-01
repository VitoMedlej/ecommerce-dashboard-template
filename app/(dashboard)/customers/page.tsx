// "use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {fetchCustomers} from "utils/FetchCustomers";

// Define the customer type explicitly
type Customer = Record<string, any>;

const customers: Customer[] = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", status: "Active", createdAt: "2024-12-01" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "Inactive", createdAt: "2024-11-15" },
  { id: 3, name: "Sam Wilson", email: "sam.wilson@example.com", status: "Active", createdAt: "2024-10-10" },
  { id: 4, name: "Emily Davis", email: "emily.davis@example.com", status: "Pending", createdAt: "2024-09-25" },
  { id: 5, name: "Michael Brown", email: "michael.brown@example.com", orders: 2, status: "Active", createdAt: "2024-08-19" },
  { id: 6, name: "New Customer", email: "new.customer@example.com", status: "Active", age: 30, createdAt: "2024-12-02" },
];


export const revalidate = 200;

export default async function CustomersPage() {

  const usersResponse = await fetchCustomers()
  console.log('usersResponse: ', usersResponse);

  const customerKeys = Array.from(
    new Set(customers.flatMap(customer => Object.keys(customer)))
  );
  const session = await auth();

  if (!session) {
    // Redirect or render unauthorized UI
    redirect('/login'); // Ensure `redirect` is imported if used
  }
  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle >Customers</CardTitle>
          <CardDescription>View all customers and their details.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {customerKeys.map((key) => (
                  <TableHead key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</TableHead>
                ))}
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer, index) => (
                <TableRow key={index}>
                  {customerKeys.map((key) => (
                    <TableCell key={key}>{customer[key] ?? "N/A"}</TableCell>
                  ))}
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
              Showing <strong>1-{customers.length}</strong> of <strong>{customers.length}</strong> customers
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
