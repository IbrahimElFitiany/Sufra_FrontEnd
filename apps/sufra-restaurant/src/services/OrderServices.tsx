import http from "@services/http";
import type { TrendPeriod } from "@/types/TrendPeriod";

export async function getOrderTrend(period: TrendPeriod = 'day') {
  try {
    const res = await http.get(`/order/trend?trendPeriod=${period}`);
    return res.data;
  } 
  catch (error) {
    throw error;
  }
}