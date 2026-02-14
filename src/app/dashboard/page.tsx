"use client";

import { RiShoppingBagLine } from "react-icons/ri";

const mockOrders = [
  { id: "ORD-1001", date: "2025-02-10", items: "Acrylic QR Stand, Dog Tag", total: 998, status: "Delivered" },
  { id: "ORD-1002", date: "2025-02-08", items: "Photo Album", total: 890, status: "Shipped" },
  { id: "ORD-1003", date: "2025-02-05", items: "QR Menu Stand", total: 490, status: "Processing" },
];

const statusColors: Record<string, string> = {
  Delivered: "bg-emerald-100 text-emerald-800",
  Shipped: "bg-blue-100 text-blue-800",
  Processing: "bg-amber-100 text-amber-800",
};

export default function DashboardOrdersPage() {
  return (
    <div>
      <h2 className="flex items-center gap-2 text-xl font-semibold text-[var(--foreground)]">
        <RiShoppingBagLine className="h-6 w-6" />
        Orders
      </h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        View and track your orders
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="py-3 text-left text-sm font-semibold text-[var(--foreground)]">Order ID</th>
              <th className="py-3 text-left text-sm font-semibold text-[var(--foreground)]">Date</th>
              <th className="py-3 text-left text-sm font-semibold text-[var(--foreground)]">Items</th>
              <th className="py-3 text-left text-sm font-semibold text-[var(--foreground)]">Total</th>
              <th className="py-3 text-left text-sm font-semibold text-[var(--foreground)]">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id} className="border-b border-[var(--border)] last:border-0">
                <td className="py-4 text-sm font-medium text-[var(--foreground)]">{order.id}</td>
                <td className="py-4 text-sm text-[var(--muted)]">{order.date}</td>
                <td className="py-4 text-sm text-[var(--muted)]">{order.items}</td>
                <td className="py-4 text-sm font-semibold text-[var(--foreground)]">₹{order.total}</td>
                <td className="py-4">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusColors[order.status] ?? "bg-gray-100 text-gray-800"}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mockOrders.length === 0 && (
        <p className="mt-12 text-center text-[var(--muted)]">No orders yet</p>
      )}
    </div>
  );
}
