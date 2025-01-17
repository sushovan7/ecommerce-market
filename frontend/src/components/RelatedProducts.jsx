import React, { useContext, useEffect, useState } from "react";

import Card from "./Card";
import Title from "./Title";
import { shopContext } from "../context/ShopContext";

function RelatedProducts({ productId }) {
  const { products } = useContext(shopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    const requiredProduct = products.filter((item) => {
      return (
        item.category === product.category &&
        item.subCategory === product.subCategory &&
        item._id !== productId &&
        item.name.split(" ")[0] === product.name.split(" ")[0]
      );
    });
    setRelatedProducts(requiredProduct);
  }, [productId]);
  return (
    <div className=" text-gray-800 mt-20 mb-10">
      <div className="flex flex-col mb-6 items-center gap-2 mt-10">
        <Title text1={"RELATED"} text2={"PRODUCTS"} className={"text-3xl"} />
        <p className="w-full text-start text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
          dignissimos minus recusandae illo tenetur magnam, repellendus atque
          dolores ex assumenda dolor, cupiditate at maiores id ea tempore,
          accusantium placeat corrupti!
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {relatedProducts &&
          relatedProducts.length > 0 &&
          relatedProducts.map((item) => {
            return (
              <Card
                key={item._id}
                productImg={item.images?.[0]}
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

export default RelatedProducts;
