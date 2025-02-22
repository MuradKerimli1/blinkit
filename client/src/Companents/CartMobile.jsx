import { FaCaretRight, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartMobile = () => {
  const cartItems = useSelector((state) => state.cart.cart);

  const totalQty = cartItems.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cartItems.reduce((total, item) => {
    const discountedPrice =
      item.product.price - item.product.price * (item.product.discount / 100);
    return total + discountedPrice * item.quantity;
  }, 0);

  return (
    <>
      {cartItems[0] && (
        <div className="container mx-auto sticky bottom-4 p-2 z-10">
          <div className="bg-green-600 px-2 py-1 rounded text-neutral-100 text-sm flex items-center justify-between gap-3 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-500 rounded w-fit cursor-pointer">
                <FaShoppingCart />
              </div>
              <div className="text-xs">
                <p>{totalQty} items</p>
                <p>{totalPrice.toFixed(2)} AZN</p>
              </div>
            </div>

            <Link to={"/cart"} className="flex items-center gap-1">
              <span className="text-sm">View Cart</span>
              <FaCaretRight />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CartMobile;
