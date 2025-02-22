import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <div className=" border  border-gray-200">
      <div className=" container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2">
        <p>© All Rights Reserved 2025.</p>
        <div className=" flex items-center gap-4 justify-center text-2xl">
          <a href="">
            <FaFacebook />
          </a>
          <a href="">
            <FaInstagram />
          </a>
          <a href="">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
