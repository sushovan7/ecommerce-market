import React, { useContext } from "react";
import { shopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

function Card({ productImg, productTitle, price, id }) {
  const { currencyType } = useContext(shopContext);
  return (
    <Link
      to={`/product/${id}`}
      className="flex flex-col  gap-2 overflow-hidden 
             w-[47%]  
             sm:w-[40%] 
             md:w-[30%]  
             lg:w-[20%]  
             xl:w-[18%] "
    >
      <div className="w-full overflow-hidden">
        <img
          src={productImg}
          alt="product-image "
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="flex flex-col  justify-start">
        <p className="text-gray-600 text-xs">{productTitle}</p>
        <p className="text-black ">
          {currencyType}
          {price}
        </p>
      </div>
    </Link>
  );
}

export default Card;
