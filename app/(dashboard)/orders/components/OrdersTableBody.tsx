"use client"

import { Button } from '@/components/ui/button'
import { TableBody, TableRow, TableCell } from '@/components/ui/table'
import { OrderData, useOrderManagement } from 'app/Hooks/useOrderManagement'
import React, { useState } from 'react'
import { FetchOrdersResponse } from 'utils/FetchOrders'
import Image from 'next/image';


export const getValidImage = (images : string[] ) => {
  return Array.isArray(images) && images?.length > 0
    ? images.find(
        (url) => url !== undefined && typeof url === 'string' 
        && /^(https:\/\/res\.cloudinary\.com\/.*|https:\/\/wavescode8cdn\.sirv\.com\/.*)$/.test(url)
      )
    : 'https://wavescode8cdn.sirv.com/logo.png';
};
const OrdersTableBody = ({ data }: { data: FetchOrdersResponse }) => {
    const orders = data?.orders || null;
  const { editOrder } = useOrderManagement()
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrderId(prevId => (prevId === orderId ? null : orderId))
  }
  return (
    <TableBody>
      {orders && orders?.length > 0 && orders.map((order) => (
        <React.Fragment key={order.id}>
          <TableRow>
            {/* <TableCell>
              <img
                src={order.productImage}
                alt={order.productName}
                className="w-16 h-16 object-cover rounded"
              />
            </TableCell> */}
            <TableCell>{order.customerName}</TableCell>
            {/* <TableCell>{order.productName}</TableCell> */}
            <TableCell>{order.priceAfterDiscount}</TableCell>
            <TableCell>{order.shippingCost}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>{order.orderDate}</TableCell>
            <TableCell onClick={() => editOrder(order)}>
              <Button variant="outline" size="sm">Edit</Button>
            </TableCell>
            <TableCell onClick={() => toggleOrderDetails(order.id)}>
              <Button variant="outline" size="sm">{expandedOrderId === order.id ? "Hide" : "Show"} Products</Button>
            </TableCell>
          </TableRow>
          
          {expandedOrderId === order.id && order.items.map((item, index) => (
  <TableRow key={index}>
    <TableCell colSpan={7}>
      <div className="pl-8 flex items-center">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height={64}
          width={64}
          src={'https://wavescode8cdn.sirv.com/logo.png'}
        />
        <div className="ml-4">
          <strong>{item.productName}</strong> - Quantity: {item.quantity} - Price: {item.price}
        </div>
      </div>
    </TableCell>
  </TableRow>
))}
        </React.Fragment>
      ))}
    </TableBody>
  )
}

export default OrdersTableBody;
