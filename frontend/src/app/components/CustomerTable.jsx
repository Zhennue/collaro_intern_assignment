"use client";
import { useEffect, useState } from "react";
import { fetchCustomers } from "../lib/api";
import CustomerRow from "./CustomerRow";

export default function CustomerTable() {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCustomers(page, limit, sortBy, order).then(({ customers, total }) => {
      setCustomers(customers);
      setTotal(total);
    });
  }, [page, limit, sortBy, order]);

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Expand
              </th>
              {["name", "email", "status", "orderCount", "revenue"].map((col) => (
                <th
                  key={col}
                  onClick={() => {
                    setSortBy(col);
                    setOrder(order === "asc" ? "desc" : "asc");
                  }}
                  className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-1">
                    <span>{col.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}</span>
                    {sortBy === col && (
                      <span className="text-yellow-300">
                        {order === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white/50 divide-y divide-gray-200/50">
            {customers.map((c, index) => (
              <CustomerRow key={c.id} customer={c} index={index} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 flex justify-between items-center border-t border-gray-200/50">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          Previous
        </button>
        <span className="text-gray-700 font-medium bg-white px-4 py-2 rounded-lg shadow-sm">
          Page {page} of {Math.ceil(total / limit)}
        </span>
        <button
          disabled={page * limit >= total}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          Next
        </button>
      </div>
    </div>
  );
}
