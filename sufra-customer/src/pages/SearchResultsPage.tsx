import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { RestaurantListDTO } from "@type/RestaurantListDTO";
import RestaurantCardSkeleton from '@components/RestaurantCardSkeleton';
import RestaurantCard from '@components/RestaurantCard';
import Pagination from '@components/Pagination';
import MainLayout from '@layouts/MainLayout';
import {searchRestaurants} from '@services/RestaurantServices';
import Filtering from '@components/Filtering';


function SearchResultsPage() {
  const [searchParams , setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || undefined;
  const page = parseInt(searchParams.get("page")|| "1", 10);
  const cuisineId = parseInt(searchParams.get("cuisineId") || "", 10) || undefined;
  const districtId = parseInt(searchParams.get("districtId") || "", 10) || undefined;

  const pageSize:number = 12;
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPrevPage, setHasPrevPage] = useState<boolean>(false);

  const [results, setResults] = useState<RestaurantListDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchResults = async () => {
      try {
        console.log(`fetching from the backend with query: ${query}, page: ${page}, pageSize: ${pageSize}, cuisineId: ${cuisineId}, districtId: ${districtId}`);
        const data = await searchRestaurants({ query, page, pageSize,cuisineId,districtId });

        if (isNaN(page) || data.totalPages > 0 && page > data.totalPages || page < 1){
          const params = new URLSearchParams(searchParams);
          params.set('page', String(1));
          setSearchParams(params);
          return;
        }

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
          setTotalCount(data.totalCount);
          setHasNextPage(Boolean(data.hasNextPage));
          setHasPrevPage(Boolean(data.hasPreviousPage));
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);
  




  const handleOnNext = () => { 
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page + 1));
    setSearchParams(params);
  }
  const handleOnPrev = () => { 
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page - 1));
    setSearchParams(params);
  }
  const handleOnPageChange = (page:number) => { 
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    setSearchParams(params);
  }


  return (
    <MainLayout>
        <div id='searchPage' className='bg-[#061C1A] p-1 lg:p-5 my-10 flex gap-x-3 lg:gap-x-5 w-full py-2 rounded-md'>
            <Filtering/>
            <div id='searchResults' className='flex flex-col w-full gap-y-5'>

              <div id='x total found for search' className="flex flex-col gap-y-0.5">
                <h1 className='text-xl font-[InterMed] text-[#B68D67]'>
                  Search Results for <span className='text-[#ffbf8a]'>"{query || cuisineId}"</span>
                </h1>
                <h1 className='text-md font-[InterMed] text-[#838383]'>
                  {totalCount} <span>Restaurant</span>
                </h1>                                
              </div>

              {loading ? 
                (
                  <div className="grid grid-cols-3 lg:grid-cols-4 gap-x-2 lg:gap-x-4 gap-y-3 lg:gap-y-4">
                    {Array.from({ length: 12 }).map((_, index) => (
                      <RestaurantCardSkeleton key={index} />
                    ))}
                  </div>
                ) 
                : 
                (
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
                )
              }
            </div>
        </div>
        <Pagination currentPage={page} totalPages={totalPages} onNext={handleOnNext} onPrev={handleOnPrev} onPageChange={handleOnPageChange} hasNextPage={hasNextPage} hasPrevPage={hasPrevPage}/>

    </MainLayout>
  );
}

export default SearchResultsPage;
