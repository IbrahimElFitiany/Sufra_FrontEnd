import {useForm} from 'react-hook-form'
import type { RestaurantRegistration } from '@/types/RestaurantRegisteration'
import type { Location } from '@/types/Location';
import { register as registerService } from '@services/AuthServices';
import LocationPickerMap from './LocationPickerMap';
import { useState,useEffect } from 'react';

function RegistrationForm() {
  const [location, setLocation] = useState<Location>({lat: 30.0444,lng: 31.2357});
  const { register, handleSubmit, setValue } = useForm<RestaurantRegistration>();
  const onRegistration = async (data:RestaurantRegistration)=>{
    try {
      await registerService(data);
    } 
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setValue("restaurant.latitude", location.lat);
    setValue("restaurant.longitude", location.lng);
  }, [location, setValue]);

  return (
    <form onSubmit={handleSubmit((data)=>{onRegistration(data)})} className="flex flex-col text-[#B68D67] font-[Inter]">
      <label className='mx-1 mb-1'>First Name:</label>
      <input {...register("restaurantManager.fname")} type="text" className="border border-[#B68D67] rounded-lg p-2 mb-4 focus:outline-1 focus:outline-[#be966f] "/>

      <label className='mx-1 mb-1'>Last Name:</label>
      <input {...register("restaurantManager.lname")} type="text" className="border border-[#B68D67] rounded-lg p-2 mb-4 focus:outline-1 focus:outline-[#be966f]"/>

      <label className='mx-1 mb-1'>Email:</label>
      <input {...register("restaurantManager.email")} type="email" className="border border-[#B68D67] rounded-lg p-2 mb-4 focus:outline-1 focus:outline-[#be966f]"/>

      <label className='mx-1 mb-1'>Password:</label>
      <input {...register("restaurantManager.password")} type="password" className="border border-[#B68D67] rounded-lg p-2 mb-4  focus:outline-1 focus:outline-[#be966f]"/>

      <label className='mx-1 mb-1'>Restaurant Name:</label>
      <input {...register("restaurant.name")} type="text" className="border border-[#B68D67] rounded-lg p-2 mb-4 focus:outline-1 focus:outline-[#be966f]"/>

      <label className='mx-1 mb-1'>Restaurant Phone:</label>
      <input {...register("restaurant.phone")} type="tel" className="border border-[#B68D67] rounded-lg p-2 mb-4 focus:outline-1 focus:outline-[#be966f]"/>

      <label className='mx-1 mb-1'>Restaurant Address:</label>
      <input {...register("restaurant.address")} type="text"   className="border border-[#B68D67] rounded-lg p-2 mb-4  focus:outline-1 focus:outline-[#be966f]"/>

      <label className='mx-1 mb-1'>Cuisine:</label>
      <select {...register("restaurant.cuisineId")} className="border border-[#B68D67] rounded-lg p-2 mb-4 focus:outline-1 focus:outline-[#be966f]" required>
        <option value="">Select a cuisine</option>
        <option value="3">Italian</option>
      </select>

      <label className='mx-1 mb-1'>District:</label>
      <select {...register("restaurant.districtId")} className="border border-[#B68D67] rounded-lg p-2 mb-4 focus:outline-1 focus:outline-[#be966f]" required>
        <option value="">Select a district</option>
        <option value="3">Mohandessin</option>
      </select>

      <label className='mx-1 mb-1'>Restaurant Image URL:</label>
      <input {...register("restaurant.imgUrl")} type="url" className="border border-[#B68D67] rounded-lg p-2 mb-4 focus:outline-1 focus:outline-[#be966f]"/>

      <label className='mx-1 mb-1'>Description:</label>
      <textarea {...register("restaurant.description")} className="h-44 border border-[#B68D67] rounded-lg p-2 mb-4 focus:outline-1 focus:outline-[#be966f] text-sm"/>

      <div className="w-full h-80 mb-5" style={{ borderRadius: '8px', overflow: 'hidden' }}>
        <LocationPickerMap location={location} setLocation={setLocation}/>
      </div>

      <button type="submit" className="py-2 px-3.5 font-[Rohesta] bg-[#B68D67] text-white text-lg rounded-lg hover:brightness-105 hover:scale-102 transition-all duration-300">
        Submit
      </button>
    </form>
  )
}

export default RegistrationForm