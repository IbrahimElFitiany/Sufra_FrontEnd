import axios, { AxiosError} from "axios";
import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios"; 

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {"Content-Type": "application/json",},
  withCredentials: true,
});


http.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


type FailedRequest = {
  resolve: (token: string) => void;
  reject: (err: any) => void;
};

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });

  failedQueue = [];
};


http.interceptors.response.use((response: AxiosResponse) => response, async (error: AxiosError) => 
  {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }; //original request == old request + a retry field to prevent infinite retrying

    //if the user is unauth(401) and it's the first time for the request to hit 401 
    if (error.response?.status === 401 && !originalRequest._retry) {
      //check if any request is already refreshing the token
      if (isRefreshing) {
        // If a refresh token request is already in progress, queue this request
        return new Promise((resolve, reject) => {

          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${token}`,
              };
              resolve(http(originalRequest));
            },
            reject: (err) => {
              reject(err);
            },
          });
        });
      }

      // If this is the first request that triggers token refresh
      originalRequest._retry = true; //mark it as that it tried
      isRefreshing = true; 

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true } //for sending cookies
        );

        const newAccessToken = response.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        processQueue(null, newAccessToken);

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return http(originalRequest);
      } 
      catch (refreshError) {
        //if refreshing token failed, I will reject all the requests in the queue
        //and remove the access token from local storage
        //and call the logout function
        localStorage.removeItem("accessToken");
        processQueue(refreshError, null);
        http("/auth/logout")
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);










export default http;
