import UserMenu from "../Companents/UserMenu";
import { IoMdClose } from "react-icons/io";

const UserMenuMobile = () => {
  return (
    <section className="w-full h-full  bg-white relative">
      <button onClick={()=>window.history.back()} className="text-neutral-800 block w-fit  ml-auto cursor-pointer absolute left-0 right-0 p-2">
        <IoMdClose size={25} />
      </button>
      <div className="container mx-auto px-3 py-5">
        <UserMenu />
      </div>
    </section>
  );
};

export default UserMenuMobile;
