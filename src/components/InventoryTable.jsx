import React, { useEffect, useState } from "react";


function InventoryTable({products,setProducts}){
    
    //filter sort and pagination states
    const [searchTerm, setSearchTerm] = useState("")
    const [sortConfig, setSortConfig] = useState({ key: "title", direction: "asc" })
    const [currentPage,setCurrentPage] = useState(1)

    const itemsPerPage = 5


    function handleSort(key){
        // toggleing direction if same key is clicked twice
        setSortConfig((prev) => {
            const direction = prev.key ===key && prev.direction ==='asc' ? 'desc' : 'asc'
            return {key, direction}
        })
        // resetting page to first when sort occurs
        setCurrentPage(1)
    }
    // applying sorting
    const sortedProducts = [...products].sort((a,b) =>{
        const key = sortConfig.key

        // sort for price
        if(key==='price'){
            if(sortConfig.direction === 'asc'){
                return Number(a.price) - Number(b.price)
            }
            else{
                return Number(b.price) - Number(a.price)
            }
        }
        // sort for title
        if(key === 'title'){
            const aValue = String(a.title).toLowerCase()
            const bValue = String(b.title).toLowerCase()

            if(sortConfig.direction === 'asc'){
                return aValue.localeCompare(bValue)
            }
            else{
                return bValue.localeCompare(aValue)
            }
        }
        // if key is not title or price 
        return 0 // we will keep order unchanged
    })

    // search filtering

    const filteredProducts = sortedProducts.filter((p) => 
        p.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
    )

    // pagination

    const totalItems = filteredProducts.length // total after filter
    const totalPages = Math.max(1,Math.ceil(totalItems/itemsPerPage))

    //few edge cases
    useEffect(() =>{
    if(currentPage> totalPages){
        setCurrentPage(totalPages)
    }
    else if(currentPage < 1){
        setCurrentPage(1)
    }    
    },[currentPage,totalPages])


    const startIndex = (currentPage-1)* itemsPerPage 
    const pageItems = filteredProducts.slice(startIndex,startIndex+itemsPerPage) // items for curr page

    // inline stock edit handler
    
    function handleStockChange(id,value){
        const newStock = Math.max(0, Math.floor(Number(value) || 0))
        
        //updating the specific products stock in local state immutably
        setProducts((prev) => prev.map((p) => (p.id === id? {...p,stock:newStock} : p)))
    }

    // now main rendering
    return(
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Inventory Management</h2>
                
                <div className="flex items-center gap-2">
                <input type="text"
                       aria-label="Search products by title"
                       placeholder="Search products..."
                       value={searchTerm}
                       onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setCurrentPage(1)
                       }} 
                       className="w-full md:w-72 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />    
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th scope="col" className="px-4 py-3 text-left text-sm font-medium cursor-pointer select-none"
                            onClick={() => handleSort("title")}>
                                <div className="flex items-center gap-2">
                                    <span>Product</span>
                                    {sortConfig.key === 'title' ? (
                                        <span className="text-xs">
                                            {sortConfig.direction==="asc" ? "▲" : "▼"}
                                        </span>
                                    ) : null}
                                </div>
                            </th>

                            <th
                            scope="col"
                            className="px-4 py-3 text-left text-sm font-medium cursor-pointer select-none"
                            onClick={() => handleSort("price")}>
                                <div className="flex items-center gap-2">
                                    <span>Price</span>
                                    {sortConfig.key === 'price' ? (
                                        <span className="text-xs">
                                            {sortConfig.direction === "asc" ?  "▲" : "▼" }
                                        </span>
                                    ): null}
                                </div>
                            </th>

                            <th scope="col" className="px-4 py-3 text-left text-sm font-medium">
                                Stock
                            </th>

                            <th scope="col" className="px-4 py-3 text-left text-sm font-medium">
                                Vendor
                            </th>

                            <th scope="col" className="px-4 py-3 text-left text-sm font-medium">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-100">
                        {pageItems.length === 0 ? (
                            <tr>
                                <td className="px-4 py-6 text-center text-gray-500">
                                    No products found
                                </td>
                            </tr>
                        ) : (
                            pageItems.map((item) => (
                                // highlighting if stock is below threshold i am taking as 5
                                <tr key={item.id}
                                className={item.stock<5 ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'}>
                                    {/* Product cell: image + title */}
                                    <td className="px-4 py-4 whitespace-nowrap flex items-center gap-3">
                                        <img src={item.image} alt={item.title} className="w-12 h-12 object-contain rounded" />
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {item.title}
                                            </div>
                                            <div className="text-xs text-gray-500">{item.category}</div>
                                        </div>
                                    </td>

                                    {/* Price cell */}
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                                        ${item.price.toFixed(2)}
                                    </td>
                                    
                                    {/* Stock cell with inline editable number */}
                                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                                        <div className="flex items-center gap-2">
                                            <input type="number" min="0" value={item.stock}
                                            onChange={(e) => handleStockChange(item.id,e.target.value)}
                                            className={`w-20 px-2 py-1 border rounded-md text-sm focus:outline-none ${item.stock<5 ? 'border-red-400 bg-red-50': 'border-gray-200'}`}
                                            aria-label={`Stock for ${item.title}`} />

                                            {/* Low-stock badge */}
                                            {item.stock < 5 ? (
                                                <span className="text-xs px-2 py-0.5 bg-red-100 text-red-800 rounded-full">
                                                    Low
                                                </span>
                                            ) : (
                                                <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                                                    OK
                                                </span>
                                            )}
                                        </div>
                                    </td>

                                    {/* Vendor name */}
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {item.vendor?.name || "-"}
                                    </td>

                                    {/* Actions: placeholder buttons for Manage / Edit */}
                                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => {alert (`Opening manage section for Product ID ${item.id}`)}}
                                                className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                                                    Manage
                                                </button>
                                                
                                            {/* Quick inline edit*/}
                                            <button onClick={() => {alert(`Quick edit for ${item.title}`)}}
                                                className="px-2 py-1 border rounded-md text-sm hover:bg-gray-50">
                                                    Edit
                                                </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer: pagination controls & summary */}
            <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="text-sm text-gray-600">
                    Showing <span className="font-medium">{startIndex+1}</span> -{" "}
                    <span className="font-medium"> {Math.min(startIndex+ pageItems.length, totalItems)}</span>
                    of <span className="font-medium">{totalItems}</span>
                </div>

            {/* Pagination controls */}
            <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md border disabled:opacity-50"
            aria-label="First page"
          >
            {"<<"}
          </button>

          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md border disabled:opacity-50"
            aria-label="Previous page"
          >
            Prev
          </button>

          <span className="px-3 py-1 border rounded-md">
            Page <strong>{currentPage}</strong> / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md border disabled:opacity-50"
            aria-label="Next page"
          >
            Next
          </button>

          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md border disabled:opacity-50"
            aria-label="Last page"
          >
            {">>"}
          </button>
        </div>
        </div>
        </div>
    )

}
export default InventoryTable