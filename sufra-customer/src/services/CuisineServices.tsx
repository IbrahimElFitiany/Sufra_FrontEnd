import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getCuisinesDisplay() {
  try {
    const res = await axios.get(`${BASE_URL}/api/cuisine/with-images`);
    return res.data;
  }
  catch (error) {
    console.error('Search failed:', error);
    return null;
  }
}
