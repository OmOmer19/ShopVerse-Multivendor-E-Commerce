import React, { createContext, useContext, useEffect, useState } from "react";

// creating the context object
const VendorAuthContext = createContext()

// provider component that will wrap the app
export function VendorAuthProvider({children}){

    const [vendor, setVendor] = useState(null) // this will hold vendor object when logged in
    const [loading, setLoading] = useState(true)
    
     // onmount check if vendor info is in local storage with key vendorAuth  
    useEffect(() => {
    const storedVendor = localStorage.getItem("vendorAuth");
    if (storedVendor) {
      // we will parse json safely
      try{
        setVendor(JSON.parse(storedVendor))
      }
      catch(err){
        // if parse fails , we will remove corrupted value and log the error
        console.log("Failed to parse vendorAuth from localStorage")
        localStorage.removeItem("vendorAuth")
      }
    }
    setLoading(false)
  }, [])

    useEffect(() =>{
        if(vendor){
          // if vendor exists , we will save it
            localStorage.setItem("vendorAuth",JSON.stringify(vendor))
        }
        else{
            localStorage.removeItem('vendorAuth')
        }
    },[vendor]) // this runs whenever vendor will change
    

    // login function(setting vendor)
    const loginVendor = (vendorData) => {
    setVendor(vendorData)
  }
    // logout function (clearing vendor)
     const logoutVendor = () => {
      setVendor(null)
  }

  return(
    <VendorAuthContext.Provider value={{vendor,loginVendor,logoutVendor, loading}}>
        {children}
    </VendorAuthContext.Provider>
  )
}

// this is helper hook to access the vendor auth context easily
export function useVendorAuth(){
    return useContext(VendorAuthContext)
}
