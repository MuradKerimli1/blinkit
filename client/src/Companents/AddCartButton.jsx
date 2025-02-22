import { useDispatch, useSelector } from "react-redux";
import { Axios } from "../utility/axios";
import summaryApi from "../Config/SummaryApi";
import { handleAddItem } from "../Store/Slices/cartProduct";
import { useEffect, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import axiosToastError from "../utility/AxiosToastError";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

const AddCartButton = ({ data }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);
  const cartItem = useSelector((state) => state.cart.cart);
  const [isAvaible, setIsavaible] = useState(false);
  const [qty, setQty] = useState(0);

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

  const handleAddCartItem = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (!user) {
        return toast.error("please login");
      }
      setLoading(true);
      const res = await Axios({
        ...summaryApi.addCartItem,
        data: {
          productId: data?.id,
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        fetchCarts();
      }
    } catch (error) {
      axiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (newQty) => {
    try {
      const res = await Axios({
        ...summaryApi.updateCartItem,
        data: {
          productId: data?.id,
          quantity: +newQty,
        },
      });

      if (res.data.success) {
        toast.success("Quantity updated successfully");
        fetchCarts();
      }
    } catch (error) {
      axiosToastError(error);
    }
  };

  const deleteCartItem = async () => {
    try {
      const res = await Axios({
        ...summaryApi.deleteCartItem,
        data: {
          productId: data?.id,
        },
      });

      if (res.data.success) {
        toast.success("Product removed from cart");
        fetchCarts();
      }
    } catch (error) {
      axiosToastError(error);
    }
  };

  useEffect(() => {
    const checkingItem = cartItem.some((item) => item.product.id === data.id);
    setIsavaible(checkingItem);

    const product = cartItem.find((item) => item.product.id === data.id);
    setQty(product?.quantity);
  }, [data, cartItem]);

  const decQty = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (qty > 1) {
      setQty(qty - 1);
      handleUpdateQuantity(qty - 1);
    } else if (qty === 1) {
      deleteCartItem();
    }
  };

  const incQty = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQty(qty + 1);
    handleUpdateQuantity(qty + 1);
  };

  return (
    <div className="w-full max-w-[150px]">
      {isAvaible && user?.id ? (
        <div className="flex">
          <button
            className="bg-green-600 hover:bg-green-700 text-white flex-1 p-1 rounded cursor-pointer"
            onClick={decQty}
          >
            <FaMinus />
          </button>
          <p className="flex-1 font-semibold px-1">{qty}</p>
          <button
            className="bg-green-600 hover:bg-green-700 text-white flex-1 p-1 rounded cursor-pointer"
            onClick={incQty}
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <div
          onClick={(e) => handleAddCartItem(e)}
          className="bg-[#F7FFF9] border border-[#318616] text-[#318616] px-4 py-1 rounded cursor-pointer"
        >
          {loading ? <LoaderIcon /> : " Add"}
        </div>
      )}
    </div>
  );
};

export default AddCartButton;
