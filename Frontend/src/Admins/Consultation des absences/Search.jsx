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
      <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder="Rechercher..."
        className={`pl-9 pr-4 py-2 rounded-md w-full ${
          darkMode
            ? "bg-gray-700 text-gray-300"
            : "bg-white text-gray-800 border"
        }
      `}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="bg-white rounded-md shadow-lg w-full absolute p-3">
        {findsLoading ? (
          <h1>loading</h1>
        ) : (
          finds.map((f) => (
            <div key={f.student_id} className="flex items-center justify-start">
              <Avatar className="w-8 h-8">
                <AvatarFallback>
                  {() => avatarText(f.first_name, f.last_name)}
                </AvatarFallback>
              </Avatar>

              <h1 className="text-lg border-b-[1px] p-2">
                {f.first_name} {f.last_name}
              </h1>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Search;
