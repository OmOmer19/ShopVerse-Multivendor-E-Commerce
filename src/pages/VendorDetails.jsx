import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import axios from "axios";
import mapVendorsToProducts from "../utils/mapVendorToProducts";
import ProductCard from "../components/ProductCard";
import { Store,ArrowLeft } from "lucide-react";


function VendorDetails(){
    const {vendorId} = useParams() // this extracts vendor id from the URL
    const [vendorProducts,setVendorProducts] = useState([])
    const [vendorInfo, setVendorInfo] = useState(null)
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(null)

    useEffect(() =>{
        axios.get("https://fakestoreapi.com/products")
        .then((res) =>{
            // adding vendor info to each products
            const productsWithVendors = mapVendorsToProducts(res.data)
            // filtering products according to the vendor's id from the url
            const filtered = productsWithVendors.filter(
                (p) => p.vendor.id.toString() === vendorId
             )
             // saving filtered products to state
             setVendorProducts(filtered)

             // setting vendor info
             if(filtered.length >0){
                setVendorInfo(filtered[0].vendor)
             }
             // stopping the loading
             setLoading(false)
        })
        .catch((err) => {
            setError("Failed to load Products. please try again.")
            console.log("error fetching",err)
            setLoading(false)
        })
    },[vendorId])
    
    if(loading){
        return(
            <div className="text-center py-10 text-blue-600 text-xl">
                Loading Vendor Products...
            </div>
        )
    }
    if(error){
        return(
            <div className="text-center py-10 text-red-500 text-xl">
                {error}
            </div>
        )
    }
    

    return(
        <div className="p-6">
            
            <Link to='/' className="inline-flex items-center gap-2 text-indigo-600 hover:underline mb-6">
             <ArrowLeft size={18} /> Back to Products
            </Link>

            {vendorInfo && (
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="bg-indigo-600 p-3 rounded-full">
                            <Store size={32} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                {vendorInfo.name}
                            </h1>
                            <p className="text-gray-600">
                                "Trusted seller with top quality products."
                            </p>
                        </div>        
                    </div>
                </div>
            )}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Products from {vendorInfo?.name}
            </h2>
            
            {vendorProducts.length > 0 &&
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {vendorProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            }
        </div>
    )
}

export default VendorDetails;