import { useState} from 'react';
import LocationPickerMap from '@components/LocationPickerMap';
import RegistrationForm from '@components/RegistrationForm';

type Location = {
  lat: number;
  lng: number;
}

function RestaurantRegistrationPage() {
  const [location, setLocation] = useState<Location>({ lat: 30.0444, lng: 31.2357 });

  return (
    <div className='flex flex-col justify-center items-center w-full h-full bg-dark-Green'>
      <h1 className='text-[#B68D67] font-[Greethen] text-6xl mt-8'>join Sufrá Today</h1>
      
      <div className="flex flex-col items-center m-6 rounded-2xl p-6 gap-y-5 bg-[#061C1A] w-[40%]">
        <h1 className="text-[#BCBCBC] text-xs">
          A member of our team will reach out shortly to discuss your needs and if you'd like, give you a platform demo
        </h1>

        <div className="w-full p-5 pt-9 rounded-xl border-1 border-[#B68D67]">
          <RegistrationForm/>
        </div>

        <div className="w-full h-80 mb-1" style={{ borderRadius: '8px', overflow: 'hidden' }}>
          <LocationPickerMap location={location} setLocation={setLocation} />
        </div>
      </div>
    </div>
  );
}

export default RestaurantRegistrationPage;