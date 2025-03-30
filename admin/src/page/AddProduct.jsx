import { useState, useEffect } from "react";
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
      toast.error("Please fill in all required fields.");
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
      className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 flex flex-col gap-6 text-gray-700"
    >
      {/* Image Upload Section */}
      <div className="flex flex-col gap-4">
        <h1 className="text-lg font-semibold">Upload images:</h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((num) => {
            const imageState =
              num === 1
                ? image1
                : num === 2
                ? image2
                : num === 3
                ? image3
                : image4;
            const setImage =
              num === 1
                ? setImage1
                : num === 2
                ? setImage2
                : num === 3
                ? setImage3
                : setImage4;

            return (
              <label
                key={num}
                htmlFor={`image${num}`}
                className="cursor-pointer"
              >
                <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden hover:border-gray-400 transition-colors">
                  {!imageState ? (
                    <img
                      src={uploadImg}
                      alt="Upload placeholder"
                      className="w-full h-full object-contain p-4"
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(imageState)}
                      alt={`Preview ${num}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id={`image${num}`}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Product Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-lg font-semibold">
          Product name:
        </label>
        <input
          required
          type="text"
          id="name"
          value={name}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
          className="border border-gray-300 rounded-md outline-none px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Product Description */}
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-lg font-semibold">
          Product description:
        </label>
        <textarea
          required
          id="description"
          value={description}
          onChange={(e) => setProductDescription(e.target.value)}
          placeholder="Enter product description"
          rows={4}
          className="border border-gray-300 rounded-md outline-none px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Category, Subcategory, Price */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-lg font-semibold">
            Category:
          </label>
          <select
            required
            id="category"
            value={category}
            onChange={(e) => setProductCategory(e.target.value)}
            className="border border-gray-300 rounded-md outline-none px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="subCategory" className="text-lg font-semibold">
            Sub-category:
          </label>
          <select
            required
            id="subCategory"
            value={subCategory}
            onChange={(e) => setProductSubCategory(e.target.value)}
            className="border border-gray-300 rounded-md outline-none px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="topwear">Topwear</option>
            <option value="bottomwear">Bottomwear</option>
            <option value="winterwear">Winterwear</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="text-lg font-semibold">
            Price ($):
          </label>
          <input
            required
            type="number"
            id="price"
            value={price}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="Enter price"
            min="0"
            step="0.01"
            className="border border-gray-300 rounded-md outline-none px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Size Selection */}
      <div className="flex flex-col gap-2">
        <label className="text-lg font-semibold">Available sizes:</label>
        <div className="flex flex-wrap gap-2">
          {["S", "M", "L", "XL", "XXL"].map((item) => (
            <button
              type="button"
              onClick={() =>
                setProductSize((prev) =>
                  prev.includes(item)
                    ? prev.filter((size) => size !== item)
                    : [...prev, item]
                )
              }
              key={item}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                sizes.includes(item)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="bestseller" className="text-lg font-semibold">
          Mark as bestseller
        </label>
      </div>

      {/* Submit Button */}
      <div className="mt-4">
        <button
          type="submit"
          className="w-full md:w-auto bg-gray-900 hover:bg-gray-800 rounded-lg text-lg font-bold text-white px-8 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          Add Product
        </button>
      </div>
    </form>
  );
}

export default AddProduct;
