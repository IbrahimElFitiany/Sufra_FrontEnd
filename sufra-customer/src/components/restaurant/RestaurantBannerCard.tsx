import BookATable from '@components/reservation/BookATable';
import type { RestaurantDetailDTO } from '@type/RestaurantDetailDTO';
import capitalize from '@utils/capitalize';

type Props = {
  restaurant: RestaurantDetailDTO | null;
};

function RestaurantBannerCard({ restaurant }: Props) {

  if (restaurant === null) {
    return <div>Loading...</div>;
  }

  if (!restaurant || Object.keys(restaurant).length === 0) {
    return <div className="text-center text-red-500 mt-10">Restaurant not found.</div>;
  }

  return (
    <div className="w-full mt-10 lg:rounded-s bg-[#061C1A] p-3 text-[#B68D67]">

      <div id='RestaurantImage' className="lg:h-[350px] w-full">
        <img
          src={restaurant.imgUrl}
          alt="Restaurant"
          className="w-full h-full object-cover rounded"
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between pb-1 border-b-1">

        <div className="flex flex-col justify-between items-start p-1 pt-4">
          <div id="Basic Info" className='flex flex-col gap-y-1'>
            <h1 id='Restaurant Name' className="font-[rohesta] text-2xl md:text-5xl">{restaurant.name}</h1>
            <p id='Restaurant Address' className="font-[Inter] text-sm md:text-2xl text-[#BCBCBC]">{restaurant.district}</p>
          </div>

          <div id="Details" className="w-full text-xs flex flex-col gap-y-8 mt-10 font-[Inter]">
            <div>
              <h3 className="font-[#E5C7AA]">About this Restaurant:</h3>
              <p id='description' className="text-xs text-[#BCBCBC] max-w-lg">{restaurant.description}</p>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-y-3 lg:gap-x-11 text-xs font-bold">

              <div id='rating' className="flex justify-center items-end gap-x-1">
                <img src="/star.png" className="size-5" alt="" />
                <h1 className=''>{restaurant.rating} (12)</h1>
              </div>
              
              <div id='cuisine' className="flex justify-center items-end gap-x-1">
                <img src="/icons8-food-and-wine-96.png" className="size-5" alt="" />
                <h1 className=''>{capitalize(restaurant.cuisine)}</h1>
              </div>

              <button 
                id='phone'
                className="cursor-pointer flex justify-center items-end gap-x-1"
                onClick={()=>{navigator.clipboard.writeText(restaurant.phone)}}
              >
                <img src="/phone.png" className="size-5" alt="" />
                <h1>{restaurant.phone}</h1>
              </button>

              <div id='address' className="flex justify-center items-end gap-x-1">
                <img src="/loc.png" className="size-5" alt="" />
                <h1>{restaurant.address}</h1>
              </div>
            </div>
          </div>
        </div>

        <BookATable/>
      </div>
    </div>
  );
}

export default RestaurantBannerCard;