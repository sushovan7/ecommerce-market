import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { shopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import CartTotals from "../components/CartTotals";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function Cart() {
  const {
    products,
    cartItems,
    currencyType,
    updateQuantity,
    totalProductPrice,
    setTotalProductPrice,
  } = useContext(shopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }

    const totalPrice = tempData.reduce((acc, cartItem) => {
      const product = products.find((product) => product._id === cartItem._id);
      return acc + (product?.price || 0) * cartItem.quantity;
    }, 0);

    setCartData(tempData);
    if (totalPrice !== totalProductPrice) {
      setTotalProductPrice(totalPrice);
    }
  }, [cartItems, products]);

  return (
    <div className="w-full ">
      <hr className="w-full h-[1px] text-gray-600 mb-10" />
      <Title text1={"YOUR"} text2={"CART"} className={"text-3xl"} />
      <div className="w-full flex flex-col items-center  justify-between mt-10">
        {cartData &&
          cartData.length > 0 &&
          cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );
            return (
              <div
                key={index}
                className="flex border-t-2 py-4 items center w-full justify-between"
              >
                <div className="flex w-[80%] relative items-center gap-3 max-h-[8vh] sm:max-h-[20] ">
                  <img
                    src={productData.image?.[0]}
                    alt="image"
                    className="h-full"
                  />
                  <p className="text-gray-600 top-0 right-8 sm:top-[5%] sm:eft-[50%] absolute text-xs">
                    {productData.name}
                  </p>
                  <p className="font-bold">
                    {currencyType}
                    {productData.price}
                  </p>
                  <div className=" border px-2 shadow">{item.size}</div>
                </div>
                <div className="flex w-[20%]  items-center gap-2">
                  <input
                    onChange={(e) =>
                      e.target.value === "" || e.target.value === 0
                        ? null
                        : updateQuantity(
                            item._id,
                            item.size,
                            Number(e.target.value)
                          )
                    }
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    className="max-w-10 max-h-10"
                  />
                  <div
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="h-5"
                  >
                    <img src={assets.bin_icon} alt="" className="h-full" />
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <CartTotals />
      <div
        onClick={() => navigate("/place-order")}
        className="mt-10 flex items-center justify-end"
      >
        <Button text={"PROCEED TO CHECKOUT"}></Button>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
