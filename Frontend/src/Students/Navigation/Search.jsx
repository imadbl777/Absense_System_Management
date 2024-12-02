

import { useState } from "react";

const Search = () => {
  const [showSearch, setShowSearch] = useState(true);
  return (
    <div className="relative inline-block ">
      {showSearch ? (
        <button onClick={() => setShowSearch(!showSearch)}>
          <i className="bx bx-search-alt text-2xl mx-5 text-gray-500"></i>
        </button>
      ) : (
        <div className="relative inline-block">
          <input
            type="text"
            placeholder="Search..."
            className="bg-white pl-4 pr-10 h-9 w-80 border border-gray-300 rounded-full focus:outline-none placeholder:font-medium placeholder:text-gray-400"
          />
          <button onClick={() => setShowSearch(!showSearch)}>
            <i className="bx bxs-x-circle absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
