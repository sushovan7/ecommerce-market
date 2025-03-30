import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";
import CartTotals from "../components/CartTotals";
import Footer from "../components/Footer";
import NewsLetter from "../components/NewsLetter";
import Title from "../components/Title";
import { shopContext } from "../context/ShopContext";

function PlaceOrder() {
  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const {
    navigate,
    shippingFee,
    cartItems,
    products,
    totalProductPrice,
    setCartItems,
  } = useContext(shopContext);
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "", // Phone is now required
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const generateOrderItems = () => {
    let orderItems = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          const itemInfo = structuredClone(
            products.find((product) => product._id === itemId)
          );
          if (itemInfo) {
            itemInfo.size = size;
            itemInfo.quantity = cartItems[itemId][size];
            orderItems.push(itemInfo);
          }
        }
      }
    }
    return orderItems;
  };

  const createOrderData = (orderItems) => ({
    address: `${formData.street}, ${formData.city}, ${formData.state}, ${formData.country}, ${formData.zipcode}`,
    items: orderItems,
    amount: totalProductPrice + shippingFee,
    phone: formData.phone,
  });

  // Place order via COD or Stripe
  const placeOrder = async (orderData) => {
    setLoading(true);
    try {
      const url =
        method === "cod"
          ? `${import.meta.env.VITE_BACKEND_URL}/order/place`
          : `${import.meta.env.VITE_BACKEND_URL}/order/stripe`;

      const response = await axios.post(
        url,
        { orderData },
        { headers: { token } }
      );

      if (response.data.success) {
        if (method === "cod") {
          setCartItems({});
          setLoading(false);
          navigate("/orders");
          toast.success("Order placed successfully");
        } else {
          window.location.replace(response.data.session_url);
          setLoading(false);
        }
      } else {
        toast.error(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error submitting the order:", error);
      toast.error(error.response?.data?.message || "Failed to place order");
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // Validate phone number
    if (!formData.phone || formData.phone.trim() === "") {
      toast.error("Phone number is required");
      return;
    }

    const orderItems = generateOrderItems();
    const orderData = createOrderData(orderItems);

    placeOrder(orderData);
  };

  return (
    <div className="w-full">
      <hr className="w-full h-[1px] text-gray-600 mb-10" />
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col sm:flex-row sm:justify-between gap-8"
      >
        {/* Delivery Information Section */}
        <div className="sm:w-[50%]">
          <Title text1="DELIVERY" text2="INFORMATION" className="text-2xl" />
          <div className="w-full flex flex-col gap-3 mt-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="First name *"
                required
                className="border border-gray-200 rounded px-4 py-2 w-full"
                name="firstName"
                value={formData.firstName}
                onChange={onChangeHandler}
              />
              <input
                type="text"
                placeholder="Last name *"
                required
                className="border border-gray-200 rounded px-4 py-2 w-full"
                name="lastName"
                value={formData.lastName}
                onChange={onChangeHandler}
              />
            </div>
            <input
              type="email"
              placeholder="Email *"
              required
              className="border border-gray-200 rounded px-4 py-2 w-full"
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
            />
            <input
              type="text"
              placeholder="Street address *"
              required
              className="border border-gray-200 rounded px-4 py-2 w-full"
              name="street"
              value={formData.street}
              onChange={onChangeHandler}
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="City *"
                required
                className="border border-gray-200 rounded px-4 py-2 w-full"
                name="city"
                value={formData.city}
                onChange={onChangeHandler}
              />
              <input
                type="text"
                placeholder="State/Province"
                className="border border-gray-200 rounded px-4 py-2 w-full"
                name="state"
                value={formData.state}
                onChange={onChangeHandler}
              />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="ZIP/Postal code"
                className="border border-gray-200 rounded px-4 py-2 w-full"
                name="zipcode"
                value={formData.zipcode}
                onChange={onChangeHandler}
              />
              <input
                type="text"
                placeholder="Country *"
                required
                className="border border-gray-200 rounded px-4 py-2 w-full"
                name="country"
                value={formData.country}
                onChange={onChangeHandler}
              />
            </div>
            <input
              type="tel"
              placeholder="Phone number *"
              required
              className="border border-gray-200 rounded px-4 py-2 w-full"
              name="phone"
              value={formData.phone}
              onChange={onChangeHandler}
            />
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="sm:w-[50%] flex flex-col gap-8">
          <CartTotals />
          <div className="mt-4">
            <Title text1="PAYMENT" text2="METHOD" />
            <div className="flex flex-col gap-3 mt-4">
              <div
                onClick={() => setMethod("stripe")}
                className={`flex items-center gap-3 p-3 border rounded cursor-pointer ${
                  method === "stripe" ? "border-blue-500 bg-blue-50" : ""
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border ${
                    method === "stripe" ? "bg-blue-500" : "bg-white"
                  }`}
                ></div>
                <img src={assets.stripe_logo} alt="Stripe" className="h-5" />
              </div>
              <div
                onClick={() => setMethod("cod")}
                className={`flex items-center gap-3 p-3 border rounded cursor-pointer ${
                  method === "cod" ? "border-blue-500 bg-blue-50" : ""
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border ${
                    method === "cod" ? "bg-blue-500" : "bg-white"
                  }`}
                ></div>
                <span className="text-gray-700">Cash On Delivery</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors"
            >
              {loading ? "Please wait..." : " Place Order"}
            </button>
          </div>
        </div>
      </form>
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default PlaceOrder;
