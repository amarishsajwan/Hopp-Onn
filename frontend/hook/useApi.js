import { useState, useEffect } from "react";
import axios from "axios";

const useApi = (url, payload = null, method = "GET", options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let response;

        if (method === "GET") {
          response = await axios.get(url, options);
        } else if (method === "POST") {
          response = await axios.post(url, payload, options);
        } else if (method === "PUT") {
          response = await axios.put(url, payload, options);
        } else if (method === "DELETE") {
          response = await axios.delete(url, options);
        }

        setData(response.data);
        console.log(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (method === "GET" || payload) fetchData(); // Fetch data for GET requests and when payload is available
  }, [url, payload, method]);

  return { data, loading, error };
};

export default useApi;
