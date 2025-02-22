import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import uploadImage from "../utility/uploadImage";
import axiosToastError from "../utility/AxiosToastError";
import { Axios } from "../utility/axios";
import summaryApi from "../Config/SummaryApi";
import toast from "react-hot-toast";

const UploadCategoryModel = ({ close, fetchData }) => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      console.log("No file selected");
      return;
    }

    try {
      setLoading(true);
      const upload = await uploadImage(file);
      console.log("Upload result:", upload);
      setCategoryData((prev) => ({ ...prev, image: upload.data.file.path }));
    } catch (error) {
      console.error("Error during file upload:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(categoryData, "catDataClient");

    try {
      const res = await Axios({
        ...summaryApi.add_category,
        data: categoryData,
      });
      if (res.data.success) {
        toast.success("category elave edildi");
        close();
        fetchData();
      }
    } catch (error) {
      axiosToastError(error);
    }
  };
  return (
    <section className=" fixed top-0 left-0 right-0 bottom-0 z-50 bg-[rgba(0,0,0,0.5)] h-full flex items-center justify-center">
      <div className=" bg-white max-w-4xl w-full p-3 rounded flex flex-col gap-2">
        <div className="text-neutral-700 w-full  flex items-center justify-between">
          <h1>Category</h1>
          <button onClick={close} className=" cursor-pointer">
            <IoMdClose size={22} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className=" grid gap-2 space-y-1 my-3">
          <div className=" grid gap-2">
            <label htmlFor="categoryName">Name</label>
            <input
              type="text"
              id="categoryName"
              value={categoryData.name}
              name="name"
              onChange={handleChange}
              className="p-2 bg-blue-50 outline-none border border-gray-400"
              placeholder="Enter category name"
            />
          </div>
          <div>
            <p className=" mb-1">Image</p>
            <div className=" flex gap-4 flex-col items-center lg:flex-row">
              <div className=" border border-gray-400 bg-blue-50 h-36 w-full lg:w-36 flex items-center rounded  justify-center">
                {categoryData.image ? (
                  <img
                    src={categoryData.image}
                    className=" w-full h-full object-scale-down"
                    alt="categoryimage"
                  />
                ) : (
                  <p className=" text-sm text-neutral-500">No Image</p>
                )}
              </div>
              <label htmlFor="uploadCategoryImage">
                <div
                  className={`${
                    categoryData.name ? "bg-amber-500" : "bg-gray-400"
                  } px-4 py-3 rounded h-12 cursor-pointer`}
                >
                  {loading ? "Loading ..." : "  Upload Image"}
                </div>
                <input
                  id="uploadCategoryImage"
                  type="file"
                  disabled={!categoryData.name}
                  name="image"
                  onChange={handleCategoryImage}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <button
            className={` ${
              categoryData.name && categoryData.image
                ? " bg-amber-500"
                : " bg-gray-400"
            } py-2 font-semibold cursor-pointer`}
            disabled={!categoryData.name || !categoryData.image}
          >
            Add Category
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;
