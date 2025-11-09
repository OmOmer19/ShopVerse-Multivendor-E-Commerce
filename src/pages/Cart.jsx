import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";


function Cart(){
    // accessing cart state and dispatch from cartcontext
    const {cartState, cartDispatch} = useCart() 
    const navigate = useNavigate()

    // remove item from cart by dispatching remove from cart action

    const handleRemove = (id) =>{
        cartDispatch({type: "REMOVE_FROM_CART", payload: id})
    }

    //update quantity of cart item by dispatching update quantity action

    const handleQuantityChange = (id,quantity) =>{
        const qty = Number(quantity)
        if(qty < 1) return; //to prevent quantity less than 1
        cartDispatch({type: "UPDATE_QUANTITY", payload: {id,quantity:qty}})
    }

    // if cart is empty
    if(cartState.cartItems.length ===0){
        return (
        <div className="p-6 text-center">
             <p className="mt-15 mb-4 text-lg">Your cart is empty.</p>
             <button onClick={() => navigate("/user/home")}
                className="mt-5 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                    Shop Now
                </button>
             </div>
         )    
    }
    const totalPrice = cartState.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)


    return(
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            <ul>
                {cartState.cartItems.map((item) => (
                    <li key={item.id} className="mb-4 flex items-center gap-4">
                        <img src={item.image}
                             alt= {item.title}
                             className="w-20 h-20 object-contain" />
                        <div className="flex-grow">
                            <h2 className="font-semibold">{item.title}</h2>
                            <p>$ {item.price* item.quantity}</p>
                            <input type="number" min='1' value={item.quantity}
                                   onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                   className="border rounded px-2 py-1 w-20"
                                   />       
                        </div>     
                        <button onClick={() => handleRemove(item.id)}
                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center gap-1"
                                aria-label={`Remove ${item.title} from cart`}>
                                    <Trash2 size={16}/>
                                    Remove
                        </button>
                    </li>
                ))}
            </ul>
            <div className="mt-6 font-semibold text-lg">
                 Total: ${totalPrice.toFixed(2)}
            </div>
             <button
              onClick={() => navigate("/user/home")}
              className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                 >
                  Shop More
              </button>
               {/* Optionally, only show checkout button if cart has items */}
               {cartState.cartItems.length > 0 && (
                 <button
                    onClick={() => navigate("/checkout")}
                    className="mt-4 ml-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                   >
                     Proceed to Order
                    </button>
                   )} 
        </div>
    )
}
export default Cart