"use client";
import { useState } from "react";
import { fetchOrders } from "../lib/api";
import OrdersTable from "./OrdersTable";
import InlineStatusEditor from "./InlineStatusEditor";

export default function CustomerRow({ customer, index }) {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [editingStatus, setEditingStatus] = useState(false);

  const toggleExpand = async () => {
    if (!expanded) {
      setLoading(true);
      const data = await fetchOrders(customer.id);
      setOrders(data);
      setLoading(false);
    }
    setExpanded(!expanded);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <>
      <tr className={`hover:bg-indigo-50/50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white/30' : 'bg-gray-50/30'}`}>
        <td className="px-6 py-4 whitespace-nowrap">
          <button
            onClick={toggleExpand}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-600 transition-colors duration-200"
          >
            <span className={`transform transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}>
              ▶
            </span>
          </button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
              {customer.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="text-sm font-medium text-gray-900">{customer.name}</div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-600">{customer.email}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {editingStatus ? (
            <InlineStatusEditor
              status={customer.status}
              onSave={(newStatus) => {
                console.log("New status:", newStatus);
                setEditingStatus(false);
              }}
              onCancel={() => setEditingStatus(false)}
            />
          ) : (
            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(customer.status)}`}>
              {customer.status}
            </span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
              <span className="text-xs font-semibold text-blue-600">{customer.orderCount}</span>
            </div>
            <span className="text-sm text-gray-600">orders</span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-semibold text-green-600">
            ${customer.revenue?.toLocaleString()}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button
            onClick={() => setEditingStatus(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
          >
            Edit
          </button>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-gradient-to-r from-indigo-50 to-purple-50">
          <td colSpan={7} className="px-6 py-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <span className="ml-3 text-gray-600">Loading orders...</span>
              </div>
            ) : (
              <div className="bg-white/70 rounded-lg p-4 shadow-inner">
                <OrdersTable orders={orders} />
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  );
}
