import { useEffect, useState } from "react";
import axios from "axios";
const useFetch = (searchData) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const option = {
    method: "POST",
    url: "http://localhost:3000/api/v1/findEvent",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOnsiaWQiOiI2NjM0NzBkZDcwMzcxZTYyYWQ1ODdhNTIifSwiaWF0IjoxNzE0NzEyNzk3fQ.EpBWsrvjWKdEkwmgKJZ_0_X-m6W6-ZTZ2zDdkH6U6vI",
      "Content-Type": "application/json",
    },
    data: searchData,
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(option);
      console.log("response", response);
      console.log("response.data", response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert("there is an error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
