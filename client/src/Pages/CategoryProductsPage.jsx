import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../utility/axios";
import summaryApi from "../Config/SummaryApi";
import axiosToastError from "../utility/AxiosToastError";
import CartProduct from "../Companents/CartProduct";
import Loader from "../Companents/Loader";

const CategoryProductsPage = () => {
  const params = useParams();
  const categoryId = params?.categoryId;
  const categoryName=params?.categoryName
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        ...summaryApi.get_product_by_category,
        data: { categoryId: +categoryId },
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
  }, [categoryId]);

  return (
    <section className="bg-white border rounded shadow-sm border-neutral-300 w-full sm:w-[90%]   lg:w-[80%] mx-auto flex items-center justify-center ">
      <div className=" grid w-full h-full">
        <div className=" h-full items-center px-3 pt-2">
        <p className=" font-semibold">{categoryName}</p>
        </div>
        <div className=" bg-[#F4F6FB] p-3 mt-4 min-h-[80vh]">
          {loading && <Loader />}
          <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {!loading &&
              data[0] &&
              data?.map((p, index) => {
                return <CartProduct key={index} data={p} />;
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryProductsPage;
