import { Routes, Route } from "react-router-dom";
import RootLayout from "./page/RootLayout";
import AddProduct from "./page/AddProduct";
import ListItems from "./page/ListItems";
import Orders from "./page/Orders";
import Login from "./page/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<AddProduct />} />
            <Route path="list-items" element={<ListItems />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
