import summaryApi from "../Config/SummaryApi";
import { Axios } from "./axios";

export const fetchUserDetails = async () => {
  try {
    const response = await Axios({ ...summaryApi.user_details });
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};
