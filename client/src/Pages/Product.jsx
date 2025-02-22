import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosToastError from "../utility/AxiosToastError";
import { Axios } from "../utility/axios";
import summaryApi from "../Config/SummaryApi";
import { setAllProduct } from "../Store/Slices/productSlices";

const Product = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const [page, setPage] = useState(1);

  const fetchProductData = async () => {
    try {
      const res = await Axios({
        ...summaryApi.get_product,
        data: { page: page },
      });
      if (res.data.success) {
        dispatch(setAllProduct(res.data.data));
      }
    } catch (error) {
      axiosToastError(error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  

  return <div>pro=admin</div>;
};

export default Product;
