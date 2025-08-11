import OrdersTrendChart from "@components/dashboard/OrdersTrendChart";
import OrdersTrendCard from "@components/dashboard/OrdersTrendCard";
import ReservationsTrendChart from "@components/dashboard/ReservationsTrendChart";
import ReservedTablesChart from "@components/dashboard/ReservedTablesChart";
import MostSoldItems from "@components/dashboard/MostSoldItems";
import ReservationsTrendCard from "@components/dashboard/ReservationsTrendCard";
import PendingReservationsCard from "@components/dashboard/PendingReservationsCard";
import CanceledReservations from "@components/dashboard/CanceledReservations";

function DashboardPage() {
  const salesData = [
    { day: "Jul", sales: 523 },
    { day: "Feb", sales: 150 },
    { day: "Mar", sales: 300 },
    { day: "Apr", sales: 220 },
    { day: "May", sales: 450 },
    { day: "Jun", sales: 521 },
    { day: "Jul", sales: 432 },
    { day: "Aug", sales: 325 },
    { day: "Sep", sales: 532 },
    { day: "Oct", sales: 432 },
    { day: "Nov", sales: 674 },
    { day: "Dec", sales: 534 },
  ];

  return (
      <div id="main-section" className="h-full flex-1">
        <section id="stats-cards" className="grid grid-cols-4 text-[#B68D67] gap-5 mb-5">
          <OrdersTrendCard/>
          <ReservationsTrendCard/>
          <PendingReservationsCard/>
          <CanceledReservations/>
        </section>
        <section id="charts" className="w-full flex-row-reverse flex gap-x-5">
          <OrdersTrendChart salesData = {salesData}/>
          <ReservationsTrendChart/>
        </section>
        <section className="w-full flex gap-x-5 mb-10">
          <ReservedTablesChart/>
          <MostSoldItems/>
        </section>
        <div>tes</div>
      </div>
  );
}

export default DashboardPage;