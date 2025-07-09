import http from "@services/http";

export async function login(email: string, password: string) {
  try {
    const res = await http.post(`/auth/login`, {email,password,usertype: "customer"},);
    if (res.status !== 200) throw new Error('Login failed');
    
    return res.data;
  } 
  catch (error) {
    console.error('login failed:', error);
    return null;
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