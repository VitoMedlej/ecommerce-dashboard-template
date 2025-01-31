"use client";

import { Button } from '@/components/ui/button';
import { TableBody, TableRow, TableCell } from '@/components/ui/table';
import { OrderData, useOrderManagement } from 'app/Hooks/useOrderManagement';
import React, { useState } from 'react';
import { FetchOrdersResponse } from 'utils/FetchOrders';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

export const getValidImage = (images: string[]) => {
  return Array.isArray(images) && images?.length > 0
    ? images.find(
        (url) => url !== undefined && typeof url === 'string' 
        && /^(https:\/\/res\.cloudinary\.com\/.*|https:\/\/wavescode8cdn\.sirv\.com\/.*)$/.test(url)
      )
    : 'https://wavescode8cdn.sirv.com/logo.png';
};

const OrdersTableBody = ({ data }: { data: FetchOrdersResponse }) => {
  const orders = data?.orders || null;
  const { editOrder } = useOrderManagement();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [orderStatus, setOrderStatus] = useState<{ [key: string]: string }>({});

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrderId(prevId => (prevId === orderId ? null : orderId));
  };

  return (
    <TableBody>
      {orders?.length > 0 && orders.map((order) => (
        <React.Fragment key={order.id}>
          <TableRow>
            <TableCell>{order.customerName}</TableCell>
            <TableCell>{order.priceAfterDiscount}</TableCell>
            <TableCell>{order.shippingCost}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">{orderStatus[order.id] || order.status}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {['pending', 'shipped', 'delivered', 'canceled'].map((status) => (
                    <DropdownMenuItem key={status} onClick={() => setOrderStatus(prev => ({ ...prev, [order.id]: status }))}>
                      {status}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
            <TableCell>{order.orderDate}</TableCell>
            <TableCell className="text-right space-x-2">
              {/* <Button variant="outline" size="sm" onClick={() => editOrder(order)}>Edit</Button> */}
              <Button variant="outline" size="sm" onClick={() => toggleOrderDetails(order.id)}>
                {expandedOrderId === order.id ? "Hide" : "Show"} Products
              </Button>
            </TableCell>
          </TableRow>
          {expandedOrderId === order.id && order.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell colSpan={6} className="flex flex-row items-center gap-2 p-4">
                <Image
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height={64}
                  width={64}
                  src={''}
                  // src={getValidImage(item.images)}
                />
                <div>
                  <strong>{item.productName}</strong>
                  <div>Quantity: {item.quantity}</div>
                  <div>Price: {item.price}</div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </React.Fragment>
      ))}
    </TableBody>
  );
};

export default OrdersTableBody;