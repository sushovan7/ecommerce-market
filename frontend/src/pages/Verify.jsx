import { useContext, useEffect } from "react";
import { shopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Verify() {
  const { navigate, setCartItems } = useContext(shopContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const token = localStorage.getItem("token");
  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/order/verifyStripe`,
        { orderId, success },
        {
          headers: {
            token: token,
          },
        }
      );
      if (await response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);
  return <div>VerifyStripe</div>;
}

export default Verify;
