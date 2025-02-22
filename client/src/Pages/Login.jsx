import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";

import { useState } from "react";
import toast from "react-hot-toast";
import { Axios } from "../utility/axios";
import summaryApi from "../Config/SummaryApi";
import axiosToastError from "../utility/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserDetails } from "../utility/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../Store/Slices/userSlices";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validetRegisterValue = Object.values(loginData).every((el) => el);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegisterData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await Axios({
        ...summaryApi.login,
        data: loginData,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem("accessToken", res.data.data.accessToken);
        localStorage.setItem("refreshToken", res.data.data.refreshToken);

        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails.user));
        setLoginData({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data.message);
      axiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center container h-[70vh] w-full  ">
      <div className=" bg-white  w-full  max-w-lg mx-auto  rounded p-4">
        <p className=" text-center text-green-600 text-2xl font-bold">
          Welcome to Binkeyit
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
              value={loginData.email}
              onChange={(e) => handleRegisterData(e)}
              className="bg-blue-50 p-2 rounded"
              placeholder="Enter your email"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Password:</label>
            <div className=" relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={loginData.password}
                required
                onChange={(e) => handleRegisterData(e)}
                className="bg-blue-50 p-2 rounded w-full"
                placeholder="Enter your password"
              />
              <div
                className="absolute right-0 top-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <IoEye size={20} /> : <IoMdEyeOff size={20} />}
              </div>
            </div>
            <Link
              to={"/forgot-password"}
              className=" block ml-auto hover:text-green-400"
            >
              Forgot Password ?
            </Link>
          </div>

          <button
            type="submit"
            disabled={!validetRegisterValue}
            className={`${
              validetRegisterValue ? "bg-green-700" : "bg-gray-500"
            } text-white py-2 rounded w-full cursor-pointer ${
              validetRegisterValue
                ? "hover:bg-green-800"
                : " hover:cursor-not-allowed"
            } ${
              loading && "bg-green-800  "
            }  transition-colors my-3 duration-200 font-bold`}
          >
            {loading ? "..loading" : "login"}
          </button>
        </form>
        <p>
          Dont have an Accaunt ?{" "}
          <Link
            className=" text-green-700 hover:text-green-800 font-semibold"
            to={"/register"}
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
