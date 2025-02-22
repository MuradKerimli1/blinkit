import { Outlet } from "react-router-dom";
import UserMenu from "../Companents/UserMenu";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <section className="bg-white w-full ">
      <div className="container w-full mx-auto p-3 grid  lg:grid-cols-[250px_1fr]">
        <div className=" py-4 sticky top-24 hidden  lg:block overflow-y-auto border-r border-gray-300">
          <UserMenu />
        </div>
        <div className="bg-white p-4  max-h-[77vh] h-[77vh] overflow-auto">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
