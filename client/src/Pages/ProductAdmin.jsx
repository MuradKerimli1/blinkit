import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosToastError from "../utility/AxiosToastError";
import { Axios } from "../utility/axios";
import summaryApi from "../Config/SummaryApi";
import { setAllProduct } from "../Store/Slices/productSlices";

import ProductCartAdmin from "../Companents/ProductCartAdmin";
import NoneData from "../Companents/NoneData";
import { IoSearch } from "react-icons/io5";
import Loader from "../Companents/Loader";


const ProductAdmin = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState("");

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        ...summaryApi.get_product,
        data: { page: page, limit: 10, search: search },
      });

      if (res.data.success) {
        dispatch(setAllProduct(res.data.data));
        setTotalPage(res.data.totalPage);
      }
    } catch (error) {
      axiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [page]);
  useEffect(() => {
    const interval = setTimeout(() => {
      fetchProductData();
    }, 300);

    return () => clearTimeout(interval);
  }, [search]);

  const handleNext = () => {
    if (page < totalPage) {
      setPage((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    setPage(1);
  };

  return (
    <section>
      <div className=" p-2 font-semibold bg-white shadow-md flex items-center justify-between ">
        <h2 className="font-semibold"> Product</h2>
        <div className=" relative h-full bg-blue-50 px-4 py-1 flex items-center gap-2 rounded">
          <IoSearch />
          <input
            type="text"
            value={search}
            onChange={(e) => handleChange(e)}
            placeholder="Search Product"
            className=" p-1 bg-blue-50 outline-none "
          />
        </div>
      </div>

      {loading && <Loader />}

      <div>
        {product?.length > 0 ? (
          <div className=" flex flex-col gap-3 justify-between  bg-blue-50 p-3 mt-2 min-h-[68vh]">
            <div className="grid grid-cols-1 murad sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6 gap-2 xs:gap-3 sm:gap-4 md:gap-6 xxl:gap-8">
              {product.map((item, index) => (
                <ProductCartAdmin data={item} key={index} fetchProductData={fetchProductData} />
              ))}
            </div>

            <div className=" flex items-center justify-between gap-3  ">
              <button
                onClick={handlePrev}
                className=" font-semibold cursor-pointer border border-amber-400 px-4 py-1 hover:bg-amber-400 hover:text-white"
              >
                Previous
              </button>
              <button className=" bg-slate-100 ">
                {page + "/" + totalPage}
              </button>
              <button
                onClick={handleNext}
                className=" font-semibold  cursor-pointer border border-amber-400 px-4 py-1 hover:bg-amber-400 hover:text-white"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div>
            <NoneData />
          </div>
        )}
      </div>
     
    </section>
  );
};

export default ProductAdmin;
