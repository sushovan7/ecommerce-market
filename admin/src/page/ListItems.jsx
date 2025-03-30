import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ListItems() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/product/list-products`
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    }
  }

  async function removeProduct(id) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/product/remove-product`,
        { id },
        {
          headers: {
            token: localStorage.getItem("adminToken"),
          },
        }
      );
      if (response.data.success) {
        toast.success("Product deleted successfully");
        await getProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4 md:mb-6">All Products</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b font-medium">Image</th>
              <th className="p-3 border-b font-medium">Name</th>
              <th className="p-3 border-b font-medium">Category</th>
              <th className="p-3 border-b font-medium">Price</th>
              <th className="p-3 border-b font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={item.images?.[0]}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-3 font-medium">{item.name}</td>
                <td className="p-3 text-gray-600 capitalize">
                  {item.category}
                </td>
                <td className="p-3">${item.price}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => removeProduct(item._id)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                    aria-label="Delete product"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile List */}
      <div className="md:hidden space-y-4">
        {products.map((item) => (
          <div key={item._id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex gap-4">
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <div className="flex justify-between mt-1 text-sm text-gray-600">
                  <span className="capitalize">{item.category}</span>
                  <span>${item.price}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => removeProduct(item._id)}
                className="text-red-500 hover:text-red-700 px-3 py-1 text-sm rounded hover:bg-red-50 transition-colors flex items-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-8 text-gray-500">No products found</div>
      )}
    </div>
  );
}

export default ListItems;
