import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { shopContext } from "../context/ShopContext";
import Button from "../components/Button";
import Footer from "../components/Footer";
import RelatedProducts from "../components/RelatedProducts";
import CustomerReviews from "../components/CustomerReviews";

function ProductDetails() {
  const { products, currencyType, addToCart } = useContext(shopContext);
  const { productId } = useParams();
  console.log(productId);
  const [productDetails, setProductDetails] = useState("");
  const [imageChange, setImageChange] = useState(null);
  const [size, setSize] = useState(null);
  console.log(products);
  useEffect(() => {
    const product = products.filter((item) => item._id === productId);
    console.log(product);
    setProductDetails(product[0]);
    if (product[0]?.images?.[0]) {
      setImageChange(product[0].images[0]);
    }
  }, [productId, products]);

  function handleImageChange(e) {
    setImageChange(e.target.src);
  }
  function handleSize(size) {
    setSize(size);
  }
  if (!productDetails) {
    return <div>Loading product details...</div>;
  }
  return (
    <div className="w-full">
      <hr className="w-full h-[1px] text-gray-600 mb-10" />
      <div className="sm:flex sm:flex-row items-start  gap-6">
        <div className="w-full  sm:flex sm:flex-row flex flex-col gap-2 mb-10">
          <div className="hidden w-[19.5%] sm:flex sm:items-center  sm:flex-col sm:justify-between">
            {productDetails._id === productId &&
              productDetails.images &&
              productDetails.images.map((img, index) => {
                return (
                  <div
                    key={`${productDetails.images}-${index}`}
                    className="w-full"
                  >
                    <img
                      onClick={handleImageChange}
                      src={img}
                      alt=""
                      className="w-full object-cover"
                    />
                  </div>
                );
              })}
          </div>
          <div className=" w-full sm:w-[80%] overflow-hidden">
            <img
              src={imageChange}
              alt=""
              className="w-full object-cover object-center"
              zoom={3}
              width="400px"
              height="400px"
            />
          </div>
          <div className=" sm:hidden w-full  flex gap-1 ">
            {productDetails._id === productId &&
              productDetails.images &&
              productDetails.images.map((img, index) => {
                return (
                  <div
                    key={`${productDetails.images}-${index}`}
                    className="w-[25%]"
                  >
                    <img
                      onClick={handleImageChange}
                      src={img}
                      alt=""
                      className="w-full "
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <div>
          <div className="flex flex-col items-start gap-2">
            <h1 className="font-mono text-lg font-bold capitalize">
              {productDetails.name}
            </h1>
            <div className="flex items-center gap-4  ">
              <p>rating</p>
              <p>reviews</p>
            </div>
            <p className="text-2xl font-mono mt-3  font-bold">
              {currencyType}
              {productDetails.price}
            </p>
            <p className="text-sm mt-8">{productDetails.description}</p>
          </div>
          <div className="mt-8 mb-6 flex flex-col gap-3">
            <p className="text-md font-bold">Select Size:</p>
            <div className="flex  items-center gap-3">
              {productDetails.sizes &&
                productDetails.sizes.length > 0 &&
                productDetails.sizes.map((itemSize) => {
                  return (
                    <div
                      onClick={() => handleSize(itemSize)}
                      key={itemSize}
                      className={`${
                        itemSize === size
                          ? "border-yellow-600"
                          : "border-gray-600"
                      } border-2 cursor-pointer px-4 flex items-center justify-center py-2 border-gray-600`}
                    >
                      {itemSize}
                    </div>
                  );
                })}
            </div>
          </div>
          <Button
            onClick={() => addToCart(productDetails._id, size)}
            text={"ADD TO CART"}
          />
          <hr className="w-full h-[1px] text-gray-600 mt-10 mb-10" />
          <ul className="text-sm">
            <li>100% Original product.</li>
            <li>Cash on delivery is available on this product.</li>
            <li>Easy return and exchange policy within 7 days.</li>
          </ul>
        </div>
      </div>
      <CustomerReviews />
      <RelatedProducts productId={productId} />
      <Footer />
    </div>
  );
}

export default ProductDetails;
