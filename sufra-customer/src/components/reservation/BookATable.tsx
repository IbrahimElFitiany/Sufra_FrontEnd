import { useEffect, useState } from 'react';
import { createReservation } from '@services/ReservationServices'
import { useParams } from 'react-router-dom';

const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const period = hour < 12 ? 'AM' : 'PM';
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const timeLabel = `${displayHour.toString().padStart(2, '0')}:${min
        .toString()
        .padStart(2, '0')} ${period}`;
      const timeValue = `${hour.toString().padStart(2, '0')}:${min
        .toString()
        .padStart(2, '0')}`;
      times.push({ value: timeValue, label: timeLabel });
    }
  }
  return times;
};

const getNearestHalfHour = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const roundedMinutes = minutes < 30 ? '00' : '30';
  return `${hours.toString().padStart(2, '0')}:${roundedMinutes}`;
};

const BookATable = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState<number>(1);
  const timeOptions = generateTimeOptions();
  const { id } = useParams();
  const parsedId = parseInt(id || "", 10);
  if (isNaN(parsedId)) {
    alert("Invalid restaurant ID.");
    return;
  }

  const handleReservation = async () => {
    try {
      const [hour, minute] = time.split(":");
      const reservationDateTime = new Date(date);
      reservationDateTime.setHours(parseInt(hour), parseInt(minute));

      const reservationPayload = {
        StartTime: reservationDateTime.toISOString(),
        PartySize: partySize
      };

      await createReservation(parsedId, reservationPayload);
      alert("Reservation successful!");
    } catch (err) {
      console.error("Reservation failed", err);
      alert("Something went wrong!");
    }
  };


  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
    setTime(getNearestHalfHour());
  }, []);

  return (
    <div className="mb-3 flex flex-col justify-center items-center bg-transparent border-1 h-full lg:w-sm border-[#B68D67] m-0 mt-4 px-4 py-2 rounded-lg">
      <div id="title" className="font-bold">BOOK A TABLE</div>

      <select
        id="dropdown"
        name="options"
        value={partySize}
        onChange={(e) => setPartySize(Number(e.target.value))}
        className="w-[100%] my-2 p-1 border-1 rounded-lg"
      >
        {Array.from({ length: 20 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1} {i === 0 ? 'person' : 'people'}
          </option>
        ))}
      </select>

      <div className="flex w-[100%]">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mr-1 w-full my-2 p-1 border rounded-lg bg-[#061C1A] text-[#B68D67] focus:outline-none"
        />

        {/* Custom time dropdown to enforce 30-minute intervals */}
        <select
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="ml-1 w-full my-2 p-1 border rounded-lg bg-[#061C1A] text-[#B68D67] focus:outline-none"
        >
        {timeOptions.map((t) => (
            <option key={t.value} value={t.value}>
            {t.label}
            </option>
        ))}
        </select>
      </div>

      <button
        onClick={handleReservation} 
        className="my-2 w-[100%] h-8 bg-[#B68D67] text-white font-bold rounded-lg">
        Confirm
      </button>
    </div>
  );
};

export default BookATable;
