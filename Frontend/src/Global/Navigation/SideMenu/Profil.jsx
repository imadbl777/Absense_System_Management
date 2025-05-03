/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { User } from "lucide-react";
import { Link } from "react-router-dom";

function Profil({ isExpand, darkMode, data, loading, role }) {
console.log(data);

  

  return (
    <div
      className={`p-4 transition-all duration-300 ${
        darkMode ? "text-blue-200" : "text-black"
      }`}
    >
      <Link
        to="/admin/profile"
        className={`flex items-center ${
          isExpand ? "space-x-3" : "justify-center"
        }`}
      >
        <div className="transition-transform duration-300 hover:scale-110">
          <User
            className={`h-8 w-8 ${
              darkMode ? "text-blue-400" : "text-blue-600"
            }`}
          />
        </div>
        {isExpand && (
          <div className="transition-all duration-300 overflow-hidden">
            {loading ? (
              <h1>Loading</h1>
            ) : (
              <h1
                className={`text-xl font-bold ${
                  darkMode ? "hover:text-blue-300" : "hover:text-blue-600"
                }`}
              >
                {data.name}
              </h1>
            )}
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {role}
            </p>
          </div>
        )}
      </Link>
    </div>
  );
}

export default Profil;
