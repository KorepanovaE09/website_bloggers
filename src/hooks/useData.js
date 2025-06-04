import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const useData = (endpoint, useAuth = true) => {
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
        const config = { signal, withCredentials: true };
        const response = await axios.get(url, config);
        setData(response.data);
        return response.data;
      } catch (err) {
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
