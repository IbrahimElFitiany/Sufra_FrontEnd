import http from "@services/http";


export async function addToCart(menuItemId: number , quantity: number) {
  try {
    const res = await http.post(`/cart`, {
      MenuItemId: menuItemId,
      Quantity: quantity
    });

    if (res.status !== 200) throw new Error('failed');
    return res.data;
  } catch (error) {
    console.error('failed:', error);
    return null;
  }
}


export async function getCartItems() {
  try {
    const res = await http.get(`/cart`);
    if (res.status !== 200) throw new Error('failed');
    return res.data;
  } catch (error) {
    console.error('failed:', error);
    return null;
  }
}