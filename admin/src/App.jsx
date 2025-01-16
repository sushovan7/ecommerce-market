import React from "react";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./page/RootLayout";
import AddProduct from "./page/AddProduct";
import ListItems from "./page/ListItems";
import Orders from "./page/Orders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<AddProduct />} />

          <Route path="list-items" element={<ListItems />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
