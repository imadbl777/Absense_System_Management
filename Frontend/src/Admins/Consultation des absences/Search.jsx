import { SearchIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

/* eslint-disable react/prop-types */
function Search({
  darkMode,
  searchQuery,
  setSearchQuery,
  findsLoading,
  finds,
}) {
  function avatarText(first_name, last_name) {
    let Fn = first_name.slice(0, 1);
    let ln = last_name.slice(0, 1);
    return Fn + ln;
  }

  return (
    <div className="relative flex-1">

    <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
  
    <input
      type="text"
      placeholder="Rechercher..."
      className={`pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
        darkMode
          ? "bg-gray-800 text-gray-300 border border-gray-600 placeholder-gray-400"
          : "bg-white text-gray-900 border border-gray-300 placeholder-gray-500"
      }`}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    {searchQuery && (
      <div className="absolute w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {findsLoading ? (
          <h1 className="text-center text-gray-500 py-3">Loading...</h1>
        ) : finds.length > 0 ? (
          finds.map((f) => (
            <div
              key={f.student_id}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer"
            >
              <Avatar className="w-10 h-10">
                <AvatarFallback>{avatarText(f.first_name, f.last_name)}</AvatarFallback>
              </Avatar>
  
              <h1 className="text-md font-medium text-gray-800 dark:text-gray-300">
                {f.first_name} {f.last_name}
              </h1>
            </div>
          ))
        ) : (
          <h1 className="text-center text-gray-500 py-3">Aucun résultat trouvé</h1>
        )}
      </div>
    )}
  </div>
  
  );
}

export default Search;
