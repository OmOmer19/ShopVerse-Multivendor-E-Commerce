import React, { useState } from "react";
import {Package, ShoppingCart, User , Home} from 'lucide-react';
import { Link } from "react-router-dom";

import VendorOrders from "../components/VendorOrders";
import VendorProducts from "../components/VendorProducts";
import VendorProfile from "../components/VendorProfile";


function VendorDashboard({vendor,setVendor, products, setProducts}) {
    const [activeTab, setActiveTab] = useState("products")

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-6">Welcome, {vendor.name}</h1>

      </div>

      <nav className="mb-6 flex gap-6 border-b">
        <button
          className={`flex items-center gap-1 pb-2 ${
            activeTab === "products"
              ? "border-b-2 border-indigo-600 font-semibold text-indigo-600"
              : "text-gray-600 hover:text-indigo-600"
          }`}
          onClick={() => setActiveTab("products")}
          aria-label="Products"
        >
          <Package size={18} />
          Products
        </button>

        <button
          className={`flex items-center gap-1 pb-2 ${
            activeTab === "orders"
              ? "border-b-2 border-indigo-600 font-semibold text-indigo-600"
              : "text-gray-600 hover:text-indigo-600"
          }`}
          onClick={() => setActiveTab("orders")}
          aria-label="Orders"
        >
          <ShoppingCart size={18} />
          Orders
        </button>

        <button
          className={`flex items-center gap-1 pb-2 ${
            activeTab === "profile"
              ? "border-b-2 border-indigo-600 font-semibold text-indigo-600"
              : "text-gray-600 hover:text-indigo-600"
          }`}
          onClick={() => setActiveTab("profile")}
          aria-label="Profile"
        >
          <User size={18} />
          Profile
        </button>
      </nav>

      <section>
        {activeTab === "products" && (
          <VendorProducts
            vendorId={vendor.id}
            products={products}
            setProducts={setProducts}
          />
        )}
        {activeTab === "orders" && <VendorOrders vendorId={vendor.id} />}
        {activeTab === "profile" && <VendorProfile vendor={vendor} onUpdateVendor={setVendor}/>}
      </section>
    </div>
  )
}

export default VendorDashboard;