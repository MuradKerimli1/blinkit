import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import SearchPage from "../Pages/SearchPage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ForgotPasswordPage from "../Pages/ForgotPasswordPage";
import OtpVerification from "../Pages/OtpVerification";
import ResetPassword from "../Pages/ResetPassword";
import UserMenuMobile from "../Pages/UserMenuMobile";
import Dashboard from "../Layouts/Dashboard";
import Profile from "../Pages/Profile";
import MyOrders from "../Pages/MyOrders";
import Adress from "../Pages/Adress";
import ProductAdmin from "../Pages/ProductAdmin";
import CategoryPage from "../Pages/CategoryPage";
import SubCategory from "../Pages/SubCategory";
import UploadProductPage from "../Pages/UploadProductPage";
import AdminPermision from "../Layouts/AdminPermision";
import ProductListPage from "../Pages/ProductListPage";
import ProductDisplay from "../Pages/ProductDisplay";
import CategoryProductsPage from "../Pages/CategoryProductsPage";
import CartPage from "../Pages/CartPage";
import CheckoutPage from "../Pages/CheckoutPage";
import Success from "../Pages/Success";
import Cancel from "../Pages/Cancel";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "verification-otp",
        element: <OtpVerification />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "user",
        element: <UserMenuMobile />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "myorders",
            element: <MyOrders />,
          },
          {
            path: "address",
            element: <Adress />,
          },
          {
            path: "product",
            element: (
              <AdminPermision>
                <ProductAdmin />
              </AdminPermision>
            ),
          },
          {
            path: "category",
            element: (
              <AdminPermision>
                <CategoryPage />
              </AdminPermision>
            ),
          },
          {
            path: "subcategory",
            element: (
              <AdminPermision>
                <SubCategory />
              </AdminPermision>
            ),
          },
          {
            path: "upload-product",
            element: (
              <AdminPermision>
                <UploadProductPage />
              </AdminPermision>
            ),
          },
        ],
      },
      {
        path: ":category",
        children: [
          {
            path: ":subCategory",
            element: <ProductListPage />,
          },
        ],
      },
      {
        path: "product/:product",
        element: <ProductDisplay />,
      },
      {
        path: "products/:categoryName/:categoryId",
        element: <CategoryProductsPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "success",
        element: <Success />,
      },
      {
        path: "cancel",
        element: <Cancel />,
      },
    ],
  },
]);
