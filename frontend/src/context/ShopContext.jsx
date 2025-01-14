import React, { createContext, useState, useEffect } from "react";
import { products } from "../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export const shopContext = createContext();

function ShopContextProvider(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const currencyType = "$";
  const shippingFee = 10;
  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : {};
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  function handleSearch() {
    if (location.pathname === "/collection") {
      setShowSearchBar(true);
    } else {
      setShowSearchBar(false);
    }
  }

  function addToCart(productId, size) {
    if (!size) {
      toast.error("Please select size!");
      return null;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[productId]) {
      if (cartData[productId][size]) {
        cartData[productId][size]++;
      } else {
        cartData[productId][size] = 1;
      }
    } else {
      cartData[productId] = {};
      cartData[productId][size] = 1;
    }
    setCartItems(cartData);
    toast.success("Item added to Cart");
  }

  function getCartCount() {
    let totalCount = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount = totalCount + cartItems[items][item];
          } else {
            totalCount = cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  }

  function updateQuantity(productId, size, quantity) {
    let cartData = structuredClone(cartItems);
    cartData[productId][size] = quantity;
    setCartItems(cartData);
  }

  async function handleLogout() {
    const token = localStorage.getItem("token") || "";
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/auth/logout`,
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(response);
      if (response.data.success) {
        toast.success("Logout successful");
        navigate("/");
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  }

  const value = {
    products,
    currencyType,
    showSearchBar,
    setShowSearchBar,
    location,
    handleSearch,
    inputValue,
    setInputValue,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    shippingFee,
    totalProductPrice,
    setTotalProductPrice,
    handleLogout,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <shopContext.Provider value={value}>{props.children}</shopContext.Provider>
  );
}

export default ShopContextProvider;
