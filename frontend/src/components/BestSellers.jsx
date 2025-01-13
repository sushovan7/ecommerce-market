import React, { useContext, useEffect, useState } from "react";

import Card from "./Card";
import Title from "./Title";
import { shopContext } from "../context/ShopContext";

function BestSellers() {
  const { products } = useContext(shopContext);
  const [bestSellers, setLBestSellers] = useState([]);

  useEffect(
    () =>
      setLBestSellers(
        products
          .filter((item) => {
            return item.bestseller === true;
          })
          .slice(0, 5)
      ),
    []
  );

  return (
    <div className=" text-gray-800 mt-20 mb-10">
      <div className="flex flex-col mb-6 items-center gap-2 mt-10">
        <Title text1={"BEST"} text2={"SELLERS"} className={"text-3xl"} />
        <p className="w-full text-center text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
          dignissimos minus recusandae illo tenetur magnam, repellendus atque
          dolores ex assumenda dolor, cupiditate at maiores id ea tempore,
          accusantium placeat corrupti!
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {bestSellers &&
          bestSellers.length > 0 &&
          bestSellers.map((item) => {
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
  );
}

export default BestSellers;
