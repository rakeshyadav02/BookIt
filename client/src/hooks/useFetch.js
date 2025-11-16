import { useState, useEffect, useCallback } from 'react';

export const useFetch = (url, options = { immediate: true }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(options.immediate !== undefined ? options.immediate : true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${baseUrl}/api${url}`);
      
      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        throw new Error('Invalid response from server');
      }
      
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Something went wrong');
      }
      
      setData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
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

