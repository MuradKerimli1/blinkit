import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import axiosToastError from "../utility/AxiosToastError";
import { Axios } from "../utility/axios";
import summaryApi from "../Config/SummaryApi";
import CartLoading from "./CartLoading";
import CartProduct from "./CartProduct";

const CategoryProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [swiperKey, setSwiperKey] = useState(0);
  const swiperRef = useRef(null);

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        ...summaryApi.get_product_by_category,
        data: { categoryId: id, limit: 15 },
      });

      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (error) {
      axiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryWiseProduct();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (swiperRef.current) {
        swiperRef.current.swiper.update();
        setSwiperKey((prev) => prev + 1);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadingCardNumber = new Array(15).fill(null);

  const prevBtnClass = `custom-swiper-prev-${id}`;
  const nextBtnClass = `custom-swiper-next-${id}`;

  return (
    <div>
      <div className="p-4 flex items-center justify-between gap-4">
        <h3 className="font-semibold text-md">{name}</h3>
        <Link
          to={`products/${name}/${id}`}
          className="font-semibold text-green-600 hover:text-green-400 cursor-pointer"
        >
          See All
        </Link>
      </div>
      <div className="relative">
        <Swiper
          key={swiperKey}
          ref={swiperRef}
          modules={[Navigation]}
          loop={true}
          observer={true}
          observeParents={true}
          navigation={{
            nextEl: `.${nextBtnClass}`,
            prevEl: `.${prevBtnClass}`,
          }}
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            350: { slidesPerView: 2, spaceBetween: 10 },
            500: { slidesPerView: 3, spaceBetween: 10 },
            720: { slidesPerView: 4, spaceBetween: 10 },
            920: { slidesPerView: 4.5, spaceBetween: 10 },
            1100: { slidesPerView: 5.5, spaceBetween: 10 },
            1300: { slidesPerView: 6.5, spaceBetween: 10 },
          }}
          className="px-4"
        >
          {/* Yüklənən kartlar */}
          {loading &&
            loadingCardNumber.map((_, index) => (
              <SwiperSlide key={index} className="w-auto">
                <CartLoading />
              </SwiperSlide>
            ))}

          {/* Məhsul kartları */}
          {!loading &&
            data?.map((p, index) => (
              <SwiperSlide key={index} className="w-auto">
                <CartProduct data={p} />
              </SwiperSlide>
            ))}
        </Swiper>
        <button
          className={`${prevBtnClass} w-[34px] h-[34px] bg-white shadow-lg rounded-full border-4 border-transparent flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer hover:bg-gray-200`}
        >
          ❮
        </button>
        <button
          className={`${nextBtnClass} w-[34px] h-[34px] bg-white shadow-lg rounded-full border-4 border-transparent flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer hover:bg-gray-200`}
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default CategoryProductDisplay;
