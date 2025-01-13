import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import Card from "./Card";
import { shopContext } from "../context/ShopContext";

function LatestCollections() {
  const { products } = useContext(shopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => setLatestProducts(() => products.slice(10, 20)), []);

  return (
    <div className="text-gray-800 mt-20">
      <div className="flex flex-col mb-6 items-center gap-2 ">
        <Title
          text1={"LATEST"}
          text2={"COLLECTION"}
          className={"md:text-3xl"}
        />
        <p className="w-full text-center text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
          adipisci. Culpa dolor quos molestias magni autem maxime ipsam dolores!
          Asperiores provident, autem voluptatum incidunt voluptatem error iste
          ipsa atque soluta repellendus. Eos eveniet enim velit voluptate, et
          quos deserunt officiis doloremque iusto laborum. Perferendis, unde in
          perspiciatis ducimus sint impedit.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {latestProducts &&
          latestProducts.length > 0 &&
          latestProducts.map((item) => {
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

export default LatestCollections;
