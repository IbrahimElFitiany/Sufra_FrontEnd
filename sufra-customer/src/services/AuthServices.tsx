import http from "@services/http";

export async function login(email: string, password: string) {
  try {
    const res = await http.post("/auth/login", { email, password });
    return res.data;
  } 
  catch (err: any) {
    if (err.response) {
      throw new Error(err.response.data?.message || "Invalid credentials");
    } else {
      throw new Error("Network error or server not responding");
    }
  }
}

export async function refreshAccessToken() {
  try {
    const response = await http.post('/auth/refresh');
    return response.data.accessToken;
  } catch (error) {
    console.error("Failed to refresh token", error);
    throw error;
  }
}