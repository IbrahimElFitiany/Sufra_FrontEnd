import { useState } from "react";


type SearchBarProps = {
  onSearch: (query:string , page:number) => void;
};

function SearchBar({ onSearch }:SearchBarProps) {
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
      <div id="SearchBar" className="text-lg flex-1 mx-8 border border-[#B68D67] rounded-3xl">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search restaurants..."
          className="w-full max-w-md px-1 py-0.5 lg:px-4 lg:py-2 rounded-3xl text-[#B68D67] placeholder-[#B68D67] bg-transparent focus:outline-none"
        />
      </div>
  );

}


export default SearchBar;