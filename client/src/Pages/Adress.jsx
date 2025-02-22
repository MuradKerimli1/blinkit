import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddAddress from "../Companents/AddAddress";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import EditAddress from "../Companents/EditAddress";
import ConfirmBox from "../Companents/ConfirmBox";
import axiosToastError from "../utility/AxiosToastError";
import { Axios } from "../utility/axios";
import summaryApi from "../Config/SummaryApi";
import toast from "react-hot-toast";
import { addAddress } from "../Store/Slices/addressSlice";
const Adress = () => {
  const addressList = useSelector((state) => state.address.addressList);
  const [openAddress, setOpenAddress] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const dispatch = useDispatch();

  const fetchAddress = async () => {
    try {
      const res = await Axios({ ...summaryApi.getAddress });
      if (res.data.success) {
        dispatch(addAddress(res.data.data));
      }
    } catch (error) {
      axiosToastError(error);
    }
  };

  const handleDeleteAddress = async () => {
    try {
      const res = await Axios({
        ...summaryApi.deleteAddress,
        data: {
          id: deleteData,
        },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setOpenDelete(false);
        fetchAddress();
      }
    } catch (error) {
      axiosToastError(error);
    }
  };


  return (
    <div className="">
      <div className=" bg-white shadow-md p-2 flex items-center justify-between ">
        <h2 className=" font-semibold text-ellipsis line-clamp-1">Address</h2>
        <button
          onClick={() => setOpenAddress((prev) => !prev)}
          className=" border border-amber-500 text-amber-500  cursor-pointer px-3 py-1 rounded-full"
        >
          Add Address
        </button>
      </div>
      <div className={`bg-blue-50 ${addressList.length>0 && 'p-2'}    grid gap-4 mt-2`}>
        {addressList.map((a, index) => {
          return (
            <div
              className=" border border-neutral-300 rounded p-4 flex gap-3 bg-white"
              key={index}
            >
              <div className=" w-full">
                <p>{a.address_line}</p>
                <p>{a.city}</p>
                <p>{a.state}</p>
                <p>
                  {a.country}-{a.pincode}
                </p>
                <p>{a.mobile}</p>
              </div>
              <div className=" flex items-center gap-3">
                <div
                  onClick={() => {
                    setEditData(a);
                    setOpenEdit((prev) => !prev);
                  }}
                  className="bg-green-200 p-2 rounded hover: text-green-800 hover:bg-green-500 cursor-pointer"
                >
                  <MdEdit size={20} />
                </div>
                <div
                  onClick={() => {
                    setDeleteData(a.id);
                    setOpenDelete((prev) => !prev);
                  }}
                  className="bg-red-200 p-2 cursor-pointer rounded text-red-500 hover:text-white hover:bg-red-500"
                >
                  <MdDelete size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
      {openEdit && (
        <EditAddress editData={editData} close={() => setOpenEdit(false)} />
      )}
      {openDelete && (
        <ConfirmBox
          close={() => setOpenDelete(false)}
          cancel={() => setOpenDelete(false)}
          confirm={() => handleDeleteAddress()}
        />
      )}
    </div>
  );
};

export default Adress;
