import React,{ useState, useEffect} from "react";
import axios from "axios";
import mapVendorsToProducts from "../utils/mapVendorToProducts";
import VendorDashboard from "./VendorDashboard";
import { Store,LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";


function VendorPage(){
  const [vendor,setVendor] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()


  useEffect(() => {
    
    // getting the vendor info from local storage
    const storedVendor = localStorage.getItem("LoggedInVendor")

    if(storedVendor){
      setVendor(JSON.parse(storedVendor)) // setting vendor info in state
    }
    else{
      setError("Vendor not found")
      setLoading(false)
      return
    }

    // now fetching products
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        // i will add stock based on product id for demo
        const productsWithStock = mapVendorsToProducts(res.data.map(product => ({
          ...product,
          stock: (product.id * 7) % 50 + 1,//this logic with determine stock between 0 to 50
        })));
        setProducts(productsWithStock)
        setLoading(false)
      })
      .catch(err => {
        setError("Failed to load products.")
        setLoading(false)
      })
  }, [])

  const handleLogout = () =>{
    localStorage.removeItem("LoggedInVendor") //clearing vendor info
    navigate("/") // redirecting to role selection page
  }

  if (loading) return <div className="p-6 text-center text-indigo-600">Loading...</div>

  if (error) return <div className="p-6 text-center text-red-600">{error}</div>

  return (
    <div className="container mx-auto p-6 space-y-10">
     <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
      <Store size={32} className="text-green-600" />
      <h1 className="text-3xl font-bold text-gray-800">{vendor.name}</h1>
      </div>
      
      {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
        
     </div>
      <VendorDashboard
      vendor={vendor} setVendor={setVendor}
       products={products} setProducts={setProducts} />
    </div>
  )
}

export default VendorPage