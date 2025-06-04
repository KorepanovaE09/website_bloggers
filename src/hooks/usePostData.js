import { useState } from "react";
import axios from "axios";

const usePostData = (useAuth = true) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  const postData = async (endpoint, payload) => {
    setIsLoading(true);
    setError(null);
    setResponseData(null);

    try {
      const config = {
        headers: {},
        withCredentials: useAuth,
      };

      if (!(payload instanceof FormData)) {
        config.headers["Content-Type"] = "application/json";
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
      err.customMessage = errorMessage;
      setError(errorMessage);
      throw err;
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
