import { vendors } from "./vendors"

// this logic will assign vendors round robin to products

 const mapVendorsToProducts = (products) =>{
    return products.map((product,index) => {
        const vendor = vendors[index % vendors.length]
        return {...product,vendor}
    })
}
export default mapVendorsToProducts