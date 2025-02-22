import axios from "axios";
import summaryApi, { baseUrl } from "../Config/SummaryApi";

export const Axios = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

Axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const refresh_token = localStorage.getItem("refreshToken");

      if (refresh_token) {
        try {
          const newAccessToken = await refreshAccessToken(refresh_token);

          if (newAccessToken) {
            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
            return Axios(error.config);
          }
        } catch (err) {
          console.error(
            "Refresh token ile yeni access token alınırken hata:",
            err
          );
        }
      }
    }
    return Promise.reject(error);
  }
);

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await Axios({
      ...summaryApi.refresh_token,
      headers: { Authorization: `Bearer ${refreshToken}` },
    });

    const accessToken = response.data.accessToken;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Access token yenileme işlemi başarısız oldu:", error);
    throw error;
  }
};
