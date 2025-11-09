import React,{useState} from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

function UserSignIn(){
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignIn  = (e) =>{
        e.preventDefault()
        console.log("User Email", email)
        console.log("User Password", password)

        navigate("/user/home")
    }
  return(
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      {/* Card container */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* Page title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          User Sign In
        </h2>

        {/* Sign-in form */}
        <form onSubmit={handleSignIn} className="space-y-5">
          {/* Email field */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <Mail className="text-gray-500 mr-2" size={20} />
            <input
              type="email"
              placeholder="Enter your email"
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
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
export default UserSignIn