import { useForm } from "react-hook-form";
import { Axios } from "../utility/axios";
import summaryApi from "../Config/SummaryApi";
import { toast } from "react-hot-toast";
import axiosToastError from "../utility/AxiosToastError";
import { useDispatch } from "react-redux";
import { addAddress } from "../Store/Slices/addressSlice";
import { IoMdClose } from "react-icons/io";

const AddAddress = ({ close }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const fetchAddress = async () => {
    try {
      const res = await Axios({ ...summaryApi.getAddress });
      if (res.data.success) {
        console.log(res.data);

        dispatch(addAddress(res.data.data));
      }
    } catch (error) {
      axiosToastError(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const res = await Axios({ ...summaryApi.addAddress, data });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchAddress();
        reset();
        close();
      }
    } catch (error) {
      axiosToastError(error);
    }
  };

  return (
    <section className="fixed top-0 right-0 bottom-0 left-0 z-50 bg-[rgba(0,0,0,0.5)] p-4 h-screen overflow-auto">
      <div className="bg-white max-w-lg w-full rounded p-4 mx-auto mt-8">
        <div className=" flex items-center justify-between">
          <h2 className="font-semibold">Add Address</h2>
          <button onClick={close} className=" cursor-pointer">
            <IoMdClose size={22} />
          </button>
        </div>
        <form
          className="grid gap-1 mt-4 space-y-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-1">
            <label htmlFor="addressLine">Address Line</label>
            <input
              id="addressLine"
              className="border border-neutral-400 outline-none p-2 bg-blue-50 rounded"
              type="text"
              {...register("address_line", {
                required: "Address Line is required",
              })}
            />
            {errors.address_line && (
              <p className="text-red-500 text-sm">
                {errors.address_line.message}
              </p>
            )}
          </div>

          <div className="grid gap-1">
            <label htmlFor="city">City</label>
            <input
              id="city"
              className="border border-neutral-400 outline-none p-2 bg-blue-50 rounded"
              type="text"
              {...register("city", { required: "City is required" })}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>

          <div className="grid gap-1">
            <label htmlFor="state">State</label>
            <input
              id="state"
              className="border border-neutral-400 outline-none p-2 bg-blue-50 rounded"
              type="text"
              {...register("state", { required: "State is required" })}
            />
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state.message}</p>
            )}
          </div>

          <div className="grid gap-1">
            <label htmlFor="pincode">Pincode</label>
            <input
              id="pincode"
              className="border border-neutral-400 outline-none p-2 bg-blue-50 rounded"
              type="text"
              {...register("pincode", {
                required: "Pincode is required",
                pattern: {
                  message: "Enter a valid pincode",
                },
              })}
            />
            {errors.pincode && (
              <p className="text-red-500 text-sm">{errors.pincode.message}</p>
            )}
          </div>

          <div className="grid gap-1">
            <label htmlFor="country">Country</label>
            <input
              id="country"
              className="border border-neutral-400 outline-none p-2 bg-blue-50 rounded"
              type="text"
              {...register("country", { required: "Country is required" })}
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>

          <div className="grid gap-1">
            <label htmlFor="mobile">Mobile No</label>
            <input
              id="mobile"
              className="border border-neutral-400 outline-none p-2 bg-blue-50 rounded"
              type="text"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  message: "Enter a valid 10-digit mobile number",
                },
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
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddAddress;
