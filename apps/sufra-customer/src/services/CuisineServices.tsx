import http from "@services/http";

export async function getCuisinesDisplay() {
  try {
    const res = await http.get(`/cuisine/with-images`);
    return res.data;
  }
  catch (error) {
    console.error('Search failed:', error);
    return null;
  }
}
