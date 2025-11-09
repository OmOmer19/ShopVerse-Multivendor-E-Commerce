import React, { useEffect, useState } from "react";

function VendorOrders({vendorId}){
    
    const [orders,setOrders] = useState([])

    useEffect(() => {
        
        // this is dummy data for example
        const dummyOrders = [
            {id:101, customer:"Aman", status:'Pending',total:'120.5'},
            {id: 102, customer: "Bob", status: "Shipped", total: 75.0}
        ]
        setOrders(dummyOrders)
    },[vendorId])

    if(orders.length === 0){
        return <div>No Orders found</div>
    }

    return (
    <table className="min-w-full divide-y divide-gray-200 border">
      <thead className="bg-indigo-600 text-white">
        <tr>
          <th className="px-4 py-3 text-left text-sm font-medium">Order ID</th>
          <th className="px-4 py-3 text-left text-sm font-medium">Customer</th>
          <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
          <th className="px-4 py-3 text-left text-sm font-medium">Total</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-100">
        {orders.map((order) => (
          <tr key={order.id} className="hover:bg-gray-50">
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{order.id}</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{order.customer}</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{order.status}</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">${order.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default VendorOrders