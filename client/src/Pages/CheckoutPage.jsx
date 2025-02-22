import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddAddress from "../Companents/AddAddress";
import axiosToastError from "../utility/AxiosToastError";
import { Axios } from "../utility/axios";
import summaryApi from "../Config/SummaryApi";
import toast from "react-hot-toast";
import { handleAddItem } from "../Store/Slices/cartProduct";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../Store/Slices/orderSlice";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const addressList = useSelector((state) => state.address.addressList);

  const totalQty = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => {
    const discountedPrice =
      item.product.price - item.product.price * (item.product.discount / 100);
    return total + discountedPrice * item.quantity;
  }, 0);
  const notDiscountTotalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const dispatch = useDispatch();

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
  const [selectAddress, setSelectAddress] = useState(0);
  const [openAddress, setOpenAddress] = useState(false);
  const navigate = useNavigate();

  const handleCashOrder = async () => {
    try {
      const res = await Axios({
        ...summaryApi.cashOrder,
        data: {
          list_items: cartItems,
          addressId: addressList[selectAddress]?.id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        },
      });
      if (res.data.success) {
        toast.success("order successfuly");
        fetchCarts();
        fetchOrder();
        navigate("/success", {
          state: {
            text: "order",
          },
        });
      }
    } catch (error) {
      axiosToastError(error);
      navigate("/cancel");
    }
  };

  return (
    <section className="bg-blue-50">
      <div className="p-4 flex flex-col lg:flex-row w-full gap-5">
        {/* Address Selection */}
        <div className="w-full flex-grow">
          <h3 className="text-lg font-semibold">Choose your address</h3>
          <div className="bg-white p-2 grid gap-4">
            {addressList.map((a, index) => (
              <label htmlFor={`address${index}`} key={index}>
                <div
                  className={`border cursor-pointer border-neutral-300 rounded p-4 flex gap-3 hover:bg-blue-50 
                  ${selectAddress === index ? "bg-blue-100" : ""}`}
                >
                  <input
                    onChange={() => setSelectAddress(index)}
                    id={`address${index}`}
                    type="radio"
                    value={index}
                    name="address"
                    checked={selectAddress === index}
                  />
                  <div>
                    <p>{a.address_line}</p>
                    <p>{a.city}</p>
                    <p>{a.state}</p>
                    <p>
                      {a.country}-{a.pincode}
                    </p>
                    <p>{a.mobile}</p>
                  </div>
                </div>
              </label>
            ))}
            <div
              onClick={() => setOpenAddress(true)}
              className="h-24 bg-blue-50 border-2 cursor-pointer mt-1 border-dashed border-gray-400 flex justify-center items-center"
            >
              Add address
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="w-full max-w-md bg-white py-4 px-2 flex flex-col h-full">
          <h3 className="text-lg font-semibold">Summary</h3>
          <div className="bg-white p-4 flex-grow">
            <h3 className="font-semibold">Bill details</h3>
            <div className="flex justify-between ml-1">
              <p>Items total</p>
              <p className="flex items-center gap-2">
                <span className="line-through text-neutral-400">
                  {notDiscountTotalPrice.toFixed(2)} AZN
                </span>
                <span>{totalPrice.toFixed(2)} AZN</span>
              </p>
            </div>
            <div className="flex justify-between ml-1">
              <p>Quantity total</p>
              <p>{totalQty}</p>
            </div>
            <div className="flex justify-between ml-1">
              <p>Delivery Charge</p>
              <p>Free</p>
            </div>
            <div className="font-semibold flex justify-between">
              <p>Grand total</p>
              <p>{totalPrice.toFixed(2)} AZN</p>
            </div>
          </div>

          {/* Payment Buttons */}
          <div className="w-full flex flex-col gap-4 mt-auto">
            <button className="py-2 cursor-pointer px-4 bg-green-600 rounded hover:bg-green-700 text-white font-semibold">
              Online Payment
            </button>
            <button
              onClick={handleCashOrder}
              className="py-2 px-4 cursor-pointer rounded border-2 border-green-600 font-semibold text-green-600"
            >
              Cash on Delivery
            </button>
          </div>
        </div>
      </div>

      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
    </section>
  );
};

export default CheckoutPage;
