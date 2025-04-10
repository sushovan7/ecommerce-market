import { useContext } from "react";
import Title from "./Title";
import { shopContext } from "../context/ShopContext";

function CartTotals() {
  const { currencyType, shippingFee, totalProductPrice } =
    useContext(shopContext);
  return (
    <div className="w-full sm:flex sm:justify-end   mt-20 ">
      <div className="sm:w-[40%] sm:flex sm:flex-col  ">
        <Title text1={"CART"} text2={"TOTALS"} className={"text-3xl"} />
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between mt-4">
            <p>Subtotal</p>
            <p>
              {currencyType}
              {Number(totalProductPrice)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p>Shipping Fee</p>
            <p>
              {currencyType}
              {totalProductPrice > 0 ? shippingFee : 0}
            </p>
          </div>
          <div className="flex items-center justify-between font-bold">
            <p>Total</p>
            <p>
              {currencyType}
              {totalProductPrice > 0
                ? totalProductPrice + Number(shippingFee)
                : 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartTotals;
