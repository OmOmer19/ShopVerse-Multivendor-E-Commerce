import React, { useState } from "react";
import InventoryTable from "./InventoryTable";

function VendorProducts({products, setProducts, vendorId}){
    
    const [showForm, setShowForm] = useState(false)
    const [newProduct, setNewProduct] = useState({
        title:'',
        price:'',
        stock: '',
        category:'',
        image:''
    })
    
    // filtering products by vendor id
    const vendorProducts = products.filter(
        (product) => product.vendor?.id === vendorId
    )
    
    //handle form input change
    function handleChange(e){
        const{ name,value} = e.target;
        setNewProduct((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    //handle form submit
    function handleSubmit(e){
        e.preventDefault();
    

    if (!newProduct.title.trim()) {
      alert("Please enter product title");
      return;
    }
    if (!newProduct.price || isNaN(newProduct.price) || Number(newProduct.price) < 0) {
      alert("Please enter valid price");
      return;
    }
    if (!newProduct.stock || isNaN(newProduct.stock) || Number(newProduct.stock) < 0) {
      alert("Please enter valid stock");
      return;
    }
    if (!newProduct.category.trim()) {
      alert("Please enter category");
      return;
    }
    if (!newProduct.image.trim()) {
      alert("Please enter image URL");
      return;
    }
    
    // now will create new product object with the help of vendor info
    const newProdObj = {
      id: Date.now(), // simple unique id
      title: newProduct.title.trim(),
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      category: newProduct.category.trim(),
      image: newProduct.image.trim(),
      vendor: { id: vendorId, name: vendorProducts[0]?.vendor?.name || "Vendor" }, // add vendor info
    }
    
    //then will add new product to products
    setProducts((prev) => [...prev, newProdObj])

    // resetting form and hide it
    setNewProduct({
      title: "",
      price: "",
      stock: "",
      category: "",
      image: "",
    })
    setShowForm(false)
}

    return(
        <div>
            <h3 className="text-lg font-semibold mb-4">
                Your Products
            </h3>
            {/* Add Product Button */}
      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        {showForm ? "Cancel" : "Add New Product"}
      </button>

      {/* Add Product Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 p-4 border rounded bg-white max-w-md"
        >
          <div className="mb-3">
            <label className="block mb-1 font-medium" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              value={newProduct.title}
              onChange={handleChange}
              type="text"
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1 font-medium" htmlFor="price">
              Price ($)
            </label>
            <input
              id="price"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              type="number"
              step="0.01"
              min="0"
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1 font-medium" htmlFor="stock">
              Stock
            </label>
            <input
              id="stock"
              name="stock"
              value={newProduct.stock}
              onChange={handleChange}
              type="number"
              min="0"
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1 font-medium" htmlFor="category">
              Category
            </label>
            <input
              id="category"
              name="category"
              value={newProduct.category}
              onChange={handleChange}
              type="text"
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1 font-medium" htmlFor="image">
              Image URL
            </label>
            <input
              id="image"
              name="image"
              value={newProduct.image}
              onChange={handleChange}
              type="url"
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Product
          </button>
        </form>
      )}

      <InventoryTable products={vendorProducts} setProducts={setProducts} />
        </div>
    )
}
export default VendorProducts