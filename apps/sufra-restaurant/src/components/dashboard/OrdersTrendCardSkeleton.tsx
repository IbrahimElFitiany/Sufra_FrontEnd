function OrdersTrendCardSkeleton() {
  return (
    <div className="bg-[linear-gradient(119deg,#162A21,#1B3429)] p-5 rounded-3xl animate-pulse">
      <div className="flex justify-between text-2xl font-extrabold mb-4">
        <div className="h-8 w-40 rounded"></div>
        <div className="h-10 w-10  rounded-full"></div>
      </div>

      <div className="h-20 w-24 rounded mx-auto mb-7"></div>

      <div className="flex justify-between gap-2 text-xs font-medium">
        <div className="flex items-center gap-2">
          <div className="h-[21px] w-[45px] rounded-full"></div>
          <div className="h-4 w-32 rounded"></div>
        </div>

        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-6 w-6 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrdersTrendCardSkeleton