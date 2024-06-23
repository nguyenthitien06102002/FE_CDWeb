import { lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import Order from "./components/Account/Order";
import { Info } from "./components/Account/Info";
import OrderDetails from "./components/Account/OrderDetails";
import ChangePassword from "./pages/ChangePassword";
import ForgetPassword from "./pages/ForgetPassword";
import NewPassword from "./pages/NewPassword";
import Dashboard from "./pages/Admin/Dashboard";
import ListOrderAdmin from "./pages/Admin/ListOrderAdmin";
import ListProductsAdmin from "./pages/Admin/ListProductsAdmin";
import ListUserAdmin from "./pages/Admin/ListUserAdmin";
import PrivateRoute from "./components/PrivateRoute"; // Import thành phần PrivateRoute
import DetailOrderAdmin from './pages/Admin/DetailOrderAdmin';
import NewProductAdmin from "./pages/Admin/NewProductAdmin";
import EditProductAdmin from "./pages/Admin/EditProductAdmin";

const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <MainLayout />
      </Router>
    </Suspense>
  );
}

const MainLayout = () => {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === '/dashboard' ||
    location.pathname === '/listOrderAdmin' ||
    location.pathname === '/listProductAdmin' ||
    location.pathname === '/listUserAdmin' ||
    location.pathname === '/newProductAdmin' ||
    location.pathname.startsWith ('/editProductAdmin') ||
    location.pathname.startsWith('/orderDetail');
  return (
    <>
      {!hideNavAndFooter && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/forgetPass" element={<ForgetPassword />} />
        <Route path="/newPassword" element={<NewPassword />} />

        <Route path="/account" element={
          <PrivateRoute>
            <Account />
          </PrivateRoute>
        }>
          <Route index element={<Info />} />
          <Route path="order" element={<Order />} />
          <Route path="info" element={<Info />} />
          <Route path="order/order-details/:id" element={<OrderDetails />} />
          <Route path="changePassword" element={<ChangePassword />} />
        </Route>

        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/listOrderAdmin" element={
          <PrivateRoute>
            <ListOrderAdmin />
          </PrivateRoute>
        } />
        <Route path="/listProductsAdmin" element={
          <PrivateRoute>
            <ListProductsAdmin />
          </PrivateRoute>
        } />
        <Route path="/listUserAdmin" element={
          <PrivateRoute>
            <ListUserAdmin />
          </PrivateRoute>
        } />
        <Route path="/orderDetail/:id" element={
          <PrivateRoute>
            <DetailOrderAdmin />
          </PrivateRoute>
        } />
        <Route path="/listProductAdmin" element={
          <PrivateRoute>
            <ListProductsAdmin />
          </PrivateRoute>
        } />
        <Route path="/newProductAdmin" element={
          <PrivateRoute>
            <NewProductAdmin />
          </PrivateRoute>
        } />
        <Route path="/editProductAdmin/:id" element={
          <PrivateRoute>
            <EditProductAdmin />
          </PrivateRoute>
        } />
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </>
  );
};

export default App;
