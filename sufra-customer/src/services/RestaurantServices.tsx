import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface SearchOptions {
  query: string;
  page?: number;
  pageSize?: number;
}

export async function searchRestaurants({ query, page = 1, pageSize = 10 }: SearchOptions) {
  try {
    const res = await axios.get(`${BASE_URL}/api/restaurant/search`, {
      params: { query, page, pageSize },
    });
    return res.data;
  } catch (error) {
    console.error('Search failed:', error);
    return null;
  }
}

export async function getRestaurant(id: number) {
  try {
    const res = await axios.get(`${BASE_URL}/api/restaurant/${id}`);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch cuisines:', error);
    return [];
  }
}

export async function getSufraPicks(){
  const res = await axios.get(`${BASE_URL}/api/Restaurant/sufra-picks`);
  return res.data;
}