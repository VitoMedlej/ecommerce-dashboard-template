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
  limit: number = 10,
  search: string = ""
): Promise<FetchCustomersResponse> => {
  const url = `${process.env.NEXT_PUBLIC_EXTERNAL_API_URL}/api/dashboard/fetch-users?page=${page}&limit=${limit}&search=${encodeURIComponent(
    search
  )}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {
        error: `Failed to fetch customers: ${response.statusText}`,
        customers: [],
        total: 0,
      };
    }

    const data = await response.json();

    if (!data || !data.data) {
      return {
        error: "Invalid data structure returned",
        customers: [],
        total: 0,
      };
    }

    return {
      customers: data.data,
      total: data.total || 0,
    };
  } catch (error: any) {
    console.error("Error fetching customers:", error);
    return {
      error: error.message || "An unexpected error occurred",
      customers: [],
      total: 0,
    };
  }
};