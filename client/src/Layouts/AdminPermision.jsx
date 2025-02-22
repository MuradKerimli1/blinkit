import { useSelector } from "react-redux";
import isAdmin from "../utility/isAdmin";

const AdminPermision = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  if (!user) {
    return;
  }
  return (
    <div>
      {isAdmin(user?.role) ? (
        children
      ) : (
        <p className=" text-red-500 bg-red-200 p-4"> Dont have permision</p>
      )}
    </div>
  );
};

export default AdminPermision;
