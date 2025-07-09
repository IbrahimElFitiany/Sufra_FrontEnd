import http from "@services/http";

const token = localStorage.getItem('accessToken') || '';

export async function addToCart(menuItemId: number , quantity: number) {
  try {
    const res = await http.post(
        `/cart`,
        {"MenuItemId": menuItemId,Quantity: quantity},
        {headers: {Authorization: `Bearer ${token}`}})
    if (res.status !== 200) throw new Error('failed');
    return res.data;
  } 
  catch (error) {
    console.error('failed:', error);
    return null;
  }
}

export async function getCartItems() {
  try {
    const res = await http.get(
        `/cart`,
        {headers: {Authorization: `Bearer ${token}`}})
    if (res.status !== 200) throw new Error('failed');
    return res.data;
  } 
  catch (error) {
    console.error('failed:', error);
    return null;
  }
}