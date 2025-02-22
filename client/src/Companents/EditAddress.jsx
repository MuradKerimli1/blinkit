import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Axios } from "../utility/axios";
import summaryApi from "../Config/SummaryApi";
import { toast } from "react-hot-toast";
import axiosToastError from "../utility/AxiosToastError";
import { useDispatch } from "react-redux";
import { addAddress } from "../Store/Slices/addressSlice";
import { IoMdClose } from "react-icons/io";

const EditAddress = ({ close, editData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    if (editData) {
      reset(editData);
    }
  }, [editData, reset]);

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

  const onSubmit = async (data) => {
    try {
      const res = await Axios({
        ...summaryApi.updateAddress,
        data,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        fetchAddress();
        close();
      }
    } catch (error) {
      axiosToastError(error);
    }
  };

  return (
    <section className="fixed top-0 right-0 bottom-0 left-0 z-50 bg-[rgba(0,0,0,0.5)] p-4 h-screen overflow-auto">
      <div className="bg-white max-w-lg w-full rounded p-4 mx-auto mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">
            {editData ? "Edit Address" : "Add Address"}
          </h2>
          <button onClick={close} className="cursor-pointer">
            <IoMdClose size={22} />
          </button>
        </div>
        <form
          className="grid gap-1 mt-4 space-y-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          {[
            { label: "Address Line", name: "address_line" },
            { label: "City", name: "city" },
            { label: "State", name: "state" },
            { label: "Country", name: "country" },
          ].map(({ label, name }) => (
            <div key={name} className="grid gap-1">
              <label htmlFor={name}>{label}</label>
              <input
                id={name}
                className="border border-neutral-400 outline-none p-2 bg-blue-50 rounded"
                type="text"
                {...register(name, { required: `${label} is required` })}
              />
              {errors[name] && (
                <p className="text-red-500 text-sm">{errors[name].message}</p>
              )}
            </div>
          ))}

          {/* Pincode */}
          <div className="grid gap-1">
            <label htmlFor="pincode">Pincode</label>
            <input
              id="pincode"
              className="border border-neutral-400 outline-none p-2 bg-blue-50 rounded"
              type="text"
              {...register("pincode", {
                required: "Pincode is required",
              })}
            />
            {errors.pincode && (
              <p className="text-red-500 text-sm">{errors.pincode.message}</p>
            )}
          </div>

          {/* Mobile */}
          <div className="grid gap-1">
            <label htmlFor="mobile">Mobile No</label>
            <input
              id="mobile"
              className="border border-neutral-400 outline-none p-2 bg-blue-50 rounded"
              type="number"
              {...register("mobile", {
                required: "Mobile number is required",
              })}
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-amber-400 mt-3 w-full p-2 font-semibold hover:bg-amber-300 cursor-pointer"
          >
            {editData ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditAddress;
