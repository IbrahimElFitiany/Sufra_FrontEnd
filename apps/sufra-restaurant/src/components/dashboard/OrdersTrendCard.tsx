import { useState} from "react";
import { Link } from "react-router-dom";
import type { OrderTrend } from "@/types/OrderTrend";
import { getOrderTrend } from "@services/OrderServices";
import type { TrendPeriod } from "@/types/TrendPeriod";
import { useQuery } from "@tanstack/react-query";
import OrdersTrendCardSkeleton from '@components/dashboard/OrdersTrendCardSkeleton'


function OrdersTrendCard() {
  const [period, setPeriod] = useState<TrendPeriod>('day');

  const { data: ordersCount, error, isLoading} = useQuery<OrderTrend, Error>({
    queryKey:["ordersTrend", period],
    queryFn:() => getOrderTrend(period)
  });

  if (isLoading) return <OrdersTrendCardSkeleton/>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;
  if (!ordersCount) return null;

  return (
    <div className="flex flex-col font-[Inter] text-white bg-[linear-gradient(119deg,#162A21,#1B3429)] p-5 rounded-3xl ">

      <div id="upper-section" className="flex justify-between text-2xl font-extrabold">
        <h1>Orders trend</h1>
        <Link 
          className="
          flex justify-center items-center
          size-10 bg-[#FFC991]
          rounded-full hover:scale-110 
          hover:brightness-105 transition duration-300" 
          to={"/order"}
          title="Go to Orders"
          >
          <img src="/Arrow.png" alt="" />
        </Link>
      </div>

      <div id="TodaysOrderCount" className="font-extrabold text-6xl">{ordersCount.current}</div>

      <div id="bottom-section" className="flex justify-between mt-7 gap-2 text-xs font-medium">
          
        <div id="tendIndicator" className="flex justify-center items-center gap-2">

          <div className={`flex gap-x-0.5 justify-center items-center w-[45px] h-[21px] rounded-full ${ordersCount.diff > 0? "bg-[#C1FFB4] text-[#297B38]": "bg-[#E45C5C] text-[#970000]"}`}>
            <span className="text-[10px]"> {ordersCount.diff > 0 ? "↑" : "↓"}</span>
            <span>{ordersCount.diff}</span>
          </div>
          <span className="text-[#A8A8A8]">
            {ordersCount.diff > 0 ? "Increased From Previous" : "Decreased From Previous"}
          </span>
        </div>
        <div className="flex gap-x-2">
          {periods.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setPeriod(value)}
              className={`size-6 rounded-full ${
                period === value ? "bg-[#FFC991]" : "bg-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
const periods: { label: string; value: TrendPeriod }[] = [
  { label: 'D', value: 'day' },
  { label: 'W', value: 'week' },
  { label: 'M', value: 'month' }
];
export default OrdersTrendCard;
