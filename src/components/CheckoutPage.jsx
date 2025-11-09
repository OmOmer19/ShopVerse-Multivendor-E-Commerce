import React,{useState} from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout(){
    const {cartState, cartDispatch} = useCart()
    const navigate = useNavigate()
    
    // form state for user info
    const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  })

  // handle input changes
  const handleChange = (e) =>{
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // calculating total price
  const totalPrice = cartState.cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()

    // Simple validation
    if (!formData.name || !formData.address || !formData.email || !formData.phone) {
      alert("Please fill in all fields")
      return;
    }

    // Creating order data object
    const orderData = {
    items: cartState.cartItems,
    total: totalPrice,
    customer: formData,
    orderDate: new Date().toISOString(),
    id: Date.now(), // simple unique order id
  }

    alert("Order placed successfully! Thank you for shopping.");

    // Clearing cart after order
    cartDispatch({ type: "CLEAR_CART" })

    // Redirecting to home or order confirmation page
    navigate("/orders",{state:{order: orderData}})
  }

  // if cart is empty , back to shop
  if (cartState.cartItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <p>Your cart is empty. Please add items before checkout.</p>
        <button
          onClick={() => navigate("/user/home")}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Shop Now
        </button>
      </div>
    )
  }

  return(
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="address">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="tel"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="font-semibold text-lg">
          Total: ${totalPrice.toFixed(2)}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Place Order
        </button>
      </form>
    </div>
  )
}
export default Checkout;