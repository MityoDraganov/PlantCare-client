import { useState, useCallback } from "react";

// Custom Hook to manage loading state
function useLoading() {
  const [loading, setLoading] = useState(false);

  const beginLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const endLoading = useCallback(() => {
    setLoading(false);
  }, []);

  return {
    isLoading: loading,
    beginLoading,
    endLoading,
  };
}

export default useLoading;
