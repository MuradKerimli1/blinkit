import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axiosToastError from "../utility/AxiosToastError";
import { Axios } from "../utility/axios";
import summaryApi from "../Config/SummaryApi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Divider from "../Companents/Divider";
import AddCartButton from "../Companents/AddCartButton";
import Loader from "../Companents/Loader";

const ProductDisplay = () => {
  const params = useParams();
  const productId = params?.product?.split("-").pop();
  const [imageCount, setImageCount] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const imageContainer = useRef();

  const fetchProductByCategoryId = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        ...summaryApi.get_product_details,
        data: { productId },
      });
      if (res.data.success) {
        setData(res.data.product);
      }
    } catch (error) {
      axiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductByCategoryId();
  }, [productId]);

  if (loading) return <Loader />;
  if (!data) return;

  const handleScroll = (direction) => {
    if (imageContainer.current) {
      imageContainer.current.scrollBy({
        left: direction === "left" ? -100 : 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="p-4 grid lg:grid-cols-2">
      <div className="max-h-[80vh] overflow-y-auto scrollbar-none scroll-smooth">
        <div className="bg-white min-h-[60vh] max-h-[60vh] lg:min-h-[65vh] lg:max-h-[65vh] rounded h-full w-full">
          <img
            src={data?.image?.[imageCount]}
            className="w-full h-full object-scale-down"
            alt="Product"
          />
        </div>
        <div className="flex items-center justify-center gap-3 my-2">
          {Array.isArray(data?.image) &&
            data?.image?.map((img, index) => (
              <div
                key={index}
                onClick={() => setImageCount(index)}
                className={`bg-slate-200 w-4 h-4 lg:w-5 lg:h-5 rounded-full cursor-pointer ${
                  index === imageCount && "bg-slate-300"
                }`}
              ></div>
            ))}
        </div>
        <div className="relative">
          <div
            ref={imageContainer}
            className="flex gap-4 w-full overflow-x-auto scrollbar-none"
          >
            {Array.isArray(data?.image) &&
              data?.image?.map((img, index) => (
                <div
                  className="w-20   h-20 min-w-[60px] min-h-[60px] cursor-pointer shadow-md"
                  key={index}
                >
                  <img
                    src={img}
                    alt="Thumbnail"
                    onClick={() => setImageCount(index)}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>
          {data?.image?.length > 0 && (
            <div className="absolute top-1/2 w-full flex justify-between items-center">
              <button
                onClick={() => handleScroll("left")}
                className="bg-white p-2 rounded-full shadow-lg"
              >
                <FaAngleLeft />
              </button>
              <button
                onClick={() => handleScroll("right")}
                className="bg-white p-2 rounded-full shadow-lg"
              >
                <FaAngleRight />
              </button>
            </div>
          )}
        </div>
        <div className="my-4">
          <p className="font-semibold">Description</p>
          <p className="text-base">{data?.description}</p>
        </div>
      </div>

      <div className="p-4 lg:pl-7">
        <p className="bg-green-300 w-fit px-2 rounded-full text-sm">10 Min</p>
        <h2 className="text-lg font-semibold lg:text-3xl">{data?.name}</h2>
        <p>{data?.unit}</p>
        <Divider />
        <div>
          <p className="text-lg font-medium">Price</p>
          <div className="flex items-center gap-3">
            <div className="border border-green-500 p-4 rounded bg-green-50 py-2 w-fit">
              <p className="font-semibold text-lg lg:text-xl">
                {data?.discount
                  ? ((data?.price * (100 - data?.discount)) / 100).toFixed(2)
                  : data?.price}{" "}
                AZN
              </p>
            </div>
            {data?.discount && (
              <>
                <p className="line-through text-xl lg:text-2xl text-gray-500">
                  {data?.price}
                </p>
                <p className="font-bold text-green-600 text-xl lg:text-2xl">
                  {data?.discount}%{" "}
                  <span className="text-base text-neutral-500">Discount</span>
                </p>
              </>
            )}
          </div>
        </div>
        {data?.stock === 0 ? (
          <p className="text-lg text-red-500">Out of stock</p>
        ) : (
          <div className="w-fit mt-2">
            <AddCartButton data={data} />
          </div>
        )}
        <Divider />
        <h2 className="font-semibold">Why Shop From Binkeyit</h2>
        <div>
          {[
            "minute_delivery.png",
            "Best_Prices_Offers.png",
            "Wide_Assortment.png",
          ].map((img, index) => (
            <div key={index} className="flex items-center gap-4 mt-4">
              <img src={`/${img}`} alt="benefit-icon" className="w-20 h-20" />
              <div>
                <div className="font-semibold">
                  {img.includes("minute")
                    ? "Superfast Delivery"
                    : img.includes("Best")
                    ? "Best Prices & Offers"
                    : "Wide Assortment"}
                </div>
                <p>
                  {img.includes("minute")
                    ? "Get your order delivered to your doorstep at the earliest from dark stores near you."
                    : img.includes("Best")
                    ? "Best price destination with offers directly from the manufacturers"
                    : "Choose from 5000+ products across food, personal care, household & other categories."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDisplay;
