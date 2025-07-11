import StarRatings from "react-star-ratings";
import type { FC } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface RestaurantCardProps {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  district: string;
  gov: string;
  image: string;
}

const RestaurantCard: FC<RestaurantCardProps> = ({id,name,cuisine,rating,district,gov,image,}) => {
  
  const navigate = useNavigate();
  const [starSize, setStarSize] = useState(getStarSize(window.innerWidth));

  useEffect(() => {
    const handleResize = () => setStarSize(getStarSize(window.innerWidth));

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div onClick={() => navigate(`/restaurant/${id}`)}>
      <div className="mx-auto aspect-[388/400] flex flex-col items-center bg-[#142A29] shadow-lg rounded-sm lg:rounded-md">

        {/*Restaurant Image*/}
        <img src={image} 
          alt={`${name}`} 
          className="h-[60%] w-full object-cover rounded-t-sm lg:rounded-t-lg" 
        />

        {/*RestaurantDetails*/}
        <div id="RestaurantCardDetails" className="px-1 lg:px-2 py-1 w-full">

            <h2 className="font-[Rohesta] text-[#B68D67] text-xs md:text-sm lg:text-xl xl:text-4xl truncate" title={`${name}`}>{name}</h2>
            <h1 className="text-[#A1A1A1] font-medium truncate text-xs lg:text-md xl:text-lg">{`${district},${gov}`}</h1>

            <div id="Cuisine & Rating" className="flex flex-col gap-y-0.5 lg:flex lg:flex-row justify-between text-[#B68D67] font-[InterMed] text-md mt-0 lg:my-2">

                <div id="Rating" className="shrink-0 flex items-center my-auto">
                    <StarRatings
                        rating={rating}
                        starRatedColor="#F0A252"
                        starEmptyColor="#838383"
                        numberOfStars={5}
                        starDimension={starSize}                        
                        starSpacing="1px"
                    />
                </div>
                
                <div id="cuisine" className="flex items-baseline gap-x-1 my-auto pt-1">
                    <img src="/cuisine1.png" alt={`${name}`} className="size-2 md:size-3 lg:size-3 xl:size-3  2xl:size-4 transform scale-x-[-1]" />
                    <Link to={`/search?query=${cuisine.toLocaleLowerCase()}`} onClick={(e) => e.stopPropagation()}>
                      <p className="text-[8px] md:text-[12px] lg:text-xs xl:text-sm 2xl:text-lg hover:underline">{cuisine}</p>
                    </Link>

                </div> 
            </div>
        </div>

      </div>
    </div>
  );
};


const getStarSize = (width: number) => {
  if (width >= 1536) return "24px"; // 2xl
  if (width >= 1280) return "20px"; // xl
  if (width >= 1024) return "15px"; // lg
  if (width >= 768) return "14px"; // md
  return "10px"; // sm and below
};



export default RestaurantCard;
