/* eslint-disable react/prop-types */
import logo from "../assets/Logo.png";
import MenuProfile from "./MenuProfile";
import Notification from "./Notification/Notification";
import Search from "./Search";
import { Moon, Sun } from "lucide-react";

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className={`flex items-center justify-between px-6 py-1 border-b z-50 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      <img src={logo} alt="" className={`w-20 pl- ${darkMode ? "bg-gray-800" : "bg-white"}`} />

      <div className="flex items-center space-x-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-lg hover:bg-gray-100 ${darkMode ? "hover:bg-gray-700" : ""}`}
        >
          {darkMode ? (
            <Sun className="h-5 w-5 text-gray-300" />
          ) : (
            <Moon className="h-5 w-5 text-gray-600" />
          )}
        </button>
        <Search />
        <Notification />
        <MenuProfile />
      </div>
    </nav>
  );
};

export default Navbar;
