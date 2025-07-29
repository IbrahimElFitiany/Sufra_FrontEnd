import http from '@services/http';
import type { OpeningHour } from '@type/OpeningHour';
import type { SearchRestaurantsProps } from '@type/SearchRestaurantsProps';

export async function searchRestaurants({query,page,pageSize,districtId,cuisineId}: SearchRestaurantsProps) {
  try {
    const res = await http.get(`/restaurant/search`, {
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
    const res = await http.get(`/restaurant/${id}`);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch cuisines:', error);
    return [];
  }
}

export async function getOpeningHours(id: number): Promise<OpeningHour[]> {
  const res = await http.get(`/Restaurant/${id}/opening-hours`);
  return res.data;
}

export async function getSufraPicks(){
  const res = await http.get(`/Restaurant/sufra-picks`);
  return res.data;
}