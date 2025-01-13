import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/ShopContext";
import Card from "./Card";
import { assets } from "../assets/assets";

function Filters() {
  const { products, inputValue } = useContext(shopContext);
  const [filteredProducts, setFilterProducts] = useState([]);
  const [showFilter, setShowFilteres] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortBy, setSortBy] = useState("relavent");

  function toggleCategory(e) {
    if (category.includes(e.target.value)) {
      setCategory(category.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  }
  function toggleSubCategory(e) {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(subCategory.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  }

  function applyFilter() {
    let productsCopy = products.slice();
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    if (inputValue && inputValue.trim().length >= 3) {
      const searchValue = inputValue.toLowerCase().trim();
      productsCopy = productsCopy.filter((item) => {
        return (
          (item.name && item.name.toLowerCase().includes(searchValue)) ||
          (item.category &&
            item.category.toLowerCase().includes(searchValue)) ||
          (item.subCategory &&
            item.subCategory.toLowerCase().includes(searchValue))
        );
      });
    }
    setFilterProducts(productsCopy);
  }

  function sortProducts() {
    let sortCopy = filteredProducts.slice();
    switch (sortBy) {
      case "low-to-high":
        setFilterProducts(sortCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-to-low":
        setFilterProducts(sortCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    setFilterProducts(products);
  }, []);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, inputValue]);

  useEffect(() => sortProducts(), [sortBy]);

  return (
    <div className="w-full relative  min-h-screen">
      <hr className="w-full  h-[1px] text-gray-600" />

      <div className="flex  w-full justify-between items-center mt-10">
        <h1
          onClick={() => setShowFilteres((prev) => !prev)}
          className="text-2xl font-bold font-mono flex gap-4 items-center"
        >
          FILTERS{" "}
          <span className="sm:hidden">
            <img src={assets.dropdown_icon} alt="" width={"15px"} />
          </span>
        </h1>

        <select
          onChange={(e) => setSortBy(e.target.value)}
          className="outline-none py-2 px-5 border border-x-gray-600"
          name="sortOptions"
        >
          <option value="relavent"> Sort by: Relavant</option>
          <option value="low-to-high">Sort by: Low to High</option>
          <option value="high-to-low">Sort by: High To Low</option>
        </select>
      </div>

      <div className="w-full flex flex-col  sm:flex sm:flex-row gap-10 mt-10">
        <div
          className={`sm:w-auto md:w-[27%] sm:flex  flex flex-col gap-5 ${
            showFilter ? "block" : "hidden"
          } `}
        >
          <div className="border w-full px-10 py-6 border-gray-600 flex flex-col gap-2">
            <h1 className="text-md mb-1 font-bold">CATEGORIES</h1>
            <div className=" flex gap-2">
              <input onChange={toggleCategory} type="checkbox" value={"Men"} />
              Men
            </div>
            <div className=" flex gap-2">
              <input
                onChange={toggleCategory}
                type="checkbox"
                value={"Women"}
              />
              Women
            </div>
            <div className=" flex gap-2">
              <input onChange={toggleCategory} type="checkbox" value={"Kids"} />
              Kids
            </div>
          </div>
          <div className="border w-full px-10 py-6 border-gray-600 flex flex-col gap-2">
            <h1 className="text-md mb-1 font-bold">CATEGORIES</h1>
            <div className=" flex gap-2">
              <input
                onChange={toggleSubCategory}
                type="checkbox"
                value={"Topwear"}
              />
              Topwear
            </div>
            <div className=" flex gap-2">
              {" "}
              <input
                onChange={toggleSubCategory}
                type="checkbox"
                value={"Bottomwear"}
              />
              Bottomwear
            </div>
            <div className=" flex gap-2">
              {" "}
              <input
                onChange={toggleSubCategory}
                type="checkbox"
                value={"Winterwear"}
              />
              Winterwear
            </div>
          </div>
        </div>
        <div className="w-[100%] md:w-[73%]">
          <div className="w-full gap-4 items-center justify-center flex flex-wrap">
            {filteredProducts &&
              filteredProducts.length > 0 &&
              filteredProducts.map((item) => {
                return (
                  <Card
                    key={item._id}
                    productImg={item.image[0]}
                    productTitle={item.name}
                    price={item.price}
                    id={item._id}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
