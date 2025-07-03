import axios from 'axios';
import type { SearchRestaurantsProps } from '@type/SearchRestaurantsProps';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export async function searchRestaurants({query,page,pageSize,districtId,cuisineId}: SearchRestaurantsProps) {
  try {
    const res = await axios.get(`${BASE_URL}/api/restaurant/search`, {
      params: {query,page,pageSize,cuisineId,districtId},
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