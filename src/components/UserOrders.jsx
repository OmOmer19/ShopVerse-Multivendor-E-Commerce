import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";


function UserOrders(){

  // useLocation hook to access location state passed during navigation
  const location = useLocation()

  // useNavigate hook to programmatically navigate
  const navigate = useNavigate()

   // Extracting the order object from location.state
   const order = location.state?.order

   //if order data not found showing ing a message and provide button to redirect to shop/home page
  if (!order) {
    return (
      <div className="p-6 text-center">
        <p>No order details found.</p>
        <button
          onClick={() => navigate("/user/home")} // Navigate to shop/home page
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Go to Shop
        </button>
      </div>
    )
  }
  return(
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md">
      {/* Page heading */}
      <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>

      {/* Displaying order id */}
      <p className="mb-2">
        <strong>Order ID:</strong> {order.id}
      </p>

      {/* Formatting order date to local string */}
      <p className="mb-2">
        <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}
      </p>

      {/* Customer details section */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Customer Details</h2>
      <p><strong>Name:</strong> {order.customer.name}</p>
      <p><strong>Email:</strong> {order.customer.email}</p>
      <p><strong>Phone:</strong> {order.customer.phone}</p>
      <p><strong>Address:</strong> {order.customer.address}</p>

      {/* Ordered items list */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Items Ordered</h2>
      <ul className="divide-y divide-gray-200">
        {order.items.map((item) => (
          <li key={item.id} className="py-2 flex items-center gap-4">
            {/* Product image */}
            <img src={item.image} alt={item.title} className="w-16 h-16 object-contain rounded" />
            <div className="flex-grow">
              {/* Product title */}
              <p className="font-medium">{item.title}</p>
              {/* Quantity and price calculation */}
              <p>
                Quantity: {item.quantity} × ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Total price summary */}
      <div className="mt-6 font-semibold text-lg">
        Total Paid: ${order.total.toFixed(2)}
      </div>

      {/* Button to continue shopping */}
      <button
        onClick={() => navigate("/user/home")} // Navigate back to shop/home page
        className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center gap-2"
      >
        <ArrowLeft size={18} /> {/* Lucide icon for back arrow */}
        Continue Shopping
      </button>
    </div>
  )
}
export default UserOrders