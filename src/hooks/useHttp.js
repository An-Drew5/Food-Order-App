import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
    console.log("Fetching:", url, config);
  const response = await fetch(url, config);

  const resData = await response.json();
  console.log("Response Data:", resData);

  if (!response.ok) {
    throw new Error(resData.message || "Something went wrong!");
  }
    if (resData === null || resData === undefined) {
        throw new Error("No data received from the server.");
        console.log('no data')
    }

  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);

      try {
        const resData = await sendHttpRequest(url, {...config, body: data });
        console.log(resData)
        setData(resData);
      } catch (error) {
        setError(error.message);
      }

      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && config.method === "GET" || !config.method) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData
  };
}
