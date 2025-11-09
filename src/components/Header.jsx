import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, User } from "lucide-react";
import { useVendorAuth } from "../context/VendorAuthContext";


function Header(){
    // get cartItems from cart context state
    const {
        cartState: {cartItems}
    } = useCart()

    const totalItems = cartItems.reduce((acc,item) => acc+ item.quantity, 0)
    
    const { vendor } = useVendorAuth();
    const navigate = useNavigate();
    const location = useLocation() // getting the path

    const handleVendorClick = () => {
      if (vendor && vendor.id) {
        navigate(`/vendor-page/${vendor.id}`);
      } else {
        navigate("/vendor-login");
     }
    }

    const showCartIcon = location.pathname.startsWith("/user/home")

    return (
        <header className="bg-indigo-600 text-white p-4 flex justify-between items-center">
            
            <Link to='/' className="text-2xl font-bold">
            ShopVerse
            </Link>

            <nav className="flex items-center gap-6">
                {showCartIcon && (
                <Link to='/cart' className="relative flex items-center text-white hover:text-gray-200"
                   aria-label="View Cart">
                    <ShoppingCart size={24} />

                    {totalItems >0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 rounded-full text-xs h-5 flex items-center justify-center font-bold pointer-events-none">
                            {totalItems}
                        </span>
                    )}
                   </Link>
                )}
            </nav>
        </header>
    )
}
export default Header