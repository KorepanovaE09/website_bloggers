import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const useData = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  const { page, limit, append = false, params = {} } = options;

  const fetchData = useCallback(
    async (signal) => {
      const url = `${API_URL}${endpoint}`;

      setIsLoading(true);
      setIsError(false);
      setError(null);

      try {
        const config = {
          signal,
          withCredentials: true,
          
          // создаем новый объект, копируем все свойства params и добавляем page, limit
          params: page && limit ? { ...params, page, limit } : params,
        };

        const response = await axios.get(url, config);
        const result = response.data;

        if (append) {
          setData(prev => (Array.isArray(prev) ? [...prev, ...result] : result))
        } else {
          setData(result)
        }

        return result;
      } catch (err) {
        setIsError(true)
        setError(err)
        console.log("Ошибка GET запроса");
      } finally {
        setIsLoading(false);
      }
    },
    [endpoint, API_URL, page, limit, append, JSON.stringify(params)]
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
