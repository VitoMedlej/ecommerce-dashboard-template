import { OrderData } from "app/Hooks/useOrderManagement";

export interface FetchOrdersResponse {
    orders: OrderData[];
    total: number;
    error?: string;
  }
  
  export const fetchOrders = async (
    page: number = 1,
    limit: number = 10
  ): Promise<FetchOrdersResponse> => {
    const token = process.env.TKN;
    const url = `${process.env.EXTERNAL_API_URL}/api/dashboard/order?page=${page}&limit=${limit}`;
    
    if (!token) {
      return { error: "Bearer token is missing", orders: [], total: 0 };
    }
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        return { error: `Failed to fetch orders: ${response.statusText}`, orders: [], total: 0 };
      }
  
      const data = await response.json();
  
      if (!data || !data.orders) {
        return { error: "Invalid data structure returned", orders: [], total: 0 };
      }
  
      return {
        orders: data.orders,
        total: data.total || 0,
      };
    } catch (error: any) {
      console.error("Error fetching orders:", error);
      return { error: error.message || "An unexpected error occurred", orders: [], total: 0 };
    }
  };
  