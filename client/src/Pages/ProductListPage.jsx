import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosToastError from "../utility/AxiosToastError";
import { Axios } from "../utility/axios";
import summaryApi from "../Config/SummaryApi";
import Loader from "../Companents/Loader";
import CartProduct from "../Companents/CartProduct";
import { useSelector } from "react-redux";

const ProductListPage = () => {
  // Extract parameters from URL
  const params = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const AllSubCategory = useSelector((state) => state.product.subCategory);
  const [displaySubCategory, setDisplaySubCategory] = useState([]);

  const subCategory = params?.subCategory?.split("-");
  const subCategoryName = subCategory
    ?.slice(0, subCategory?.length - 1)
    .join(" ");
  const categoryId = params.category.split("-").at(-1);
  const subCategoryId = params.subCategory.split("-").at(-1);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        ...summaryApi.get_product_by_category_and_subcategory,
        data: {
          categoryId,
          subCategoryId,
          page,
          limit: 10,
        },
      });

      if (res.data.success) {
        if (res.data.page === 1) {
          setData(res.data.data);
        } else {
          setData((prevData) => [...prevData, ...res.data.data]);
        }
        setTotalPages(res.data.totalCount);
      }
    } catch (error) {
      axiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [params]);

  useEffect(() => {
    const filteredSubCategories = AllSubCategory.filter((s) => {
      return Number(s.category.id) === Number(categoryId);
    });
    setDisplaySubCategory(filteredSubCategories);
  }, [params, AllSubCategory]);

  return (
    <section className="sticky top-24 lg:top-20">
      <div className="sticky min-h-[85vh] top-24 grid grid-cols-[90px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr]">
        {/* Subcategory Sidebar */}
        <div className=" max-h-[85vh] overflow-y-scroll flex flex-col shadow-md scrollbarCustom bg-white py-2">
          {displaySubCategory.map((s, index) => {
            const link = `/${s.category.name.replaceAll(" ", "-")}-${
              s.category.id
            }/${s.name.replaceAll(" ", "-")}-${s.id}`;
            return (
              <Link
                to={link}
                key={s.id}
                className={`flex  w-full  items-center flex-col lg:flex-row gap-3 border border-neutral-300 p-2  ${
                  subCategoryId == s.id ? "bg-green-100" : ""
                }`}
              >
                <div className=" max-w-28 mx-auto lg:mx-0 bg-white rounded box-border">
                  <img
                    src={s.image}
                    className="w-14  h-10 lg:h-14 lg:w-12  object-scale-down"
                  />
                </div>
                <p className="text-md">{s.name}</p>
              </Link>
            );
          })}
        </div>

        {/* Product List */}
        <div className="sticky top-20">
          <div className="bg-white shadow-lg p-4 z-10">
            <h3 className="font-semibold">{subCategoryName}</h3>
          </div>
          <div className=" max-h-[80vh] p-4 overflow-y-auto  relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  p-4 gap-4">
              {data.map((p, index) => (
                <CartProduct data={p} key={`${p.id}-product-${index}`} />
              ))}
            </div>
          </div>
          {loading && <Loader />}
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
