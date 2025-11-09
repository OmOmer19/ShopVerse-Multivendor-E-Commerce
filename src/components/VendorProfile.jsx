import React,{useState} from "react";

function VendorProfile({ vendor, onUpdateVendor }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: vendor.name || "",
        email: vendor.email || "",
        phone: vendor.phone || "",
        address: vendor.address || "",
  })

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleCancel(){
    setFormData({
    name: vendor.name || "",
    email: vendor.email || "",
    phone: vendor.phone || "",
    address: vendor.address || "",
  });
  setIsEditing(false)
  }

  function handleSave(e) {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim()) {
      alert("Name is required");
      return;
    }
    if (!formData.email.trim()) {
      alert("Email is required");
      return;
    }
    
    // we will  Call prop callback to update vendor info in parent state
    onUpdateVendor({
      ...vendor,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
    });

    setIsEditing(false);
  }

   if (!vendor) return <div>Loading vendor info...</div>


  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
      <h2 className="text-xl font-semibold mb-4">Vendor Profile</h2>
      
      {!isEditing ? (
        <>
      <p><strong>Name:</strong> {vendor.name}</p>
      <p><strong>Email:</strong> {vendor.email}</p>
      <p><strong>Phone:</strong> {vendor.phone || "-"}</p>
      <p><strong>Address:</strong> {vendor.address || "-"}</p>
      
      <button onClick={() => setIsEditing(true)}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Edit Profile
        </button>
        </>
      ) : (
        <form onSubmit={handleSave}>
          <div className="mb-3">
            <label className="block font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium mb-1" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium mb-1" htmlFor="address">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows={3}
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      
    </div>
  )
}

export default VendorProfile;
