import React from "react";
import Title from "./Title";

function PaymentInput() {
  return (
    <div className="w-full flex flex-col gap-10">
      <Title text1={"DELIVERY"} text2={"INFORMATION"} className={"text-2xl"} />
      <form action="" className="w-full flex flex-col  gap-3">
        <div className="w-full flex items-center gap-2">
          <input
            type="text"
            placeholder="First name"
            required
            className="border border-gray-200 text-gray-600 outline-none rounded px-4 py-1 w-[50%]"
          />
          <input
            type="text"
            placeholder="Last name"
            required
            className="border border-gray-200 text-gray-600 outline-none rounded px-4 py-1 w-[50%]"
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          required
          className="border border-gray-200 text-gray-600 outline-none rounded px-4 py-1 w-full"
        />
        <input
          type="text"
          placeholder="Street"
          className="border border-gray-200 text-gray-600 outline-none rounded px-4 py-1 w-full"
        />
        <div className="w-full flex items-center gap-2">
          <input
            type="text"
            placeholder="City"
            required
            className="border border-gray-200 text-gray-600 outline-none rounded px-4 py-1 w-[50%]"
          />
          <input
            type="text"
            placeholder="State"
            className="border border-gray-200 text-gray-600 outline-none rounded px-4 py-1 w-[50%]"
          />
        </div>
        <div className="w-full flex items-center gap-2">
          <input
            type="number"
            placeholder="Zipcode"
            className="border border-gray-200 text-gray-600 outline-none rounded px-4 py-1 w-[50%]"
          />
          <input
            type="text"
            placeholder="Country"
            required
            className="border border-gray-200 text-gray-600 outline-none rounded px-4 py-1 w-[50%]"
          />
        </div>
        <input
          type="number"
          min={10}
          max={10}
          placeholder="Phone"
          className="border border-gray-200 text-gray-600 outline-none rounded px-4 py-1 w-full"
        />
      </form>
    </div>
  );
}

export default PaymentInput;
