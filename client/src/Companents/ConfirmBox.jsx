import { IoMdClose } from "react-icons/io";

const ConfirmBox = ({ cancel, confirm, close }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-[rgba(0,0,0,0.5)] h-full flex items-center justify-center">
      <div className=" bg-white max-w-md w-full p-4 rounded">
        <div className=" flex items-center justify-between ">
          <h1 className=" font-semibold">Permanent Close</h1>
          <IoMdClose onClick={close} size={22} className=" cursor-pointer" />
        </div>
        <p className=" my-4">Are you sure Permanent delete?</p>
        <div className=" w-fit ml-auto flex items-center gap-3">
          <button onClick={cancel} className=" px-4 py-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded cursor-pointer">
            Cancel
          </button>
          <button onClick={confirm} className=" px-4 py-1 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white  rounded cursor-pointer">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
