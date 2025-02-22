import { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Axios } from "../utility/axios";
import summaryApi from "../Config/SummaryApi";
import axiosToastError from "../utility/AxiosToastError";
import { updatedAvatar } from "../Store/Slices/userSlices";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-hot-toast";

const UserProfileAvatarEdit = ({ close }) => {
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleUploadAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);
      const res = await Axios({ ...summaryApi.upload_avatar, data: formData });
      const avatar = res?.data?.avatar;
      dispatch(updatedAvatar(avatar));
      toast.success("avatar changed");
    } catch (error) {
      axiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed top-0 right-0 bottom-0 left-0  z-50 bg-[rgba(0,0,0,0.5)] p-4 flex items-center justify-center">
      <div className="bg-white max-w-sm w-full rounded p-4 flex items-center justify-center flex-col">
        <button
          onClick={close}
          className=" text-neutral-800  ml-auto cursor-pointer"
        >
          <IoMdClose size={23} />
        </button>
        <div className=" w-20 h-20  flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
          {user?.avatar ? (
            <img src={user?.avatar} alt="avatar" />
          ) : (
            <FaCircleUser size={70} />
          )}
        </div>
        <div>
          <label htmlFor="uploadProfile">
            <div className=" border border-gray-500 px-4 py-1 rounded-2xl cursor-pointer mt-3">
              {loading ? "Loading ..." : "Upload"}
            </div>
          </label>
          <input
            onChange={handleUploadAvatar}
            type="file"
            id="uploadProfile"
            className="hidden"
          />
        </div>
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
