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

// export async function login(email: string, password: string , userType:string = "restaurantManager") {
//   try {
//     const loginResponse = await http.post("/auth/login", { email, password,userType});

//     const user = {
//       email: loginResponse.data.email,
//       fname: loginResponse.data.fname,
//       lname: loginResponse.data.lname,
//       role: loginResponse.data.role
//     }

//     localStorage.setItem("user", JSON.stringify(user));
//     localStorage.setItem("accessToken", loginResponse.data.accessToken);
//     return user;
//   }
//   catch (error) {
//     console.error("Login error:", error);
//     throw error;
//   }
// }

// export async function refreshAccessToken() {
//   try {
//     const response = await http.post('/auth/refresh');
//     return response.data.accessToken;
//   } catch (error) {
//     throw error;
//   }
// }

export async function logout() {
  try {
    localStorage.removeItem("accessToken");
    await http.post("/auth/logout", {}, { withCredentials: true });
  } catch (error) {
    throw error;
  }
}