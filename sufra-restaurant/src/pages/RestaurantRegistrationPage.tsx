import { useState, useEffect } from 'react';
import LocationPickerMap from '@components/LocationPickerMap';

interface Cuisine {
  cuisineId: number;
  cuisineName: string;
}

interface District {
  id: number;
  name: string;
}

interface FormData {
  fname: string;
  lname: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  cuisineId: string;
  imgUrl: string;
  description: string;
  address: string;
  districtId: string;
}

interface Location {
  lat: number;
  lng: number;
}

function RestaurantRegistration() {
  const [location, setLocation] = useState<Location>({ lat: 30.0444, lng: 31.2357 });
  const [formData, setFormData] = useState<FormData>({
    fname: '',
    lname: '',
    email: '',
    password: '',
    name: '',
    phone: '',
    cuisineId: '',
    imgUrl: '',
    description: '',
    address: '',
    districtId: '',
  });
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  // Fetch cuisines
  useEffect(() => {
    async function fetchCuisines() {
      try {
        const response = await fetch("http://localhost:5164/api/cuisine");
        const data = await response.json();
        setCuisines(data);
      } catch (err) {
        console.error("Error fetching cuisines:", err);
      }
    }
    fetchCuisines();
  }, []);

  // Fetch districts
  useEffect(() => {
    async function fetchDistricts() {
      try {
        const response = await fetch("http://localhost:5164/api/district");
        const data = await response.json();
        setDistricts(data);
      } catch (err) {
        console.error("Error fetching Districts:", err);
      }
    }
    fetchDistricts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      restaurantManager: {
        fname: formData.fname,
        lname: formData.lname,
        email: formData.email,
        password: formData.password,
      },
      restaurant: {
        imgUrl: formData.imgUrl,
        name: formData.name,
        phone: formData.phone,
        cuisineId: Number(formData.cuisineId),
        description: formData.description,
        latitude: location.lat,
        longitude: location.lng,
        address: formData.address,
        districtId: Number(formData.districtId),
        status: false
      }
    };

    try {
      const response = await fetch("http://localhost:5164/api/Restaurant/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Server Response:", data);
        alert("Registration Successful!");
      } else {
        const error = await response.text();
        console.error("Server Error:", error);
        alert(`Registration Failed: ${error}`);
      }
    } catch (err) {
      console.error("Error registering restaurant:", err);
      alert("Registration Failed!");
    }
  };

  return (
    <>
      <h1 className='text-[#B68D67] font-[Greethen] text-6xl mt-8'>join Sufrá Today</h1>
      
      <div className="flex flex-col items-center m-6 rounded-2xl p-6 gap-y-5 bg-[#061C1A] w-[40%]">
        <h1 className="text-[#BCBCBC] text-xs">
          A member of our team will reach out shortly to discuss your needs and if you'd like, give you a platform demo
        </h1>

        <div className="w-full p-5 pt-9 rounded-xl border-1 border-[#B68D67]">
          <form onSubmit={handleSubmit} className="flex flex-col text-[#B68D67] font-[Inter]">
            <label className='mx-1 mb-1'>First Name:</label>
            <input name="fname" onChange={handleChange} value={formData.fname} type="text" className="border border-[#B68D67] rounded-lg p-2 mb-4" required />

            <label className='mx-1 mb-1'>Last Name:</label>
            <input name="lname" onChange={handleChange} value={formData.lname} type="text" className="border border-[#B68D67] rounded-lg p-2 mb-4" required />

            <label className='mx-1 mb-1'>Email:</label>
            <input name="email" onChange={handleChange} value={formData.email} type="email" className="border border-[#B68D67] rounded-lg p-2 mb-4" required />

            <label className='mx-1 mb-1'>Password:</label>
            <input name="password" onChange={handleChange} value={formData.password} type="password" className="border border-[#B68D67] rounded-lg p-2 mb-4" required />

            <label className='mx-1 mb-1'>Restaurant Name:</label>
            <input name="name" onChange={handleChange} value={formData.name} type="text" className="border border-[#B68D67] rounded-lg p-2 mb-4" required />

            <label className='mx-1 mb-1'>Restaurant Phone:</label>
            <input name="phone" onChange={handleChange} value={formData.phone} type="tel" className="border border-[#B68D67] rounded-lg p-2 mb-4" required />

            <label className='mx-1 mb-1'>Restaurant Address:</label>
            <input name="address" onChange={handleChange} value={formData.address} type="text" className="border border-[#B68D67] rounded-lg p-2 mb-4" required />

            <label className='mx-1 mb-1'>Cuisine:</label>
            <select name="cuisineId" onChange={handleChange} value={formData.cuisineId} className="border border-[#B68D67] rounded-lg p-2 mb-4" required>
              <option value="">Select a cuisine</option>
              {cuisines.map((cuisine) => (
                <option key={cuisine.cuisineId} value={cuisine.cuisineId}>
                  {cuisine.cuisineName}
                </option>
              ))}
            </select>

            <label className='mx-1 mb-1'>District:</label>
            <select name="districtId" onChange={handleChange} value={formData.districtId} className="border border-[#B68D67] rounded-lg p-2 mb-4" required>
              <option value="">Select a district</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>

            <label className='mx-1 mb-1'>Restaurant Image URL:</label>
            <input name="imgUrl" onChange={handleChange} value={formData.imgUrl} type="url" className="border border-[#B68D67] rounded-lg p-2 mb-4" required />

            <label className='mx-1 mb-1'>Description:</label>
            <textarea name="description" onChange={handleChange} value={formData.description} className="h-44 border border-[#B68D67] rounded-lg p-2 mb-4 text-sm" required />
            
            <button type="submit" className="py-2 px-3.5 font-[Rohesta] bg-[#B68D67] text-white text-lg rounded-lg hover:brightness-105 hover:scale-102 transition-all duration-300">
              Submit
            </button>
          </form>
        </div>

        <div className="w-full h-80 mb-1" style={{ borderRadius: '8px', overflow: 'hidden' }}>
          <LocationPickerMap location={location} setLocation={setLocation} />
        </div>
      </div>
    </>
  );
}

export default RestaurantRegistration;