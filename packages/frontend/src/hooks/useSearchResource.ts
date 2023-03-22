import { useCallback, useEffect, useState } from 'react';

const useSearchResource = <TResults>(url: string) => {
  const [results, setResults] = useState<TResults>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetch(url);
      const json = await data.json();

      setResults(json.data.results);
    } catch (e) {
      console.error(e);

      setError('Unable to fetch resource');
    }
    setIsLoading(false);
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [url, fetchData]);

  return {
    isLoading,
    results,
    fetchData,
    error,
  };
};

export default useSearchResource;
