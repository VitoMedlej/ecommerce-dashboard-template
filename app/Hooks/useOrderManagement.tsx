"use client"

import { useState } from "react";

// Define types for the order data
export interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface OrderData {
  id: string;
  customerName: string;
  items: OrderItem[];
  priceAfterDiscount: number;
  shippingCost: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  orderDate: string;
  productImage: string;
}

// Custom hook to manage orders (add, edit, delete)
export const useOrderManagement = () => {
  const [orderData, setOrderData] = useState<OrderData>({
    id: "",
    customerName: "",
    items: [],
    priceAfterDiscount: 0,
    shippingCost: 0,
    status: "pending",
    orderDate: "",
    productImage: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = `${process.env.NEXT_PUBLIC_EXTERNAL_API_URL}/api/order/`;

  // Function to handle changes in input fields (form fields)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: type === "number" && value === "" ? "" : value,
    }));
  };

  // Function to reset form state to initial empty values
  const resetForm = () => {
    setOrderData({
      id: "",
      customerName: "",
      items: [],
      priceAfterDiscount: 0,
      shippingCost: 0,
      status: "pending",
      orderDate: "",
      productImage: "",
    });
  };

  // Add a new order via API
  const addOrder = async (newOrder: OrderData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        throw new Error("Failed to add order");
      }

      const data = await response.json();
      setOrderData(data); // Update order data with the response from the API
    } catch (err: any) {
      setError(err.message || "An error occurred while adding the order.");
    } finally {
      setIsLoading(false);
    }
  };

  // Edit an existing order via API
  const editOrder = async (updatedOrder: OrderData) => {
    setIsLoading(true);
    setError(null);

    if (!updatedOrder.id) {
      setError("Order ID is required to edit.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/${updatedOrder.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrder),
      });

      if (!response.ok) {
        throw new Error("Failed to edit order");
      }

      const data = await response.json();
      setOrderData(data); // Update order data with the response from the API
    } catch (err: any) {
      setError(err.message || "An error occurred while editing the order.");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete an order via API
  const deleteOrder = async (orderId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/${orderId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete order");
      }

      setOrderData({
        id: "",
        customerName: "",
        items: [],
        priceAfterDiscount: 0,
        shippingCost: 0,
        status: "pending",
        orderDate: "",
        productImage: "",
      });
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting the order.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    orderData,
    setOrderData,
    isLoading,
    error,
    handleChange,
    resetForm,
    addOrder,
    editOrder,
    deleteOrder,
  };
};
