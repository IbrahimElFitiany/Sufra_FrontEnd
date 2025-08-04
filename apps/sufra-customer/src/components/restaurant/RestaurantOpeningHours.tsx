import { useEffect, useState } from "react";
import { getOpeningHours } from "@services/RestaurantServices";
import { useParams } from "react-router-dom";
import { formatTimeRange } from "@utils/formatTime";
import type { OpeningHour } from "@type/OpeningHour";

const WEEK_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function RestaurantOpeningHours() {
  const [openingHours, setOpeningHours] = useState<OpeningHour[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchOpeningHours = async () => {
      try {
        const res = await getOpeningHours(Number(id));
        setOpeningHours(res);
      } catch (error) {
        console.error("Failed to fetch opening hours", error);
      }
    };
    fetchOpeningHours();
  }, [id]);

  const openingHoursMap = new Map(openingHours.map(entry => [entry.dayOfWeek, entry]));

  return (
    <div className="flex flex-col w-full md:w-1/3 justify-center items-start border border-[#B68D67] rounded-lg md:ml-3 px-3 py-4 gap-y-3 mb-5 md:my-4">

      <div id="OpeningHoursTitle&icon" className="flex items-center gap-x-2 text-[#B68D67] mb-2">
        <img className="size-5" src="/clock-icon.png" alt="Clock icon" />
        <h1 className="font-bold">Opening Hours:</h1>
      </div>

      <div className="flex flex-col space-y-1 md:space-y-3 w-full px-1">
        {WEEK_DAYS.map((day) => {
          const entry = openingHoursMap.get(day);
          return (
            <div id="openingHour/day" className="flex w-full justify-between" key={day}>
              <div id="Days" className="font-md font-semibold text-[#B68D67]">
                {day}
              </div>
              <div id="Hours" className="text-[#BCBCBC]">
                {entry
                  ? formatTimeRange(entry.openTime, entry.closeTime)
                  : "Closed"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RestaurantOpeningHours;