const BASE_URL = "http://localhost:5000/api";

export const fetchCustomers = async (page = 1, limit = 10, sortBy = "name", order = "asc", search = "") => {
  const res = await fetch(`${BASE_URL}/customers?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}&search=${search}`);
  return res.json();
};

export const fetchOrders = async (customerId) => {
  const res = await fetch(`${BASE_URL}/customers/${customerId}/orders`);
  return res.json();
};
