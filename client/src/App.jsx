import { BrowserRouter, Outlet, useLocation } from "react-router-dom";
import Header from "./Companents/Header";
import Footer from "./Companents/Footer";
import { Toaster } from "react-hot-toast";
import { fetchUserDetails } from "./utility/fetchUserDetails";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./Store/Slices/userSlices";
import { fetchCategory } from "./utility/fetchCategory";
import summaryApi from "./Config/SummaryApi";
import { setAllSubCategory } from "./Store/Slices/productSlices";
import axiosToastError from "./utility/AxiosToastError";
import { Axios } from "./utility/axios";
import { handleAddItem } from "./Store/Slices/cartProduct";
import { FaShoppingCart } from "react-icons/fa";
import CartMobile from "./Companents/CartMobile";
import { addAddress } from "./Store/Slices/addressSlice";
import { addOrder } from "./Store/Slices/orderSlice";

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    const user = userData?.user;
    dispatch(setUserDetails(user));
  };
  const fetchSubCategory = async () => {
    try {
      const res = await Axios({ ...summaryApi.get_subcategory });

      if (res.data.success) {
        dispatch(setAllSubCategory(res.data.data));
      }
    } catch (error) {
      axiosToastError(error);
    }
  };
  const fetchCarts = async () => {
    try {
      const res = await Axios({ ...summaryApi.getCartItem });

      if (res.data.success) {
        dispatch(handleAddItem(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAddress = async () => {
    try {
      const res = await Axios({ ...summaryApi.getAddress });
      if (res.data.success) {
        dispatch(addAddress(res.data.data));
      }
    } catch (error) {
      axiosToastError(error);
    }
  };
  const fetchOrder = async () => {
    try {
      const res = await Axios({ ...summaryApi.orderDetails });
      if (res.data.success) {
        dispatch(addOrder(res.data.data));
      }
    } catch (error) {
      axiosToastError(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory(dispatch);
    fetchSubCategory();
    fetchCarts();
    fetchAddress();
    fetchOrder();
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location]);

  console.log(import.meta.env.VITE_API_URL, "api_url");


  return (
    <>
      <Header />
      <main className="min-h-[81vh] mx-auto container  ">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      {location.pathname !== "/checkout" && <CartMobile />}
    </>
  );
};

export default App;
