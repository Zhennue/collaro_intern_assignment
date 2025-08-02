const BASE_URL = "http://localhost:5000/api";

export const fetchCustomers = async (page = 1, limit = 10, sortBy = "name", order = "asc", search = "") => {
  try {
    const res = await fetch(`${BASE_URL}/customers?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}&search=${search}`);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching customers:', error);
    // Return empty result structure when backend is not available
    return {
      customers: [],
      total: 0,
      error: error.message.includes('fetch') ? 'Backend server is not running' : error.message
    };
  }
};

export const fetchOrders = async (customerId) => {
  try {
    const res = await fetch(`${BASE_URL}/customers/${customerId}/orders`);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    // Return empty array when backend is not available
    return [];
  }
};

