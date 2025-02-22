import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AddCartButton from "./AddCartButton";
import { FaCaretRight } from "react-icons/fa";

const DisplayCartItem = ({ close }) => {
  const cartItems = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

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

  const redirectToCheckoutPage = () => {
    if (user?.id) {
      navigate("/checkout");
      if (close) {
        close();
      }
      return;
    }
    toast("Please Login");
  };

  return (
    <section className="bg-[rgba(0,0,0,0.5)] fixed top-0 bottom-0 right-0 left-0 z-50">
      <div className="bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto">
        <div className="flex items-center p-4 shadow-md gap-3 justify-between">
          <h2 className="font-semibold">Cart</h2>
          <Link to={"/"} className="lg:hidden cursor-pointer">
            <IoClose size={25} />
          </Link>
          <button onClick={close} className="hidden lg:block cursor-pointer">
            <IoClose size={25} />
          </button>
        </div>

        <div className="min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4">
          {cartItems.length > 0 && user?.id ? (
            <>
              <div className="flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full">
                <p>Your total savings</p>
                <p>{(notDiscountTotalPrice - totalPrice).toFixed(2)}AZN</p>
              </div>
              <div className="bg-white rounded-lg p-4 grid gap-5 overflow-auto">
                {cartItems.map((item) => {
                  const discountedPrice =
                    item.product.price -
                    item.product.price * (item.product.discount / 100);
                  return (
                    <div
                      key={item?.id + "cartItemDisplay"}
                      className="flex w-full gap-4"
                    >
                      <div className="w-16 h-16 min-h-16 min-w-16  border rounded">
                        <img
                          src={item?.product?.image[0]}
                          className="object-scale-down"
                        />
                      </div>
                      <div className="w-full max-w-sm text-xs">
                        <p className="text-xs text-ellipsis line-clamp-2">
                          {item?.product?.name}
                        </p>
                        <p className="text-neutral-400">
                          {item?.product?.unit}
                        </p>
                        <p className="font-semibold">{discountedPrice.toFixed(2)}AZN</p>
                      </div>
                      <div>
                        <AddCartButton data={item?.product} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="bg-white p-4">
                <h3 className="font-semibold">Bill details</h3>
                <div className="flex gap-4 justify-between ml-1">
                  <p>Items total</p>
                  <p className="flex items-center gap-2">
                    <span className="line-through text-neutral-400">
                      {notDiscountTotalPrice.toFixed(2)}AZN
                    </span>
                    <span>{totalPrice.toFixed(2)}AZN</span>
                  </p>
                </div>
                <div className="flex gap-4 justify-between ml-1">
                  <p>Quantity total</p>
                  <p className="flex items-center gap-2">{totalQty}</p>
                </div>
                <div className="flex gap-4 justify-between ml-1">
                  <p>Delivery Charge</p>
                  <p className="flex items-center gap-2">Free</p>
                </div>
                <div className="font-semibold flex items-center justify-between gap-4">
                  <p>Grand total</p>
                  <p>{totalPrice.toFixed(2)}AZN</p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white flex flex-col justify-center items-center">
                <img src="/empty_cart.webp" className=" h-full  w-full object-scale-down" alt="empty" />
              <Link
                onClick={close}
                to={"/"}
                className="block bg-green-600 px-4 py-2 text-white rounded my-2"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>

        {cartItems.length > 0 && user?.id && (
          <div className="p-2">
            <div className="bg-green-700 text-neutral-100 px-4 font-bold text-base py-4 static bottom-3 rounded flex items-center gap-4 justify-between">
              <div>{totalPrice.toFixed(2)}AZN</div>
              <button
                onClick={redirectToCheckoutPage}
                className="flex items-center gap-1"
              >
                Proceed
                <span>
                  <FaCaretRight />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DisplayCartItem;
