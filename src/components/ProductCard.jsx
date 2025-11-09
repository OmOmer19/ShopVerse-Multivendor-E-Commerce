import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag,Store } from "lucide-react";
import { useCart } from "../context/CartContext";


// this is react functional component it will use destructuring to extract the product prop directly from the props object

const ProductCard =({product}) =>{
  console.log("rendering product card for:",product.id)
  
  const {cartDispatch} = useCart(); // get the dispatch function
  
  const handleAddToCart = () => {
    // dispatch add to cart action with product as payload
    cartDispatch({type: "ADD_TO_CART", payload: product})
  }

  return(
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-out">
      <div className="flex justify-center items-center h-48 mb-4">
        <img src={product.image}
             alt={product.title}
             className="h-full object-contain" />
      </div>
      <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
        {product.title}
      </h2>

      <p className="text-indigo-600 pl-3 font-bold text-xl mb-4">
        $ {product.price}
      </p>

      <div className="flex items-center gap-2 mb-4">
        <Store className="text-indigo-500" size={20} />
          <Link to={`/vendor/${product.vendor.id}`} className="text-indigo-600 hover:underline">
              {product.vendor.name}
          </Link>
      </div>
      <button className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={handleAddToCart}>
        <ShoppingBag size={18} />
        Add to Cart
      </button>
    </div>
  )
}
export default ProductCard