import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { useMobile } from "../hook/useMobile";
const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);
  const redirecToSearchPage = () => {
    navigate("/search");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const url = `/search?q=${value}`;
    navigate(url);
  };
  return (
    <div className="w-full  min-w-[250px]  sm:min-w-[380px] lg:min-w-[600px] h-12 rounded-lg bg-[#F8F8F8] border border-gray-200 flex items-center text-neutral-500 hover:cursor-context-menu overflow-hidden">
      <div className="h-full">
        {isMobile && isSearchPage ? (
          <Link
            to="/"
            className="flex justify-center items-center h-full px-3 text-neutral-800 hover:cursor-pointer"
          >
            <FaArrowLeft size={15} />
          </Link>
        ) : (
          <button className="flex justify-center items-center h-full px-3 text-neutral-800 hover:cursor-pointer">
            <IoSearch size={20} />
          </button>
        )}
      </div>
      <div className="w-full h-full  flex items-center">
        {!isSearchPage ? (
          <div
            onClick={redirecToSearchPage}
            className="w-full h-full flex items-center"
          >
            <TypeAnimation
              sequence={[
                "Search 'milk'",
                1000,
                "Search 'sugar'",
                1000,
                "Search 'bread'",
                1000,
                "Search 'panner'",
                1000,
                "Search 'chocolate'",
                1000,
                "Search 'curd'",
                1000,
                "Search 'rice'",
                1000,
                "Search 'egg'",
                1000,
                "Search 'chips'",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          <div className=" w-full h-full ">
            <input
              type="text"
              placeholder="Search  something"
              className=" h-full w-full border-none outline-none  "
              onChange={handleChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
