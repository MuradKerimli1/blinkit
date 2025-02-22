import { useDispatch, useSelector } from "react-redux";
import { FaCircleUser } from "react-icons/fa6";
import UserProfileAvatarEdit from "../Companents/UserProfileAvatarEdit";
import { useEffect, useState } from "react";
import axiosToastError from "../utility/AxiosToastError";
import { Axios } from "../utility/axios";
import summaryApi from "../Config/SummaryApi";
import toast from "react-hot-toast";
import { fetchUserDetails } from "../utility/fetchUserDetails";
import { setUserDetails } from "../Store/Slices/userSlices";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
      });
    }
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await Axios({
        ...summaryApi.update_user_details,
        data: profileData,
      });
      console.log(res);

      if (res.data.success) {
        toast.success(res.data.message);
        const user = await fetchUserDetails();
        dispatch(setUserDetails(user?.user));
      }
    } catch (error) {
      axiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Avatar upload */}
      <div className=" w-20 h-20  flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
        {user?.avatar ? (
          <img src={user?.avatar} alt="avatar" />
        ) : (
          <FaCircleUser size={70} />
        )}
      </div>
      <button
        onClick={() => setProfileAvatarEdit((prev) => !prev)}
        className="text-xs border border-neutral-300 px-3 py-1 rounded-full mt-5 cursor-pointer"
      >
        Edit
      </button>
      {openProfileAvatarEdit && (
        <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
      )}
      {/* other details */}
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col space-y-1 gap-1 mt-3"
      >
        <div className=" grid gap-1">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            id="name"
            required
            onChange={handleOnChange}
            value={profileData.name}
            className=" p-2 bg-blue-50 outline-none border border-gray-400"
          />
        </div>
        <div className=" grid gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            name="email"
            required
            onChange={handleOnChange}
            value={profileData.email}
            className=" p-2 bg-blue-50 outline-none border border-gray-400"
          />
        </div>
        <div className=" grid gap-1">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="number"
            placeholder="Enter your mobile"
            id="mobile"
            name="mobile"
            onChange={handleOnChange}
            value={profileData.mobile || ""}
            className=" p-2 bg-blue-50 outline-none border border-gray-400"
          />
        </div>
        <button
          type="submit"
          className=" rounded px-4 py-2 font-semibold  w-full cursor-pointer mt-2 bg-transparent border text-amber-400 hover:text-black border-amber-300 hover:bg-amber-200"
        >
          {loading ? "Loading ..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
