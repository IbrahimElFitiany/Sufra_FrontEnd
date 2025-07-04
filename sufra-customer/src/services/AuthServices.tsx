import http from "@services/http";

export async function login(email: string, password: string) {
  try {
    const res = await http.post(`/customer/login`, {email,password});

    if (res.status !== 200) throw new Error('Login failed');
    
    return res.data;
  } 
  catch (error) {
    console.error('login failed:', error);
    return null;
  }
}
