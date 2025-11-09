import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { vendors } from "../utils/vendors";


function VendorLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

   const handleLogin = (e) => {
    e.preventDefault();// Prevent default form reload
    
    // finding vendor matching his email and password that i have created for demo
    const vendor = vendors.find(
      (v) => v.email === email && v.password === password
    )
    if(vendor){
      console.log("Vendor Logged In",vendor.name)
      localStorage.setItem("LoggedInVendor", JSON.stringify(vendor)) // we will save vendor info in local storage
      navigate("/vendor-dashboard") // Redirect to vendor dashboard after login
    }
    else{
      alert("Invalid email or password")
    }
    
  }

  return(
     <div className="flex justify-center items-center min-h-screen bg-gray-200">
      {/* Card container */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* Page title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Vendor Login
        </h2>

        {/* Login form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email field */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <Mail className="text-gray-500 mr-2" size={20} />
            <input
              type="email"
              placeholder="Enter your vendor email"
              className="w-full outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password field */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <Lock className="text-gray-500 mr-2" size={20} />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default VendorLogin