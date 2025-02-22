import { useSelector } from "react-redux";
import banner from "/banner.jpg";
import { Link, useNavigate } from "react-router-dom";
import CategoryProductDisplay from "../Companents/CategoryProductDisplay";

const Home = () => {
  const categoryLoading = useSelector((state) => state.product.categoryLoading);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.subCategory);
  const navigate = useNavigate();

  const handleRedirectToProductList = (id, name) => {
    const SubCategory = subCategoryData.find((sub) => sub.category.id == id);

    const url = `/${name.replaceAll(
      " ",
      "-"
    )}-${id}/${SubCategory.name.replaceAll(" ", "-")}-${SubCategory.id}`;
    navigate(url);
  };

  return (
    <section className=" bg-white p-4">
      <div className={`w-full h-full lg:min-h-48 rounded`}>
        <img
          src={banner}
          className="w-full h-full hidden lg:block"
          alt="banner"
        />
      </div>

      <div className="px-4 my-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4">
        {categoryLoading
          ? new Array(20).fill(null).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded p-4 min-h-36 flex flex-col items-center gap-2 shadow animate-pulse"
              >
                <div className="bg-blue-100 w-20 h-20 rounded"></div>
                <div className="bg-blue-100 w-3/4 h-6 rounded"></div>
              </div>
            ))
          : categoryData?.map((category, index) => (
              <div
                key={index}
                onClick={() =>
                  handleRedirectToProductList(category.id, category.name)
                }
                className="w-full max-w-xs h-auto flex justify-between flex-col p-4 border border-neutral-200 rounded-lg shadow-md bg-white"
              >
                <div className="w-full h-25 overflow-hidden">
                  <img
                    src={category.image}
                    className="w-full h-full object-scale-down rounded-lg"
                    alt="productImage"
                  />
                </div>

                <p className="mt-2 text-sm font-semibold line-clamp-2">
                  {category.name}
                </p>
              </div>
            ))}
      </div>

      {categoryData.slice(0, 5).map((c, index) => (
        <CategoryProductDisplay id={c.id} name={c.name} />
      ))}
    </section>
  );
};

export default Home;
