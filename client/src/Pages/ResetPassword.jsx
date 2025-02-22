import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Axios } from "../utility/axios";
import summaryApi from "../Config/SummaryApi";
import toast from "react-hot-toast";
import axiosToastError from "../utility/AxiosToastError";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [resetPassData, setResetPassData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const validetForgotValue = Object.values(resetPassData).every((el) => el);

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }

    if (location?.state?.email) {
      setResetPassData((prev) => ({
        ...prev,
        email: location?.state?.email,
      }));
    }
  }, []);

  const handleResetData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setResetPassData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (resetPassData.confirmPassword !== resetPassData.newPassword) {
      return toast.error("New password and confirm password must be same");
    }

    try {
      const res = await Axios({
        ...summaryApi.reset_password,
        data: resetPassData,
      });
      if (res.data.success) {
        toast.success(res.data.message);

        setResetPassData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response.data.message);
      axiosToastError(error);
    }
  };

  return (
    <section className="flex items-center justify-center container h-[68vh] w-full ">
      <div className=" bg-white  w-full max-w-lg mx-auto  rounded p-4">
        <p className=" text-center text-green-600 text-2xl font-bold">
          Enter Your New Password
        </p>
        <form
          className="grid gap-2 mt-6 space-y-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="grid gap-1">
            <label htmlFor="newpassword">New Password:</label>
            <div className=" relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="newpassword"
                name="newPassword"
                value={resetPassData.newPassword}
                required
                onChange={(e) => handleResetData(e)}
                className="bg-blue-50 p-2 rounded w-full"
                placeholder="Enter your new password"
              />
              <div
                className="absolute right-0 top-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <IoEye size={20} /> : <IoMdEyeOff size={20} />}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <div className=" relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={resetPassData.confirmPassword}
                onChange={(e) => handleResetData(e)}
                required
                className="bg-blue-50 p-2 rounded w-full"
                placeholder="Enter your Confirm Password"
              />
              <div
                className="absolute right-0 top-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <IoEye size={20} />
                ) : (
                  <IoMdEyeOff size={20} />
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!validetForgotValue}
            className={`${
              validetForgotValue ? "bg-green-700" : "bg-gray-500"
            } text-white py-2 rounded w-full cursor-pointer ${
              validetForgotValue
                ? "hover:bg-green-800"
                : " hover:cursor-not-allowed"
            }  transition-colors my-3 duration-200 font-bold`}
          >
            Change Password
          </button>
        </form>
        <p>
          Already have an accaunt ?{" "}
          <Link
            className=" text-green-700 hover:text-green-800 font-semibold"
            to={"/login"}
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;
