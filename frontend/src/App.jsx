import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import ScrollTop from "./utils/ScrollTop";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import PasswordReset from "./pages/PasswordReset";
import ResetPasswordOtp from "./pages/ResetPasswordOtp";
import Verify from "./pages/Verify";

function App() {
  return (
    <div className="px-4 min-h-screen sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ScrollTop />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="collection" element={<Collection />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="orders" element={<Orders />} />
          <Route path="cart" element={<Cart />} />
          <Route path="place-order" element={<PlaceOrder />} />
          <Route path="product/:productId" element={<ProductDetails />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="reset-password-otp" element={<ResetPasswordOtp />} />
          <Route path="reset-password" element={<PasswordReset />} />
          <Route path="verify" element={<Verify />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
