/* eslint-disable react/prop-types */
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProfilSideMenu = ({ isExpand, darkMode }) => {
  const [headName, setHeadName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeadName = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/student/details",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        setHeadName(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); 
      }
    };

    fetchHeadName();
  }, []);

  return (
    <div
      className={`p-4 transition-all duration-300 ${
        darkMode ? "text-gray-200" : "text-black"
      }`}
    >
      <Link
        to="/profile"
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
            <h1
              className={`text-xl font-bold ${
                darkMode ? "hover:text-blue-300" : "hover:text-blue-600"
              }`}
            >
              {loading ? "Loading..." : `${headName.first_name} ${headName.last_name}`}
            </h1>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {loading ? "Loading..." : headName.group_name}
            </p>
          </div>
        )}
      </Link>
    </div>
  );
};

export default ProfilSideMenu;
