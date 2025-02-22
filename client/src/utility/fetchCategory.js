import summaryApi from "../Config/SummaryApi";
import {
  setAllCategory,
  setCategoryLoading,
} from "../Store/Slices/productSlices";
import { Axios } from "./axios";
import axiosToastError from "./AxiosToastError";

export const fetchCategory = async (dispatch) => {
  try {
    dispatch(setCategoryLoading(true));
    const res = await Axios({ ...summaryApi.get_category });
    if (res.data.success) {
      dispatch(setAllCategory(res.data.category));
    }
  } catch (error) {
    axiosToastError(error);
  } finally {
    dispatch(setCategoryLoading(false));
  }
};
