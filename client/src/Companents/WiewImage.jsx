import { IoMdClose } from "react-icons/io";

const WiewImage = ({ url,close }) => {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0  z-50 bg-[rgba(0,0,0,0.5)] p-4 flex items-center justify-center">
      <div className="max-w-md w-full p-4 bg-white max-h-[60vh] rounded-lg shadow-lg flex items-center justify-center flex-col relative">
        <button onClick={close} className=" text-neutral-600 cursor-pointer absolute right-2 top-2">
          <IoMdClose size={24} />
        </button>
        <img src={url}  className=" w-full h-full object-scale-down" />
      </div>    
    </div>
  );
};

export default WiewImage;
