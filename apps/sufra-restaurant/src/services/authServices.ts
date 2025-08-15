import http from "@services/http";
import type {RestaurantRegistration} from "@/types/RestaurantRegisteration"

export async function register(params:RestaurantRegistration) {
  try {
    const res = await http.post("/restaurant/register",params);
    return res.data;
  } 
  catch (error) {
    throw error;
  }
}

export async function login(email: string, password: string , userType:string = "restaurantManager") {
  try {
    const loginResponse = await http.post("/auth/login", { email, password,userType});
    return loginResponse.data;
  }
  catch (error) {
    throw error;
  }
}

export async function fetchMe() {
  try {
    const { data } = await http.get("/auth/me");
    return data
  } catch (err) {
    throw err;
  }
}

export async function refreshAccessToken() {
  try {
    const response = await http.post('/auth/refresh');
    return response;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
    localStorage.removeItem("accessToken");
    await http.post("/auth/logout");
  } catch (error) {
    throw error;
  }
}