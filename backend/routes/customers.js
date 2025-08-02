const express = require("express");
const router = express.Router();
const customers = require("../data/mockData");

// GET /api/customers (Pagination, Sorting, Filtering)
router.get("/", (req, res) => {
  const { page = 1, limit = 10, sortBy = "name", order = "asc", search = "" } = req.query;

  let filtered = customers.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  );

  filtered = filtered.sort((a, b) => {
    if (order === "asc") return a[sortBy] > b[sortBy] ? 1 : -1;
    return a[sortBy] < b[sortBy] ? 1 : -1;
  });

  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + parseInt(limit));

  res.json({
    customers: paginated.map(({ orders, ...summary }) => summary),
    total: filtered.length
  });
});

// GET /api/customers/:id/orders
router.get("/:id/orders", (req, res) => {
  const customer = customers.find((c) => c.id == req.params.id);
  if (!customer) return res.status(404).json({ message: "Customer not found" });
  res.json(customer.orders);
});

module.exports = router;
