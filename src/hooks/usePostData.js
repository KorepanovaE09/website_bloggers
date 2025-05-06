import { useState } from "react";
import axios from "axios";

const usePostData = (useAuth = false) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || "https://koradpromo.loca.lt";

  const postData = async (endpoint, payload) => {
    setIsLoading(true);
    setError(null);
    setResponseData(null);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      };

      if (useAuth) {
        const token = localStorage.getItem("token")?.trim();;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      const response = await axios.post(
        `${API_URL}${endpoint}`,
        payload,
        config
      );

      setResponseData(response.data);
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Произошла ошибка при выполнении запроса";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    postData,
    isLoading,
    error,
    data: responseData,
    // reset: () => {
    //   setError(null);
    //   setResponseData(null);
    // }
  };
};

export default usePostData;
