"use client";
import InlineSizeEditor from "./InlineSizeEditor";

export default function OrdersTable({ orders }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          📦
        </div>
        <p>No orders found for this customer</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="w-full bg-white">
        <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Order Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Total Amount
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Items
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order, index) => (
            <tr key={order.orderId} className={`hover:bg-gray-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-xs font-semibold text-blue-600">#</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{order.orderId}</span>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="text-sm text-gray-600">
                  {new Date(order.orderDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="text-sm font-semibold text-green-600">
                  ${order.totalAmount?.toLocaleString()}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.orderItemId} className="flex items-center justify-between bg-gray-50 rounded-lg p-2 border border-gray-200">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-xs text-purple-600">🛍️</span>
                        </div>
                        <span className="text-sm text-gray-700">{item.itemName}</span>
                        <span className="text-sm font-medium text-gray-900">${item.price}</span>
                      </div>
                      <InlineSizeEditor item={item} />
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
