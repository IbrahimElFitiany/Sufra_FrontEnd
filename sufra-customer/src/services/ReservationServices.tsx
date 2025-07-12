import http from "@services/http";
import type { Reservation } from "@type/Reservation";

export async function createReservation(restaurantId: number, payload: Reservation) {
  const res = await http.post(`/Reservation/${restaurantId}`, payload);
  return res.data;
}