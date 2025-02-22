import { useState } from "react";
import { FaCloudArrowUp } from "react-icons/fa6";
import uploadImage from "../utility/uploadImage";

import WiewImage from "../Companents/WiewImage";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import axiosToastError from "../utility/AxiosToastError";
import summaryApi from "../Config/SummaryApi";
import { Axios } from "../utility/axios";
import toast from "react-hot-toast";
import Loader from "../Companents/Loader";

const UploadProductPage = () => {
  const [uploadProductData, setUploadProductData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: 0,
    price: 0,
    discount: 0,
    description: "",
    // publish: false,
  });

  const [loading, setLoading] = useState(false);
  const [viewImageUrl, setViewImageUrl] = useState("");
  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.subCategory);

  const handleChange = (e) => {
    setUploadProductData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      console.log("No file selected");
      return;
    }

    try {
      setLoading(true);
      const upload = await uploadImage(file);

      setUploadProductData((prev) => ({
        ...prev,
        image: [...prev.image, upload.data.file.path],
      }));
    } catch (error) {
      console.error("Error during file upload:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (index) => {
    uploadProductData.image.splice(index, 1);
    setUploadProductData((prev) => ({ ...prev }));
  };
  const handleRemoveCategory = (index) => {
    setUploadProductData((prev) => ({
      ...prev,
      category: prev.category.filter((_, i) => i !== index),
    }));
  };
  const handleRemoveSubCategory = (index) => {
    setUploadProductData((prev) => ({
      ...prev,
      subCategory: prev.subCategory.filter((_, i) => i !== index),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios({
        ...summaryApi.add_product,
        data: uploadProductData,
      });
      if (res.data.success) {
        toast.success("Product uploaded successfully");
        setUploadProductData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: 0,
          price: 0,
          discount: 0,
          description: "",
        });
      }
    } catch (error) {
      axiosToastError(error);
    }
  };

  return (
    <section>
      <div className=" p-2 font-semibold bg-white shadow-md flex items-center justify-between ">
        <h2 className="font-semibold"> Upload Product</h2>
      </div>
      <div>
        <form className=" grid gap-4 p-4 space-y-1" onSubmit={handleSubmit}>
          {/* name */}
          <div className="grid gap-1">
            <label htmlFor="uploadProductName">Name</label>
            <input
              type="text"
              id="uploadProductName"
              name="name"
              className="p-2 bg-blue-50 outline-none border border-gray-400"
              value={uploadProductData.name}
              required
              placeholder="Enter your product name"
              onChange={handleChange}
            />
          </div>
          {/* desciption */}
          <div className="grid gap-1">
            <label htmlFor="uploadProductDesc">Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              required
              value={uploadProductData.description}
              className="p-2 bg-blue-50 outline-none border border-gray-400"
              id="uploadProductDesc"
              placeholder="Enter your product description"
            ></textarea>
          </div>
          {/* image */}
          <div>
            <p>Image</p>
            <div>
              <label
                htmlFor="uploadImageProduct"
                className=" bg-blue-50 p-2 h-26 border cursor-pointer border-neutral-400 rounded flex items-center justify-center"
              >
                <div className="text-center flex flex-col items-center gap-2 ">
                  {loading ? (
                    <Loader />
                  ) : (
                    <>
                      <FaCloudArrowUp size={36} />
                      <p className=" text-neutral-500 ">Upload Image</p>
                    </>
                  )}
                </div>
                <input
                  id="uploadImageProduct"
                  type="file"
                  className=" hidden"
                  accept=" image/*"
                  onChange={handleUploadImage}
                />
              </label>
              <div className=" my-2 flex flex-wrap gap-2">
                {uploadProductData.image.map((image, index) => (
                  <div
                    className=" h-20 w-20 min-w-20 max-h-20 bg-blue-50 border border-neutral-400 relative group p-2 overflow-hidden"
                    key={index}
                  >
                    <img
                      src={image}
                      alt="productimage"
                      className=" w-full h-full object-scale-down"
                      onClick={() => setViewImageUrl(image)}
                    />
                    <div
                      onClick={() => handleDeleteImage(index)}
                      className=" absolute bottom-0 right-1 p-1  cursor-pointer bg-red-600 text-white rounded hidden group-hover:block"
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* category */}
          <div>
            <label htmlFor="productCategory">Category</label>
            <div className=" grid gap-2 my-2">
              <label htmlFor="selectCategory">Select Category</label>
              <div className="grid gap-1">
                <select
                  value={uploadProductData.category}
                  onChange={(e) => {
                    const value = e.target.value;
                    const selectedCategory = allCategory.find(
                      (el) => el.id == value
                    );

                    if (selectedCategory) {
                      setUploadProductData((prev) => ({
                        ...prev,
                        category: [...prev.category, selectedCategory.id],
                      }));
                    }
                  }}
                  className=" bg-blue-50 border border-neutral-400 p-3 outline-none"
                >
                  <option>Select Category</option>
                  {allCategory.map((category) => (
                    <option key={category?.id} value={category?.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-wrap gap-2">
                {uploadProductData.category.map((categoryId, index) => {
                  const category = allCategory.find(
                    (cat) => cat.id == categoryId
                  );
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm bg-blue-50 mt-1 p-1"
                    >
                      <p>{category ? category.name : "Unknown Category"}</p>
                      <div
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => handleRemoveCategory(index)}
                      >
                        <IoMdClose size={18} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* subcategory */}
          <div>
            <label htmlFor="productCategory">Sub Category</label>
            <div className=" grid gap-2 my-2">
              <label htmlFor="selectCategory">Select Sub Category</label>
              <div className="grid gap-1">
                <select
                  value={uploadProductData.subCategory}
                  onChange={(e) => {
                    const value = e.target.value;
                    const selectedSubCategory = allSubCategory.find(
                      (el) => el.id == value
                    );

                    if (selectedSubCategory) {
                      setUploadProductData((prev) => ({
                        ...prev,
                        subCategory: [
                          ...prev.subCategory,
                          selectedSubCategory.id,
                        ],
                      }));
                    }
                  }}
                  className=" bg-blue-50 border border-neutral-400 p-3 outline-none"
                >
                  <option>Select Subcategory</option>
                  {allSubCategory.map((subcategory) => (
                    <option key={subcategory?.id} value={subcategory?.id}>
                      {subcategory.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-wrap gap-2">
                {uploadProductData.subCategory.map((categoryId, index) => {
                  const category = allSubCategory.find(
                    (cat) => cat.id == categoryId
                  );

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm bg-blue-50 mt-1 p-1"
                    >
                      <p>{category ? category.name : "Unknown Category"}</p>
                      <div
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => handleRemoveSubCategory(index)}
                      >
                        <IoMdClose size={18} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* unit */}
          <div className="grid gap-1">
            <label htmlFor="unit">Unit</label>
            <input
              type="text"
              id="unit"
              name="unit"
              className="p-2 bg-blue-50 outline-none border border-gray-400"
              value={uploadProductData.unit}
              required
              placeholder="Enter your product unit"
              onChange={handleChange}
            />
          </div>
          {/* stock */}
          <div className="grid gap-1">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              className="p-2 bg-blue-50 outline-none border border-gray-400"
              value={uploadProductData.stock}
              required
              placeholder="Enter your product stock"
              onChange={handleChange}
            />
          </div>
          {/* price */}
          <div className="grid gap-1">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              className="p-2 bg-blue-50 outline-none border border-gray-400"
              value={uploadProductData.price}
              required
              placeholder="Enter your product price"
              onChange={handleChange}
            />
          </div>
          {/* discount */}
          <div className="grid gap-1">
            <label htmlFor="discount">discount</label>
            <input
              type="number"
              id="discount"
              name="discount"
              className="p-2 bg-blue-50 outline-none border border-gray-400"
              value={uploadProductData.discount}
              required
              placeholder="Enter your product discount"
              onChange={handleChange}
            />
          </div>
          {/* submit */}
          <button
            className=" bg-amber-400 py-2 rounded font-semibold cursor-pointer text-white"
            type="submit"
          >
            Upload Product
          </button>
        </form>
      </div>

      {viewImageUrl && (
        <WiewImage url={viewImageUrl} close={() => setViewImageUrl("")} />
      )}
    </section>
  );
};

export default UploadProductPage;
