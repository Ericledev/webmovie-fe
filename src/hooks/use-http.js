import { useState, useCallback } from "react";

const useHTTP = () => {
  // Check status loading & error
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // send the request to server
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      //   console.log("CHECK RESPONSE: ", response);
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      applyData(data);
    } catch (error) {
      setError(error.message || "Something wrong");
    }

    setIsLoading(false);
  }, []);

  return { isLoading, error, sendRequest };
};

export default useHTTP;
