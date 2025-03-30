import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(orders);

  async function allOrders() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/order/list`,
        {
          headers: {
            token: localStorage.getItem("adminToken"),
          },
        }
      );
      setOrders(response.data.orders.reverse());
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  }

  async function updateOrderStatus(orderId, newStatus) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/order/update-status`,
        { orderId, status: newStatus },
        {
          headers: {
            token: localStorage.getItem("adminToken"),
          },
        }
      );
      if (response.data.success) {
        toast.success("Order status updated");
        allOrders();
      }
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order status");
    }
  }

  useEffect(() => {
    allOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4 md:mb-6">Order Management</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b font-medium">Items</th>
              <th className="p-3 border-b font-medium">Customer Info</th>
              <th className="p-3 border-b font-medium">Amount</th>
              <th className="p-3 border-b font-medium">Payment</th>
              <th className="p-3 border-b font-medium">Date</th>
              <th className="p-3 border-b font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={order.items[0].images[0]}
                      alt={order.items[0].name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{order.items[0].name}</p>
                      <p className="text-sm text-gray-500">
                        {order.items[0].quantity} × ${order.items[0].price}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <p className="text-sm">
                    <span className="font-medium">Phone:</span>{" "}
                    {order.phone || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {order.address.substring(0, 25)}...
                  </p>
                </td>
                <td className="p-3 font-medium">${order.amount}</td>
                <td className="p-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm capitalize">
                      {order.paymentMethod}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.paymentMethod === "cod" || order.payment === false
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {order.paymentMethod === "cod" || order.payment === false
                        ? "Pending"
                        : "Paid"}
                    </span>
                  </div>
                </td>
                <td className="p-3 text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order._id, e.target.value)
                    }
                    className={`px-3 py-1 rounded text-sm ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out For Delivery">Out For Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile List */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <img
                  src={order.items[0].images[0]}
                  alt={order.items[0].name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium">{order.items[0].name}</h3>
                  <p className="text-sm text-gray-500">
                    {order.items[0].quantity} × ${order.items[0].price}
                  </p>
                </div>
              </div>
              <span className="text-sm font-medium">${order.amount}</span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-600">
                  <span className="font-medium">Phone:</span>{" "}
                  {order.phone || "N/A"}
                </p>
                <p className="text-gray-600 truncate">
                  <span className="font-medium">Address:</span>{" "}
                  {order.address.substring(0, 20)}...
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Payment:</span>
                  <span
                    className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                      order.paymentMethod === "cod" || order.payment === false
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.paymentMethod === "cod" || order.payment === false
                      ? "Pending"
                      : "Paid"}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                className={`px-2 py-1 rounded text-xs ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-800"
                    : order.status === "Cancelled"
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <button
                onClick={() => {
                  /* View details action */
                }}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && !isLoading && (
        <div className="text-center py-8 text-gray-500">No orders found</div>
      )}
    </div>
  );
}

export default Orders;
