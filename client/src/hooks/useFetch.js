import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export const useFetch = (url, options = { immediate: true }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(options.immediate !== undefined ? options.immediate : true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(url);
      const result = response.data;

      if (!result?.success) {
        throw new Error(result.message || 'Something went wrong');
      }

      setData(result.data);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (options.immediate) {
      fetchData();
    }
  }, [fetchData, options.immediate]);

  return { data, loading, error, refetch: fetchData };
};

