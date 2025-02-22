import { useEffect, useState } from "react";
import UploadCategoryModel from "../Companents/UploadCategoryModel";
import axiosToastError from "../utility/AxiosToastError";
import { Axios } from "../utility/axios";
import summaryApi from "../Config/SummaryApi";

import NoneData from "../Companents/NoneData";
import EditCategory from "../Companents/EditCategory";
import ConfirmBox from "../Companents/ConfirmBox";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { fetchCategory } from "../utility/fetchCategory";
import Loader from "../Companents/Loader";

const CategoryPage = () => {
  const [uploadCategoryModel, setCategoryModel] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: "",
    categoryId: "",
  });
  const [openConfirmBox, setConfirmBox] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({
    categoryId: "",
  });
  const allCategory = useSelector((state) => state.product.allCategory);
  const loading = useSelector((state) => state.product.categoryLoading);
  const dispatch = useDispatch();

  

  const handleDeleteCategory = async () => {
    try {
      const res = await Axios({
        ...summaryApi.delete_category,
        data: deleteCategory,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchCategory(dispatch);
        setConfirmBox(false);
      }
    } catch (error) {
      axiosToastError(error);
    }
  };

  return (
    <section>
      <div className=" p-2 font-semibold bg-white shadow-md flex items-center justify-between ">
        <h2 className="font-semibold">Category</h2>
        <button
          onClick={() => setCategoryModel((prev) => !prev)}
          className=" px-3 py-1 rounded text-sm border border-amber-300 cursor-pointer hover:bg-amber-400 "
        >
          Add Category
        </button>
      </div>
      {loading && <Loader />}

      {!allCategory[0] && !loading && <NoneData />}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
        {allCategory?.map((category) => {
          return (
            <div
              key={category._id}
              className="w-full h-full bg-white p-3 group rounded-lg shadow-md overflow-hidden flex items-center flex-col justify-between hover:shadow-lg transition-all duration-300"
            >
              <div className=" flex items-center justify-center flex-col">
                <img
                  alt={category.name}
                  src={category.image}
                  className="w-full h-32 object-scale-down"
                />
                <div className="p-2">
                  <p className="text-center text-sm max-w-20 line-clamp-2  font-semibold text-natural-500">
                    {category.name}
                  </p>
                </div>
              </div>
              <div className="items-center h-9 flex gap-2 w-full">
                <button
                  onClick={() => {
                    setOpenEdit(true);

                    setEditData((prev) => ({
                      ...prev,
                      name: category.name,
                      image: category.image,
                      categoryId: category.id,
                    }));
                  }}
                  className="flex-1 cursor-pointer bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setConfirmBox(true);
                    setDeleteCategory((prev) => ({ categoryId: category.id }));
                  }}
                  className="flex-1 cursor-pointer bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {uploadCategoryModel && (
        <UploadCategoryModel
          fetchData={() => fetchCategory(dispatch)}
          close={() => setCategoryModel(false)}
        />
      )}
      {openEdit && (
        <EditCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={() => fetchCategory(dispatch)}
        />
      )}
      {openConfirmBox && (
        <ConfirmBox
          close={() => setConfirmBox(false)}
          cancel={() => setConfirmBox(false)}
          confirm={handleDeleteCategory}
        />
      )}
    </section>
  );
};

export default CategoryPage;
