import axios, { AxiosError} from "axios";
import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios"; 
import { logout, refreshAccessToken } from "./authServices";


//create axios instance
const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {"Content-Type": "application/json",},
  withCredentials: true,
});


//faildRequest Type which has 2 funs 
type FailedRequest = {
  resolve: (value?: unknown) => void;
  reject: (error: any) => void;
};

//to check if I'm already refreshing 
let isRefreshing = false;

//queue to store failed requests 
let failedQueue: FailedRequest[] = [];

//function to process failed queue
const processQueue = (error: any) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });

  //empty the queue
  failedQueue = [];
};


http.interceptors.response.use((response: AxiosResponse) => response, async (error: AxiosError) => 
  {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }; //original request == old request + a retry field to prevent infinite retrying

    if (originalRequest.url?.includes("/auth/login")) {
      return Promise.reject(error);
    }
    
    //if the user is unauth(401) and it's the first time for the request to hit 401 
    if (error.response?.status === 401 && !originalRequest._retry) {
      //check if any request is already refreshing the token
      if (isRefreshing) {
        // If a refresh token request is already in progress, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return http(originalRequest);
        });
      }

      // If this is the first request that triggers token refresh
      originalRequest._retry = true; //mark it as that it tried
      isRefreshing = true; 

      try {
        await refreshAccessToken();
        processQueue(null);

        return http(originalRequest);
      } 
      catch (refreshError) {
        //if refreshing token failed, I will reject all the requests in the queue
        //and remove the access token from local storage
        //and call the logout function
        processQueue(refreshError);
        await logout()
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);


export default http;