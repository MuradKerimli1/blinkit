import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import { Axios } from "../utility/axios";
import summaryApi from "../Config/SummaryApi";
import { logout } from "../Store/Slices/userSlices";
import { toast } from "react-hot-toast";
import axiosToastError from "../utility/AxiosToastError";
import { FiExternalLink } from "react-icons/fi";
import isAdmin from "../utility/isAdmin";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await Axios({ ...summaryApi.logout });
      if (res.data.sucess) {
        dispatch(logout());
        localStorage.clear();
        close();
        toast.success("Logout Successfuly");
        navigate("/");
      }
    } catch (error) {
      axiosToastError(error);
    }
  };

  return (
    <div>
      <div className="font-semibold">My Accaunt</div>
      <div className="text-sm flex items-center gap-3">
        <span className=" max-w-52 text-ellipsis line-clamp-1">
          {" "}
          {user?.name} 
           <span className=" font-md text-red-400">{user?.role === "ADMIN" ? " (Admin)" : ""}</span>
        </span>
        <Link
          to={"/dashboard/profile"}
          onClick={close}
          className=" hover:text-amber-200"
        >
          <FiExternalLink size={16} />
        </Link>{" "}
      </div>
      <Divider />
      <div className=" text-sm grid gap-2 ">
        {isAdmin(user?.role) && (
          <Link
            onClick={close}
            to={"/dashboard/category"}
            className=" px-2 hover:bg-orange-200 py-1"
          >
            Category
          </Link>
        )}
        {isAdmin(user?.role) && (
          <Link
            onClick={close}
            to={"/dashboard/subcategory"}
            className=" px-2 hover:bg-orange-200 py-1"
          >
            Sub Category
          </Link>
        )}
        {isAdmin(user?.role) && (
          <Link
            onClick={close}
            to={"/dashboard/upload-product"}
            className=" px-2 hover:bg-orange-200 py-1"
          >
            Upload Product
          </Link>
        )}
        {isAdmin(user?.role) && (
          <Link
            onClick={close}
            to={"/dashboard/product"}
            className=" px-2 hover:bg-orange-200 py-1"
          >
            Product
          </Link>
        )}

        <Link
          onClick={close}
          to={"/dashboard/myorders"}
          className=" px-2 hover:bg-orange-200 py-1"
        >
          My Orders
        </Link>
        <Link
          onClick={close}
          to={"/dashboard/address"}
          className=" px-2  hover:bg-orange-200 py-1"
        >
          Save Adress
        </Link>
        <button
          onClick={handleLogout}
          className="text-left  px-2 cursor-pointe  hover:bg-orange-200 py-1r"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
