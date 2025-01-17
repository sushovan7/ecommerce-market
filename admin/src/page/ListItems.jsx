import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ListItems() {
  const [products, setProducts] = useState([]);
  async function getProducts() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/product/list-products`
      );
      setProducts(response.data.products);
      console.log(response.data.products);
    } catch (error) {
      console.log("error fetching products");
    }
  }

  async function removeProduct(id) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/product/remove-product`,
        { id },
        {
          headers: {
            token: localStorage.getItem("adminToken"),
          },
        }
      );
      if (response.data.success) {
        toast.success("Product deleted");
        await getProducts();
      }
    } catch (error) {
      toast.error("Failed to delete");
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <p className="mb-2">All products lists:</p>

      <div className="flex w-[80vw] flex-col gap-2">
        <div className="hidden w-full  md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-2 border bg-gray-200 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Delete</b>
        </div>
        {products &&
          products.length > 0 &&
          products.map((item) => {
            return (
              <div
                key={item._id}
                className="grid grid-cols-[1fr_3fr_1fr] border md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 text-sm text-gray-500"
              >
                <img src={item.images?.[0]} alt="" className="w-12" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p
                  onClick={() => removeProduct(item._id)}
                  className="text-right md:text-center cursor-pointer text-lg"
                >
                  X
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default ListItems;
