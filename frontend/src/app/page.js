"use client";
import CustomerTable from "./components/CustomerTable";

export default function Home() {
  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            Customer Dashboard
          </h1>
          <p className="text-indigo-100 text-lg">
            Manage your customers and track their orders
          </p>
        </div>
        <CustomerTable />
      </div>
    </main>
  );
}