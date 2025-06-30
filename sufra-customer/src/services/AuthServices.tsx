import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function login(email: string, password: string) {
  try {
    const res = await axios.post(`${BASE_URL}/api/customer/login`, {
      email,
      password,
    });

    if (res.status !== 200) {
      throw new Error('Login failed');
    }

    console.log('login successful:', res.data);
    return res.data;
  } catch (error) {
    console.error('login failed:', error);
    return null;
  }
}
