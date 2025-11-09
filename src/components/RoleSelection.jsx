import React from "react";
import { Link } from "react-router-dom";
import { User, Store } from "lucide-react";


function RoleSelection(){
    return(
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
            <h1 className="mt-55 text-4xl font-bold text-gray-800 mb-8 text-center">
                Welcome to ShopVerse
            </h1>
            <div className="flex flex-col sm:flex-row gap-6">
                <Link
                to="/user-signin" className="flex items-center gap-3 bg-white shadow-lg rounded-2xl px-6 py-4 hover:scale-105 transition-transform duration-200">
                    <User className="w-8 h-8 text-blue-600" />
                    <span className="text-lg font-semibold text-gray-700">I am a User</span>
                </Link>

                <Link 
                to="/vendor-login" className="flex items-center gap-3 bg-white shadow-lg rounded-2xl px-6 py-4 hover:scale-105 transition-transform duration-200">
                    <Store className="w-8 h-8 text-green-600" />
                    <span className="text-lg font-semibold text-gray-700">I am a Vendor</span>
                </Link>
            </div>
        </div>
    )
}
export default RoleSelection
