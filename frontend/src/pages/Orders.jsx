import { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/ShopContext";
import Title from "../components/Title";
import Footer from "../components/Footer";
import NewsLetter from "../components/NewsLetter";
import axios from "axios";

function Orders() {
  const { currencyType } = useContext(shopContext);
  const token = localStorage.getItem("token");

  const [orderData, setOrderData] = useState([]);

  const loadOrderdata = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/order/userorders`,

        {
          headers: {
            token: token,
          },
        }
      );

      if (response.data.success) {
        let allOrderedItems = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["data"] = order.date;
            allOrderedItems.push(item);
          });
        });
        setOrderData(allOrderedItems.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderdata();
  }, [token]);
  return (
    <>
      <div className="boredr-t pt-16">
        <div className="text-2xl">
          <Title text1={"My"} text2={"Orders"} />
        </div>
        <div>
          {orderData.map((item, i) => (
            <div
              key={i}
              className="py-4 border-t boredr-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img src={item.images[0]} alt="" className="w-16 sm:w-20" />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray">
                    <p className="text-lg">
                      {currencyType}
                      {item.price}
                    </p>
                    <p>Quantity : {item.quantity}</p>
                    <p>Size : {item.size}</p>
                  </div>
                  <p className="mt-1">
                    Date:{" "}
                    <span className="text-gray-400">
                      {new Date(item.createdAt).toDateString()}
                    </span>
                  </p>
                  <p className="mt-1">Payment: {item.paymentMethod}</p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  {" "}
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button
                  onClick={loadOrderdata}
                  className="border px-4 py-2 text-sm font-medium ronded-sm"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <NewsLetter />
      <Footer />
    </>
  );
}

export default Orders;
