import { useEffect, useState } from "react";
import axios from "axios";

const useData = (endpoint, useAuth = false) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || "https://koradpromo.loca.lt";

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      const url = `${API_URL}${endpoint}`;

      setIsLoading(true);
      setIsError(false);
      setError(null);

      try {
        const config = {
          signal: abortController.signal,
        };

        if (useAuth) {
          const token = localStorage.getItem("token");
          if (token) {
            config.headers = {
              Authorization: `Bearer ${token}`,
            };
          }
        }

        const response = await axios.get(url, config);
        setData(response.data);
        
      } catch (err) {
        if (!axios.isCancel(err)) {
          setIsError(true);
          setError(err.response?.data?.message || "Произошла ошибка запроса");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [endpoint]);

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export default useData;
