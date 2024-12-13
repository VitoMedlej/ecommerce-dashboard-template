interface Customer {
  id: string;
  name: string;
  email: string;
}

interface FetchCustomersResponse {
  customers: Customer[];
  total: number;
  error?: string;
}

export const fetchCustomers = async (
  page: number = 1,
  limit: number = 10
): Promise<FetchCustomersResponse> => {
  const token = process.env.TKN;
  const url = `${process.env.EXTERNAL_API_URL}/customers?page=${page}&limit=${limit}`;

  if (!token) {
    return { error: "Bearer token is missing", customers: [], total: 0 };
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
      return { error: `Failed to fetch customers: ${response.statusText}`, customers: [], total: 0 };
    }

    const data = await response.json();

    if (!data || !data.customers) {
      return { error: "Invalid data structure returned", customers: [], total: 0 };
    }

    return {
      customers: data.customers,
      total: data.total || 0,
    };
  } catch (error: any) {
    console.error("Error fetching customers:", error);
    return { error: error.message || "An unexpected error occurred", customers: [], total: 0 };
  }
};
