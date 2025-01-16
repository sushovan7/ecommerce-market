import React from "react";

function AddProduct() {
  return (
    <div className=" flex flex-col gap-4 text-gray-600">
      <div className="flex flex-col gap-3">
        <h1 className=" font-semibold">Upload image:</h1>
        <div className="flex items-center gap-2">
          <div className="w-28 h-28 border overflow-hidden">
            <img src="" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="w-28 h-28 border overflow-hidden">
            <img src="" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="w-28 h-28 border overflow-hidden">
            <img src="" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="w-28 h-28 border overflow-hidden">
            <img src="" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className=" font-semibold">Product name:</h1>
        <input
          type="text"
          placeholder="Product name"
          className="border outline-none px-3 py-3 text-lg"
        />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className=" font-semibold">Product description:</h1>
        <textarea
          type=""
          placeholder="Product description"
          className="border outline-none px-3 py-3 text-lg"
        />
      </div>
      <div className="flex items-center justify-center  gap-8">
        <div className="flex flex-col  gap-3">
          <h1 className=" font-semibold">Product category:</h1>
          <select className="outline-none border px-2 py-2">
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className=" font-semibold">Product sub-category:</h1>
          <select className="outline-none border px-2 py-2">
            <option value="topwear">Topwear</option>
            <option value="bottomwear">Bottomwear</option>
            <option value="winterwear">Witerwear</option>
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className=" font-semibold">Product price:</h1>
          <input
            type="number"
            placeholder="20"
            className="border outline-none px-2 py-2"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className=" font-semibold">Product size:</h1>
        <div className="flex items-center gap-2">
          {["S", "M", "L", "XL", "XXL"].map((item, i) => {
            return (
              <div key={i} className="bg-gray-200 text-black px-3 py-2">
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex  gap-3">
        <h1 className=" font-semibold">Add to bestseller:</h1>
        <input type="checkbox" />
      </div>
      <div className="flex items-center ">
        <button className="bg-gray-900 rounded-lg text-lg font-bold text-white px-12 py-4">
          Add
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
