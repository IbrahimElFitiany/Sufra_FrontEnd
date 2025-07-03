import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { RestaurantListDTO } from "@type/RestaurantListDTO";
import RestaurantCardSkeleton from '@components/RestaurantCardSkeleton';
import RestaurantCard from '@components/RestaurantCard';
import Pagination from '@components/Pagination';
import MainLayout from '@layouts/MainLayout';
import {searchRestaurants} from '@services/RestaurantServices';

function SearchResultsPage() {

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');


  const [page, setPage] = useState<number>(1);
  const [pageSize,setPageSize] = useState<number>(12);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPrevPage, setHasPrevPage] = useState<boolean>(false);

  const [results, setResults] = useState<RestaurantListDTO[]>([]);

  const [cuisines, setCuisines] = useState<string[]>(["French","Egyptian","Italian","Chinese","Japanese","Indian","Mexican","American"]);
  const [Government, setGovernment] = useState<string[]>(["Cairo","Giza","Alexandria","Qalyubia"]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);
  
  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {

    if (!query) return;
    
    const fetchResults = async () => {
      try {
        const data = await searchRestaurants({ query, page, pageSize });
        if (data.items && data.items.length > 0) {
          setResults(data.items);
          setTotalPages(data.totalPages);
          setTotalCount(data.totalCount);
          setHasNextPage(Boolean(data.hasNextPage));
          setHasPrevPage(Boolean(data.hasPreviousPage));
        } 
        else {
          setResults([]);
          setTotalPages(data.totalPages);
        }
      } 
      catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, page, pageSize]);


  const handleOnNext = () => { 
    setPage(page + 1);
  }
  const handleOnPrev = () => { 
    setPage(page - 1);
  }
  const handleOnPageChange = (page:number) => { 
    setPage(page);
  }


  return (
    <MainLayout>
        <div id='searchPage' className='bg-[#061C1A] p-1 lg:p-5 my-10 flex gap-x-3 lg:gap-x-5 w-full py-2 rounded-md'>

            <div id='Filtering' className="rounded-md flex flex-col bg-[#142A29] h-[500px] min-w-[100px] sm:min-w-[150px] lg:min-w-[200px] lg:max-w-[200px] text-amber-50">

              <div id="Cuisines" className='flex flex-col w-full gap-y-2 lg:gap-y-3 my-2 lg:my-'>

                <div className='flex justify-start gap-x-1 items-center px-3'>
                  <img src="/cuisine.png" alt="filter by cuisine" className='size-5' />
                  <h1 className='text-lg lg:text-lg font-medium pt-0.5'>Cuisines</h1>
                </div>

                <div id="cuisinesContainer" className='w-full flex flex-col px-2 lg:px-3'>
                  {cuisines.map((cuisine, index)=>(

                  <label className="flex items-center gap-2">
                    <input type="checkbox" key={index} className="peer hidden"/>
                    <div className="cursor-pointer
                      size-3.5 bg-[#383837] transform rotate-45 peer-checked:bg-[#ffbf8a] border border-[#525252be] transition"></div>
                    <span>{cuisine}</span>
                  </label>

                  ))}
                </div>

              </div>

            </div>

            <div id='searchResults' className='flex flex-col w-full gap-y-5'>

              <div className="flex flex-col gap-y-0.5">
                <h1 className='text-xl font-[InterMed] text-[#B68D67]'>
                  Search Results for <span className='text-[#ffbf8a]'>"{query}"</span>
                </h1>
                <h1 className='text-md font-[InterMed] text-[#838383]'>
                  {totalCount} <span>Restaurant</span>
                </h1>                                
              </div>

              {loading ? (
                <div className="grid grid-cols-3 lg:grid-cols-4 gap-x-2 lg:gap-x-4 gap-y-3 lg:gap-y-4">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <RestaurantCardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                
                <div id="restaurantsGrid" className="grid grid-cols-3 lg:grid-cols-4 gap-x-2 lg:gap-x-4 gap-y-3 lg:gap-y-4">
                  {results.map((restaurant) => (
                    <RestaurantCard
                      key={restaurant.id}
                      id={restaurant.id}
                      name={restaurant.name}
                      cuisine={restaurant.cuisineName}
                      district={restaurant.district}
                      gov={restaurant.gov}
                      rating={restaurant.rating}
                      image={restaurant.img}
                    />
                  ))}
                </div>
              )}
            </div>
        </div>
        <Pagination currentPage={page} totalPages={totalPages} onNext={handleOnNext} onPrev={handleOnPrev} onPageChange={handleOnPageChange} hasNextPage={hasNextPage} hasPrevPage={hasPrevPage}/>

    </MainLayout>
  );
}

export default SearchResultsPage;
