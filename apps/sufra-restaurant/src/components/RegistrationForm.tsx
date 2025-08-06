import {useForm} from 'react-hook-form'

type RegistrationForm = {
  fname:string,
  lname:string,
  email:string,
  password:string,
  restaurantName:string,
  restaurantPhone:string,
  restaurantAddress:string,
  cuisineId: string,
  districtId: string,
  restaurantImg:string,
  description:string
}

function RegistrationForm() {
  const {register , handleSubmit} = useForm<RegistrationForm>()
  return (
    <form onSubmit={handleSubmit((data)=> console.log(data))} className="flex flex-col text-[#B68D67] font-[Inter]">

      <label className='mx-1 mb-1'>First Name:</label>
      <input {...register("fname")} name="fname" type="text" className="border border-[#B68D67] rounded-lg p-2 mb-4"/>

      <label className='mx-1 mb-1'>Last Name:</label>
      <input {...register("lname")} type="text" className="border border-[#B68D67] rounded-lg p-2 mb-4"/>

      <label className='mx-1 mb-1'>Email:</label>
      <input {...register("email")} type="email" className="border border-[#B68D67] rounded-lg p-2 mb-4"/>

      <label className='mx-1 mb-1'>Password:</label>
      <input {...register("password")} type="password" className="border border-[#B68D67] rounded-lg p-2 mb-4"/>

      <label className='mx-1 mb-1'>Restaurant Name:</label>
      <input {...register("restaurantName")} type="text" className="border border-[#B68D67] rounded-lg p-2 mb-4"/>

      <label className='mx-1 mb-1'>Restaurant Phone:</label>
      <input {...register("restaurantPhone")} type="tel" className="border border-[#B68D67] rounded-lg p-2 mb-4"/>

      <label className='mx-1 mb-1'>Restaurant Address:</label>
      <input {...register("restaurantAddress")} type="text" className="border border-[#B68D67] rounded-lg p-2 mb-4"/>

      <label className='mx-1 mb-1'>Cuisine:</label>
      <select {...register("cuisineId")} className="border border-[#B68D67] rounded-lg p-2 mb-4" required>
        <option value="">Select a cuisine</option>
          <option>
            {"Egyption"}
          </option>
      </select>

      <label className='mx-1 mb-1'>District:</label>
      <select {...register("districtId")} className="border border-[#B68D67] rounded-lg p-2 mb-4" required>
        <option value="">Select a district</option>
          <option>
            {"Cairo"}
          </option>
      </select>

      <label className='mx-1 mb-1'>Restaurant Image URL:</label>
      <input {...register("restaurantImg")} type="url" className="border border-[#B68D67] rounded-lg p-2 mb-4"/>

      <label className='mx-1 mb-1'>Description:</label>
      <textarea {...register("description")}  className="h-44 border border-[#B68D67] rounded-lg p-2 mb-4 text-sm"/>
      
      <button type="submit" className="py-2 px-3.5 font-[Rohesta] bg-[#B68D67] text-white text-lg rounded-lg hover:brightness-105 hover:scale-102 transition-all duration-300">
        Submit
      </button>
    </form>
  )
}

export default RegistrationForm