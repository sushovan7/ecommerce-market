import React from "react";
import CartTotals from "../components/CartTotals";
import Footer from "../components/Footer";
import Button from "../components/Button";
import PaymentInput from "../components/PaymentInput";
import NewsLetter from "../components/NewsLetter";

function PlaceOrder() {
  return (
    <div className="w-full  ">
      <hr className="w-full h-[1px] text-gray-600 mb-10" />
      <div className="flex w-full flex-col sm:flex sm:flex-row sm:justify-between gap-8">
        <div className="sm:w-[50%">
          <PaymentInput />
        </div>
        <div className="flex sm:w-[50%] flex-col gap-8 items-end">
          <CartTotals />
          <Button text={"PLACE ORDER"} />
        </div>
      </div>
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default PlaceOrder;
