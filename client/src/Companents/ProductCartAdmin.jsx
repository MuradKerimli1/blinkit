import { useState } from "react";
import EditProductAdmin from "./EditProductAdmin";
import ConfirmBox from "./ConfirmBox";
import axiosToastError from "../utility/AxiosToastError";
import { Axios } from "../utility/axios";
import summaryApi from "../Config/SummaryApi";
import toast from "react-hot-toast";

const ProductCartAdmin = ({ data, fetchProductData }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await Axios({
        ...summaryApi.deleteProduct,
        data: {
          productId: data.id,
        },
      });

      if (res.data.success) {
        setOpenConfirm(false);
        toast.success(res.data.message);
        fetchProductData();
      }
    } catch (error) {
      axiosToastError(error);
    }
  };
  return (
    <div className="w-full  h-auto p-4 border border-neutral-200 rounded-lg shadow-md bg-white">
      <div className="w-full h-30 relative">
        <img
          src={data?.image[0]}
          className="w-full h-full object-scale-down rounded-lg"
          alt="productImage"
        />
      </div>
      <div className=" flex items-center flex-col justify-center">
        <p className="mt-2 text-sm  lg:text-md  font-medium capitalize text-gray-800 line-clamp-2">
          {data?.name}
        </p>
        <p className="text-sm text-gray-600 capitalize">{data?.unit}</p>
      </div>
      <div className=" grid grid-cols-2 gap-3 py-2">
        <button
          onClick={() => {
            setEditOpen((prev) => !prev);
          }}
          className=" border px-1 py-1 text-sm border-green-600 bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer rounded"
        >
          Edit
        </button>
        <button
          onClick={() => {
            setOpenConfirm(true);
          }}
          className=" border px-1 py-1 text-sm border-red-600 bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer rounded"
        >
          Delete
        </button>
      </div>
      {editOpen && (
        <EditProductAdmin
          data={data}
          close={() => setEditOpen(false)}
          fetchProductData={fetchProductData}
        />
      )}
      {openConfirm && (
        <ConfirmBox
          close={() => setOpenConfirm(false)}
          cancel={() => setOpenConfirm(false)}
          confirm={handleDelete}
        />
      )}
    </div>
  );
};

export default ProductCartAdmin;
