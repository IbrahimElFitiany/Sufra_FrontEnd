import RegistrationForm from '@components/RegistrationForm';

function RestaurantRegistrationPage() {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full bg-dark-Green'>
      <h1 className='text-[#B68D67] font-[Greethen] text-6xl mt-8'>join Sufrá Today</h1>
      <div className="flex flex-col items-center m-6 rounded-2xl p-6 gap-y-5 bg-[#061C1A] w-[40%]">
        <h1 className="text-[#BCBCBC] text-xs">
          A member of our team will reach out shortly to discuss your needs and if you'd like, give you a platform demo
        </h1>

        <div className="w-full p-5 pt-9 rounded-xl border-1 border-[#B68D67]">
          <RegistrationForm/>
        </div>
      </div>
    </div>
  );
}

export default RestaurantRegistrationPage;