
function Filtering() {

    const cuisines = ["French","Egyptian","Italian","Chinese","Japanese","Indian","Mexican","American"]
            
    return (
                <div id='Filtering' className="rounded-md flex flex-col bg-[#142A29] h-[500px] min-w-[100px] sm:min-w-[150px] lg:min-w-[200px] lg:max-w-[200px] text-amber-50">

                    <div id="Cuisines" className='flex flex-col w-full gap-y-2 lg:gap-y-3 my-2 lg:my-'>

                        <div className='flex justify-start gap-x-1 items-center px-3'>
                        <img src="/cuisine.png" alt="filter by cuisine" className='size-5' />
                        <h1 className='text-lg lg:text-lg font-medium pt-0.5'>Cuisines</h1>
                        </div>

                        <div id="cuisinesContainer" className='w-full flex flex-col px-2 lg:px-3'>
                            {cuisines.map((cuisine, index) => (
                            <label key={index} className="flex items-center gap-2">
                                <input
                                type="radio"
                                name="cuisine"
                                value={cuisine}
                                className="peer hidden"
                                />
                                <div className="cursor-pointer
                                size-3.5 bg-[#383837] transform rotate-45 peer-checked:bg-[#ffbf8a] border border-[#525252be] transition">
                                </div>
                                <span>{cuisine}</span>
                            </label>
                            ))}
                        </div>

                    </div>

                </div>

    )
}

export default Filtering