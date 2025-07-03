const RestaurantCardSkeleton = () => {
  return (
    <div className="animate-pulse mx-auto w-full aspect-[388/400] flex flex-col items-center  rounded-sm lg:rounded-md bg-[#2B3C39] p-2 shadow-sm">

      <div className="h-[60%] w-full rounded-md bg-[#A7A49E]" />
      <div className="flex flex-col w-full">

        <div className="mr-20 mt-3 h-6 w-3/4 rounded bg-[#A7A49E]" />
        <div className="mt-3 h-4 w-1/2 rounded bg-[#A7A49E]" />

        <div className="flex w-full justify-between ">
          <div className="mt-6 h-5 w-[60%] rounded bg-[#A7A49E]" />
          <div className="mt-6 h-5 w-[30%] rounded bg-[#A7A49E]" />
        </div>
      </div>

    </div>
  );
};

export default RestaurantCardSkeleton;
