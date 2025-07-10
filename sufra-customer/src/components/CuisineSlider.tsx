import { useEffect, useState } from 'react';
import { getCuisinesDisplay } from '@services/CuisineServices';
import { Link } from 'react-router-dom';

interface CuisineSlide {
  cuisineId: number;
  cuisineName: string;
  cuisineImage: string;
}

function CuisineSlider() {
  const [cuisines, setCuisines] = useState<CuisineSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  useEffect(() => {
    const fetchAndPreload = async () => {
      try {
        const cuisineData = await getCuisinesDisplay();
        setCuisines(cuisineData);

        const loadPromises = cuisineData.map((item:CuisineSlide) => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = item.cuisineImage;
            img.onload = () => resolve();
            img.onerror = () => resolve();
          });
        });

        await Promise.all(loadPromises);
        setAllImagesLoaded(true);

      } catch (err) {
        setError('Failed to load cuisines.');
        console.error(err);
      }
      finally {
        setLoading(false);
      }
    };

    fetchAndPreload();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % cuisines.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + cuisines.length) % cuisines.length);
  };


  return (
    <div className="w-[95%] lg:w-full my-10 gap-x-10 relative">

      <button 
        role='button'
        id='prev-Arrow' 
        onClick={prevSlide} 
        className="absolute top-[50%] left-3 z-10 lg:left-[-4rem] size-3 lg:size-6 bg-[#B68D67] rotate-45 cursor-pointer transition-colors duration-300 hover:bg-[#DBB28C]"
        aria-label="Previous cuisine">
      </button>

      {/* Slider */}
      {loading ? 
        (<div className='w-full aspect-[1708/500] md:aspect-[1708/319]  lg:aspect-[1708/319] animate-pulse bg-[#2B3C39] rounded-lg'></div>)
        : error ? 
        (<div className="w-full aspect-[1708/500] md:aspect-[1708/319] lg:aspect-[1708/319] flex items-center justify-center text-[#DBB28C] text-xl bg-[#2B3C39] rounded-lg">
          Failed to load cuisines. Please try again later.
          </div>
        ):
        (<Link to={`/search/?cuisineId=${encodeURIComponent(cuisines[currentSlide].cuisineId)}`} className="py-4 lg:py-12 w-full lg:w-[82%] border-[#B68D67] border-y-1">
          <div className="relative flex justify-center items-center aspect-[1708/500] md:aspect-[1708/319]  lg:aspect-[1708/319]">
            {/* Overlay */}
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.49)] rounded-lg"></div>

            {/* Title */}
            <div className="absolute inset-0 flex justify-center items-center rounded-lg">
              <h2 className="text-[#DBB28C] text-4xl lg:text-8xl font-[Greethen]">
                {cuisines[currentSlide].cuisineName}
              </h2>
            </div>

            {/* Image */}
            <img
              src={cuisines[currentSlide].cuisineImage}
              alt={cuisines[currentSlide].cuisineName}
              className="w-full h-full object-cover rounded-lg"
            />

            {/* Indicator Bar */}
            <div className="absolute w-[90%] lg:w-[80%] bottom-2 lg:bottom-5  flex justify-center gap-0.5 lg:gap-2">
              {cuisines.map((_, index) => (
                <div
                  key={index}
                  className={`w-10 lg:w-17 h-1 lg:h-2 transition-all duration-300 ${
                    index === currentSlide ? 'bg-[#DBB28C]' : 'bg-[#9b6d3e]'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </Link>)
      }


      <button 
        role="button"
        id='next-Arrow'
        className="absolute top-[50%] right-3 lg:right-[-4rem] size-3 lg:size-6 bg-[#B68D67] rotate-45 cursor-pointer transition-colors duration-300 hover:bg-[#DBB28C]"
        onClick={nextSlide}
        aria-label="Next cuisine">
      </button>

    </div>
  );
}

export default CuisineSlider;
