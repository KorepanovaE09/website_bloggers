import { useState } from "react";
import axios from "axios";

const usePostData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || "https://koradpromo.loca.lt";

  const postData = async (endpoint, payload) => {
    setIsLoading(true);
    setError(null);
    setResponseData(null);

    try {
      const response = await axios.post(`${API_URL}${endpoint}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false, // true, если используем куки
      });

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
