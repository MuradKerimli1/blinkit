import { useState } from "react";
import toast from "react-hot-toast";
import { Axios } from "../utility/axios";
import summaryApi from "../Config/SummaryApi";
import axiosToastError from "../utility/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [forgotData, setForgotData] = useState({
    email: "",
  });

  const validetForgotValue = Object.values(forgotData).every((el) => el);
  const navigate = useNavigate();

  const handleRegisterData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForgotData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Axios({
        ...summaryApi.forgot_password,
        data: forgotData,
      });
      if (res.data.success) {
        toast.success(res.data.message);

        navigate("/verification-otp", { state: forgotData });
        setForgotData({
          email: "",
        });
      }
    } catch (error) {
      console.log(error.response.data.message);
      axiosToastError(error);
    }
  };

  return (
    <section className="flex items-center justify-center container h-[65vh] w-full  ">
      <div className=" bg-white  w-full max-w-lg mx-auto  rounded p-4">
        <p className=" text-center text-green-600 text-2xl font-bold">
          Forgot Password
        </p>
        <form
          className="grid gap-2 mt-6 space-y-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="grid gap-1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={forgotData.email}
              onChange={(e) => handleRegisterData(e)}
              className="bg-blue-50 p-2 rounded"
              placeholder="Enter your email"
            />
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
            Send Otp
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

export default ForgotPasswordPage;
