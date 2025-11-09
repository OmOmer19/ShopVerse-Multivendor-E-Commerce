import React, { useEffect, useState } from "react";
import axios from 'axios'
import mapVendorsToProducts from "../utils/mapVendorToProducts";
import ProductCard from "../components/ProductCard";
import {Store, LogOut} from 'lucide-react'; // for store icon
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";


function Home(){
   
    const[products,setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showFilters,setShowFilters] = useState(false)
    const navigate = useNavigate() // to redirect user to sign out
    const {cartDispatch} = useCart() // get cartDispatch from cartContext

    // filter states
    //for vendors
    const [selectedVendors,setSelectedVendors] = useState([])
    // for price range
    const [priceRange,setPriceRange] = useState([0,1000]) // example range
    // min rating 
    const [minRating, setMinRating] = useState(0)
    // all unique vendors extracted from products for filter options
    const [allVendors, setAllVendors] = useState([])

    const handleSignOut = () =>{
        //clearing the cart before loggin out
        cartDispatch({type: "CLEAR_CART"})
        
       navigate("/") // navigate to role selection
    }


    useEffect(() =>{
        axios.get('https://fakestoreapi.com/products')
        .then((response) => {
            const fetchedProducts = response.data;
            const productsWithVendors = mapVendorsToProducts(fetchedProducts)
            //updating states
            setProducts(productsWithVendors)
            setLoading(false)

            //extracting unique vendors from products for filter checkboxes
            const vendors = []
            const vendorIds = {} // to track added vendor ids

            productsWithVendors.forEach((product) => {
                // only adding one vendor if not already added
                if(!vendorIds[product.vendor.id]){
                    vendors.push(product.vendor)
                    vendorIds[product.vendor.id] = true // marking as added
                }
            })
            setAllVendors(vendors)

        })
        .catch((err) =>{
            setError("Failed to fetch the products.")
            console.log("Error Fetching",err)
            setLoading(false)
        })
    },[])
    
    //handle for toggling vendor checkbox
    const handleVendorChange = (vendorId) =>{
        if(selectedVendors.includes(vendorId)){
            // removing vendor if already selected
            setSelectedVendors(selectedVendors.filter((id) => id!== vendorId))
        }
        else{
            // adding vendor to selected list
            setSelectedVendors([...selectedVendors,vendorId])
        }
    }

    // handle for changing price range 
     const handlePriceChange = (event) => {
        //assuming min price and max price
        const value = Number(event.target.value)
        setPriceRange([priceRange[0],value])
     }

    // handler for changing minimum rating filter
    const handleRatingChange = (event) =>{
        const value = Number(event.target.value)
        setMinRating(value)
    }

    //filter products based on selected filters
    const filteredProducts = products.filter((product) =>{
        // show all if none selected
        if(selectedVendors.length > 0 && !selectedVendors.includes(product.vendor.id.toString())){
            return false
        }
        // price filter
        if(product.price < priceRange[0] || product.price > priceRange[1]){
            return false
        }
        // rating filter 
        if(product.rating?.rate < minRating){
            return false
        }
        // if product passes all filters then we will show it
        return true
    })

    //if loading 
    if(loading){
        return(
            <div className="text-center py-10 text-blue-600 text-xl">
                Loading Products...
            </div>
        )
    }
    // if error
    if(error){
        return(
            <div className="text-center py-10 text-red-500 text-xl">
                {error}
            </div>
        )
    }

    return(
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold mb-6 gap-2 flex items-center">
                <Store size={28} className="text-indigo-600" />
                Products
            </h1>

            <div className="flex gap-4">
            <button onClick={() => navigate("/orders")}
               className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition" >
                My Orders
               </button>

            <button onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
               Sign Out <LogOut size={18} />
            </button>
            </div>
            </div>

            <button onClick={() => setShowFilters(!showFilters)}
                className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                    {showFilters ? "Hide Filters" : " Show Filters"}
                </button>
            
            {showFilters && (
            <div className="mb-8 border p-4 rounded-lg bg-indigo-50">
                <h2 className="font-semibold mb-2">Filters</h2>

                <div className="mb-4">
                    <h3 className="font-semibold">Vendors</h3>
                    <div className="flex flex-wrap gap-4 mt-2">
                        {allVendors.map((vendor) => (
                            <label key={vendor.id} className="flex items-center gap-1">
                                <input type="checkbox"
                                       checked={selectedVendors.includes(vendor.id.toString())}
                                       onChange={() => handleVendorChange(vendor.id.toString())}
                                 />
                                 <span>{vendor.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className="font-semibold">
                        Max Price: ${priceRange[1].toFixed(1)}
                    </h3>
                    <input type="range"
                           min={0}
                           max={Math.max(...products.map((p) => p.price))}
                           value={priceRange[1]}
                           onChange={handlePriceChange}
                           step={1}
                           className="w-full"
                            />
                </div>

                <div>
                    <h3 className="font-semibold">Minimum Rating</h3>
                    <select value={minRating} onChange={handleRatingChange} className="border rounded px-2 py-1">
                        <option value={0}>All Ratings</option>
                        <option value={1}>1 star & up</option>
                        <option value={2}>2 stars & up</option>
                        <option value={3}>3 stars & up</option>
                        <option value={4}>4 stars & up</option>
                        <option value={5}>5 stars only</option>
                    </select>
                </div>
            </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
                ): (
                    <p className="text-gray-500">No products matches the selected filters</p>
                )}
            </div>
        </div>
    )
}
export default Home;