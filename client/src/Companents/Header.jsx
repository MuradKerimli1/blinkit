import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "/logo.png";
import Search from "./Search";
import { FaAngleUp, FaRegUserCircle } from "react-icons/fa";
import { useMobile } from "../hook/useMobile";
import { BsCart2 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { FaAngleDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import DisplayCardItem from "./DisplayCardItem";
const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [openCartSection, setOpenCartSection] = useState(false);

  const redirectToLogin = () => {
    navigate("/login");
  };
  const handleMobileUser = () => {
    if (!user) {
      return navigate("/login");
    }
    navigate("/user");
  };
  useEffect(() => {
    const qty = cart?.reduce((prev, cur) => {
      return prev + cur.quantity;
    }, 0);

    setTotalQty(qty);

    const tPrice = cart?.reduce((prev, cur) => {
      const discountedPrice =
        cur.product.price - cur.product.price * (cur.product.discount / 100);
      return prev + discountedPrice * cur.quantity;
    }, 0);

    setTotalPrice(tPrice);
  }, [cart, user]);

  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex items-center justify-center flex-col gap-2 py-3 bg-white ">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-2 justify-between ">
          {/* Logo */}

          <Link to={"/"} className=" h-full flex justify-center items-center">
            <img
              src={logo}
              alt="logo"
              width={170}
              height={60}
              className=" hidden lg:block"
            />
            <img
              src={logo}
              alt="logo"
              width={120}
              height={60}
              className="lg:hidden"
            />
          </Link>

          {/* Search */}
          <div className="hidden lg:block">
            <Search />
          </div>
          {/* login and shop cart */}
          <div className="">
            {/* Mobile */}
            <button
              className=" text-neutral-500 lg:hidden cursor-pointer"
              onClick={handleMobileUser}
            >
              <FaRegUserCircle size={24} />
            </button>

            {/* Desktop */}
            <div className="hidden lg:flex items-center gap-10 ">
              {user ? (
                <div className=" relative">
                  <div
                    className=" flex items-center gap-2 cursor-pointer"
                    onClick={() => setOpenUserMenu((prev) => !prev)}
                  >
                    <p>Account</p>
                    {openUserMenu ? (
                      <FaAngleUp size={22} />
                    ) : (
                      <FaAngleDown size={22} />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className=" absolute right-0 top-12 ">
                      <div className=" bg-white rounded p-4 min-w-52 shadow-lg">
                        <UserMenu close={() => setOpenUserMenu(false)} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={redirectToLogin}
                  className=" hover:cursor-pointer text-lg px-2"
                >
                  Login
                </button>
              )}

              <button
                onClick={() => setOpenCartSection((prev) => !prev)}
                className="flex items-center gap-2 bg-[#0C831F] hover:bg-green-800 transition-colors duration-200 text-white p-3 rounded hover:cursor-pointer"
              >
                <div className=" animate-bounce">
                  <BsCart2 size={25} />
                </div>
                <div className=" font-bold text-[13px]">
                  {cart[0] && user ? (
                    <div>
                      <p>{totalQty} item</p>
                      <p>{totalPrice.toFixed(2)}AZN</p>
                    </div>
                  ) : (
                    <p>My Card</p>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
      {openCartSection && (
        <DisplayCardItem close={() => setOpenCartSection(false)} />
      )}
    </header>
  );
};

export default Header;
