import axios from "axios";

export default function useAxios() {
  const makeRequest = async (
    url,
    method = "GET",
    data = null,
    authRequired = false
  ) => {
    try {
      const config = {
        url,
        method,
        data,
        withCredentials: authRequired,
        headers: {},
      };

      if (authRequired) {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      }

      const response = await axios(config);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.warn(`Token expired. Retrying with a new token...`);

        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          const refreshResponse = await axios.post(
            "http://localhost:3000/api/auth/refresh",
            { token: refreshToken }
          );

          const { accessToken } = refreshResponse.data;
          localStorage.setItem("accessToken", accessToken);

          if (!config.headers) {
            config.headers = {};
          }
          config.headers.Authorization = `Bearer ${accessToken}`;

          const retryResponse = await axios(config);
          return retryResponse.data;
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError.message);
          throw new Error("Failed to refresh token. Please log in again.");
        }
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
