import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RestaurantCard from '@components/RestaurantCard';
import MainLayout from '@layouts/MainLayout';
import {searchRestaurants} from '@services/RestaurantServices';
import type { RestaurantListDTO } from "@type/RestaurantListDTO";

function SearchResultsPage() {

  const [searchParams] = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const [pageSize,setPageSize] = useState<number>(12);
  const query = searchParams.get('query');
  const [results, setResults] = useState<RestaurantListDTO[]>([]);

  const [cuisines, setCuisines] = useState<string[]>(["French","Egyptian","Italian","Chinese","Japanese","Indian","Mexican","American"]);
  const [Government, setGovernment] = useState<string[]>(["Cairo","Giza","Alexandria","Qalyubia"]);


  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      const data = await searchRestaurants({query,page, pageSize});
      if (data) {
        setResults(data);
      } else {
        setResults([]);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <MainLayout>
        <div id='searchPage' className='bg-[#061C1A] p-1 lg:p-5 my-10 flex gap-x-3 lg:gap-x-5 w-full py-2 rounded-md'>

            <div id='Filtering' className="rounded-md flex flex-col lg:px-5 bg-[#142A29] h-[500px] min-w-[75px] lg:min-w-[200px] lg:max-w-[200px] text-amber-50">

              <div id="Cuisines" className='flex flex-col items-center gap-y-2 lg:gap-y-3 my-2 lg:my-'>

                <div className='flex'>
                  <img src="/cuisine.png" alt="filter by cuisine" className='size-5' />
                  <h1 className='text-lg lg:text-xl font-semibold'>Cuisines</h1>
                </div>

                <div id="cuisinesContainer" className='w-full flex flex-col'>
                  {cuisines.map((cuisine, index)=>(

                    <label className='flex gap-x-2 items-center' htmlFor="">
                      <input type="checkbox" key={index} className='size-4'/>
                      {cuisine}
                    </label>

                  ))}
                </div>

              </div>


              <div id="Government" className='flex flex-col items-center gap-y-2 lg:gap-y-3 my-2 lg:my-'>

                <div className='flex'>
                  <img src="/cuisine.png" alt="filter by cuisine" className='size-5' />
                  <h1 className='text-lg lg:text-xl font-semibold'>Governments</h1>
                </div>

                <div id="cuisinesContainer" className='w-full flex flex-col'>
                  {Government.map((gov, index)=>(

                    <label className='flex gap-x-2 items-center' htmlFor="">
                      <input type="checkbox" key={index} className='size-4'/>
                      {gov}
                    </label>

                  ))}
                </div>

              </div>

            </div>

            <div id='searchResults' className='flex flex-col'>

              <div id='restaurantsGrid' className="grid grid-cols-3 lg:grid-cols-4 gap-x-2 lg:gap-x-4 gap-y-3 lg:gap-y-4">
                {results.map((restaurant) => (
                <RestaurantCard
                    key={restaurant.id}
                    id = {restaurant.id}
                    name={restaurant.name}
                    cuisine={restaurant.cuisineName}
                    district={restaurant.district}
                    gov={restaurant.gov}
                    rating={restaurant.rating}
                    image={restaurant.img}
                />
                ))}
              </div>



            </div>

        </div>    

    </MainLayout>
  );
}

export default SearchResultsPage;
