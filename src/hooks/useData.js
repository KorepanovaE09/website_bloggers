import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useData = (endpoint, useAuth = true) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  const fetchData = useCallback(
    async (signal) => {
      const url = `${API_URL}${endpoint}`;

      setIsLoading(true);
      setIsError(false);
      setError(null);

      try {
        const config = { signal };

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
          if (err.response?.status === 401) {
            localStorage.removeItem("token");
            navigate("/auth/signup", { replace: true });
            return;
          }

          setIsError(true);
          setError(err.response?.data?.message || "Произошла ошибка запроса");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [endpoint, useAuth, API_URL]
  );

  useEffect(() => {
    const abortController = new AbortController();
    fetchData(abortController.signal);
    return () => {
      abortController.abort();
    };
  }, [fetchData]);

  return {
    data,
    isLoading,
    isError,
    error,
    refetch: () => fetchData(),
  };
};

export default useData;
