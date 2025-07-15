import { useState } from "react";


type SearchBarProps = {
  onSearch:(query:string , page:number) => void
  placeholder:string
  classname?: string;
};

function SearchBar({ onSearch,placeholder,classname}:SearchBarProps) {
  const [query, setQuery] = useState<string>('');

  const handleSearch = async () => {
    onSearch(query,1);
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')  handleSearch();
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
      <div id="SearchBar" className={classname? classname:`flex justify-center items-center text-sm lg:text-lg flex-1 mx-4 lg:mx-8 border border-[#B68D67] rounded-full`}>
        <img src="/search.png" alt="" className="mx-2 size-3 md:mx-4 md:size-5" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="truncate w-full py-0.5 md:py-2  text-[#B68D67] placeholder-[#B68D67] bg-transparent focus:outline-none"
        />
      </div>
  );

}


export default SearchBar;