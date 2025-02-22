import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Axios } from "../utility/axios";
import summaryApi from "../Config/SummaryApi";
import axiosToastError from "../utility/AxiosToastError";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  
  const [otpData, setOtpData] = useState(["", "", "", "", "", ""]);

  const validetForgotValue = otpData.every((el) => el);

  const inputRef = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Axios({
        ...summaryApi.forgot_password_verification,
        data: {
          otp: otpData.join(""),
          email: location.state.email,
        },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setOtpData(["", "", "", "", "", ""]);
        navigate("/reset-password", {
          state: {
            email: location?.state?.email,
            data: res.data,
          },
        });
      }
    } catch (error) {
      console.log(error.response.data.message);
      axiosToastError(error);
    }
  };

  return (
    <section className="flex items-center justify-center container h-[65vh] w-full ">
      <div className=" bg-white  w-full max-w-lg mx-auto  rounded p-4">
        <p className=" text-center text-green-600 text-2xl font-bold">
          Enter OTP
        </p>
        <form
          className="grid gap-2 mt-6 space-y-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="grid gap-1">
            <label htmlFor="otp">Enter Your OTP:</label>
            <div className=" flex items-center gap-2 justify-between mt-2">
              {otpData.map((item, index) => {
                return (
                  <>
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      key={index}
                      ref={(ref) => (inputRef.current[index] = ref)}
                      value={otpData[index]}
                      maxLength={1}
                      onChange={(e) => {
                        const value = e.target.value;
                        const data = [...otpData];
                        data[index] = value;
                        setOtpData(data);
                        if (value && index < 5) {
                          inputRef.current[index + 1].focus();
                        }
                      }}
                      required
                      className="bg-blue-50 w-full mx-auto max-w-16 border border-neutral-400 outline-none p-2 rounded"
                    />
                  </>
                );
              })}
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
            Verify Otp
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

export default OtpVerification;
