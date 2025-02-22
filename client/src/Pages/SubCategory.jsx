import { useEffect, useState } from "react";
import UploadSubCategoryModel from "../Companents/UploadSubCategoryModel";
import axiosToastError from "../utility/AxiosToastError";
import { Axios } from "../utility/axios";
import summaryApi from "../Config/SummaryApi";
import DisplayTable from "../Companents/DisplayTable";
import { createColumnHelper } from "@tanstack/react-table";
import WiewImage from "../Companents/WiewImage";
import { MdDelete, MdEdit } from "react-icons/md";

import ConfirmBox from "../Companents/ConfirmBox";
import toast from "react-hot-toast";
import EditSubCategory from "../Companents/EditSubCategory";

const SubCategory = () => {
  const [openAddSubCategory, setOpenSubCategory] = useState(false);
  const [subCategory, setSubCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deletedSubCategory, setDeletedSubCategory] = useState(null);
  const [openConfirmBox, setConfirmBox] = useState(false);

  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const res = await Axios({ ...summaryApi.get_subcategory });
      if (res.data.success) {
        setSubCategory(res.data.data);
      }
    } catch (error) {
      axiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSubCategory();
  }, []);

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => {
        return (
          <div className=" flex items-center justify-center">
            <img
              src={row.original.image}
              onClick={() => setImageUrl(row.original.image)}
              alt="img"
              className=" w-full h-10 object-scale-down"
            />
          </div>
        );
      },
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => {
        return <span>{row.original.category.name}</span>;
      },
    }),
    columnHelper.accessor("id", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className=" flex items-center justify-center gap-3">
            <button
              onClick={() => {
                console.log(row, "row");
                setEditData(() => row.original);
                setOpenEdit(true);
              }}
              className="p-2 bg-green-100 rounded-full text-green-600 cursor-pointer"
            >
              <MdEdit size={20} />
            </button>

            <button
              onClick={() =>
                setConfirmBox(
                  (prev) => !prev,
                  setDeletedSubCategory(row.original.id)
                )
              }
              className="p-2 bg-red-100 rounded-full text-red-500 cursor-pointer "
            >
              <MdDelete size={20} />
            </button>
          </div>
        );
      },
    }),
  ];

  const handleDeleteSubCategory = async () => {
    try {
      console.log(deletedSubCategory);

      const res = await Axios({
        ...summaryApi.delete_subcategory,
        data: { subCategoryid: deletedSubCategory },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchSubCategory();
        setConfirmBox(false);
      }
    } catch (error) {
      axiosToastError(error);
    }
  };

  return (
    <section>
      <div className="p-2 font-semibold bg-white shadow-md flex items-center justify-between ">
        <h2 className="font-semibold">Sub Category</h2>
        <button
          onClick={() => setOpenSubCategory((prev) => !prev)}
          className=" px-3 py-1 rounded text-sm border border-amber-300 cursor-pointer hover:bg-amber-400 "
        >
          Add Sub Category
        </button>
      </div>
      <div className="overflow-auto w-full">
        <DisplayTable data={subCategory} columns={columns} />
      </div>
      {openAddSubCategory && (
        <UploadSubCategoryModel
          close={() => setOpenSubCategory(false)}
          fetchSubCategory={fetchSubCategory}
        />
      )}
      {imageUrl && <WiewImage url={imageUrl} close={() => setImageUrl("")} />}
      {openEdit && (
        <EditSubCategory
          close={() => setOpenEdit(false)}
          data={editData}
          fetchSubCategory={fetchSubCategory}
        />
      )}
      {openConfirmBox && (
        <ConfirmBox
          close={() => setConfirmBox(false)}
          cancel={() => setConfirmBox(false)}
          confirm={handleDeleteSubCategory}
        />
      )}
    </section>
  );
};

export default SubCategory;
