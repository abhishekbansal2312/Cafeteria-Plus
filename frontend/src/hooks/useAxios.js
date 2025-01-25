import axios from "axios";

export default function useAxios() {
  const makeRequest = async (
    url,
    method = "GET",
    data = null,
    authRequired = false,
    retries = 3
  ) => {
    try {
      const config = {
        url,
        method,
        data,
        withCredentials: authRequired,
      };

      const response = await axios(config);

      return response.data;
    } catch (error) {
      if (retries > 0) {
        console.warn(`Retrying request... (${retries} retries left)`);
        await makeRequest(
          "http://localhost:3000/api/auth/refresh",
          "POST",
          {
            token: localStorage.getItem("refreshToken"),
          },
          true
        );
        return makeRequest(url, method, data, authRequired, retries - 1);
      } else {
        if (error.response) {
          console.error("API Error:", error.response.data);
        } else {
          console.error("Network Error:", error.message);
        }
        throw error;
      }
    }
  };

  return makeRequest;
}
