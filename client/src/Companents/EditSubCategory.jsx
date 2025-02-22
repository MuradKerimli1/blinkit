import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import uploadImage from "../utility/uploadImage";
import { useSelector } from "react-redux";
import axiosToastError from "../utility/AxiosToastError";
import { Axios } from "../utility/axios";
import summaryApi from "../Config/SummaryApi";
import toast from "react-hot-toast";

const EditSubCategory = ({ close, data, fetchSubCategory }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    name: data?.name,
    image: data?.image,
    categoryId: data?.category.id,
  });

  const [loading, setLoading] = useState(false);
  const allCategory = useSelector((state) => state.product.allCategory);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryData((prev) => ({ ...prev, [name]: value }));
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
      setSubCategoryData((prev) => ({ ...prev, image: upload.data.file.path }));
    } catch (error) {
      console.error("Error during file upload:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(data);

    try {
      const res = await Axios({
        ...summaryApi.edit_subcategory,
        data: {
          ...subCategoryData,
          subCategoryid: data.id,
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        close();
        fetchSubCategory();
      }
    } catch (error) {
      axiosToastError(error);
    }
  };
  return (
    <section className="fixed top-0 right-0 bottom-0 left-0  z-50 bg-[rgba(0,0,0,0.5)] p-4 flex items-center justify-center">
      <div className="bg-white max-w-4xl  w-full rounded p-4">
        <div className="text-neutral-700 w-full shadow-md p-2  flex items-center justify-between">
          <h1 className="font-semibold">Edit Sub Category</h1>
          <button onClick={close} className=" cursor-pointer">
            <IoMdClose size={22} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className=" grid gap-2 space-y-1 my-3">
          <div className="grid gap-2">
            <label htmlFor="subcategoryName">Sub Category Name</label>
            <input
              type="text"
              id="subcategoryName"
              value={subCategoryData.name}
              name="name"
              onChange={handleChange}
              className="p-2 bg-blue-50 outline-none border border-gray-400"
              placeholder="Enter Sub Category name"
            />
          </div>
          <div>
            <p className="mb-1">Image</p>
            <div className="flex gap-4 flex-col items-center lg:flex-row">
              <div className=" border border-gray-400 bg-blue-50 h-36 w-full lg:w-36 flex items-center rounded  justify-center">
                {subCategoryData.image ? (
                  <img
                    src={subCategoryData.image}
                    className=" w-full h-full object-scale-down"
                    alt="subcategoryimage"
                  />
                ) : (
                  <p className=" text-sm text-neutral-500">No Image</p>
                )}
              </div>
              <label htmlFor="uploadsubCategoryImage">
                <div
                  className={`${
                    subCategoryData.name ? "bg-amber-500" : "bg-gray-400"
                  } px-4 py-3 rounded h-12 cursor-pointer`}
                >
                  {loading ? "Loading ..." : "  Upload Image"}
                </div>
                <input
                  id="uploadsubCategoryImage"
                  type="file"
                  disabled={!subCategoryData.name}
                  name="image"
                  onChange={handleCategoryImage}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          {/* category */}
          <div className=" grid gap-2 my-2">
            <label htmlFor="selectCategory">Select Category</label>
            <div className=" grid gap-1">
              <select
                value={subCategoryData.categoryId}
                onChange={(e) => {
                  const value = e.target.value;
                  const selectedCategory = allCategory.find(
                    (el) => el.id == value
                  );

                  if (selectedCategory) {
                    setSubCategoryData((prev) => ({
                      ...prev,
                      categoryId: value,
                    }));
                  }
                }}
                className=" bg-blue-50 border border-neutral-400 p-3 outline-none"
              >
                <option value={""}></option>
                {allCategory.map((category) => (
                  <option key={category?.id} value={category?.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className={` ${
              subCategoryData.name &&
              subCategoryData.image &&
              subCategoryData.categoryId
                ? " bg-amber-500"
                : " bg-gray-400"
            } py-2 font-semibold cursor-pointer`}
            disabled={
              !subCategoryData.name ||
              !subCategoryData.image ||
              !subCategoryData.categoryId
            }
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditSubCategory;
