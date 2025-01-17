import React, { useState, useEffect } from "react";
import uploadImg from "../assets/uploadimg.png";
import axios from "axios";
import toast from "react-hot-toast";

function AddProduct() {
  const [name, setProductName] = useState("");
  const [description, setProductDescription] = useState("");
  const [category, setProductCategory] = useState("men");
  const [subCategory, setProductSubCategory] = useState("topwear");
  const [price, setProductPrice] = useState("");
  const [sizes, setProductSize] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !description || !price) {
      alert("Please fill in all required fields.");
      return;
    }
    const productData = new FormData();
    productData.append("name", name);
    productData.append("description", description);
    productData.append("category", category);
    productData.append("subCategory", subCategory);
    productData.append("price", price);
    productData.append("sizes", JSON.stringify(sizes));
    productData.append("bestseller", bestseller);

    image1 && productData.append("image1", image1);
    image2 && productData.append("image2", image2);
    image3 && productData.append("image3", image3);
    image4 && productData.append("image4", image4);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/product/add-product`,
        productData,
        {
          headers: {
            token: localStorage.getItem("adminToken"),
          },
        }
      );
      if (response.data.success) {
        toast.success("Product added successfully!");
        setProductName("");
        setProductDescription("");
        setProductCategory("men");
        setProductSubCategory("topwear");
        setProductPrice("");
        setProductSize([]);
        setBestseller(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product");
    }
  }
  useEffect(() => {
    return () => {
      image1 && URL.revokeObjectURL(image1);
      image2 && URL.revokeObjectURL(image2);
      image3 && URL.revokeObjectURL(image3);
      image4 && URL.revokeObjectURL(image4);
    };
  }, [image1, image2, image3, image4]);

  return (
    <form
      onSubmit={handleSubmit}
      className=" flex flex-col gap-4 text-gray-600"
    >
      <div className="flex flex-col gap-3">
        <h1 className=" font-semibold">Upload image:</h1>
        <div className="flex items-center gap-2">
          <label htmlFor="image1">
            <img
              width="70px"
              height="70px"
              src={!image1 ? uploadImg : URL.createObjectURL(image1)}
              alt=""
              className="object-cover"
            />{" "}
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              width="70px"
              height="70px"
              src={!image2 ? uploadImg : URL.createObjectURL(image2)}
              alt=""
              className=" object-cover"
            />{" "}
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              width="70px"
              height="70px"
              src={!image3 ? uploadImg : URL.createObjectURL(image3)}
              alt=""
              className=" object-cover"
            />{" "}
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              width="70px"
              height="70px"
              src={!image4 ? uploadImg : URL.createObjectURL(image4)}
              alt=""
              className=" object-cover"
            />{" "}
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className=" font-semibold">Product name:</h1>
        <input
          required
          type="text"
          value={name}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product name"
          className="border outline-none px-3 py-3 text-lg"
        />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className=" font-semibold">Product description:</h1>
        <textarea
          required
          type="text"
          value={description}
          onChange={(e) => setProductDescription(e.target.value)}
          placeholder="Product description"
          className="border outline-none px-3 py-3 text-lg"
        />
      </div>
      <div className="flex items-center justify-center  gap-8">
        <div className="flex flex-col  gap-3">
          <h1 className=" font-semibold">Product category:</h1>
          <select
            required
            onChange={(e) => setProductCategory(e.target.value)}
            className="outline-none border px-2 py-2"
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className=" font-semibold">Product sub-category:</h1>
          <select
            required
            onChange={(e) => setProductSubCategory(e.target.value)}
            className="outline-none border px-2 py-2"
          >
            <option value="topwear">Topwear</option>
            <option value="bottomwear">Bottomwear</option>
            <option value="winterwear">Witerwear</option>
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className=" font-semibold">Product price:</h1>
          <input
            type="number"
            value={price}
            onChange={(e) => setProductPrice(e.target.value)}
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
              <div
                onClick={() =>
                  setProductSize((prev) =>
                    prev.includes(item)
                      ? prev.filter((size) => size !== item)
                      : [...prev, item]
                  )
                }
                key={i}
                className={`px-3 py-2 cursor-pointer ${
                  sizes.includes(item)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex  gap-3">
        <h1 className=" font-semibold">Add to bestseller:</h1>
        <input
          type="checkbox"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
          className="w-5 h-5"
        />
      </div>
      <div className="flex items-center ">
        <button
          type="submit"
          className="bg-gray-900 rounded-lg text-lg font-bold text-white px-12 py-4"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default AddProduct;
