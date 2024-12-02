import { useState, useEffect } from "react";
import { CiMenuBurger, CiMenuFries } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const MenuProfile = () => {
  const [menuProfl, setMenuProfl] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

 
  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_role");
    window.location.href = "/";
  };

  const navigateToProfile = () => {
    navigate("/profile");
  };

  const toggleMenu = () => {
    if (menuProfl) {
      setMenuProfl(false);
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false);
      setTimeout(() => setMenuProfl(true), 300);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
      >
        {menuProfl ? (
          <CiMenuBurger className="w-6 h-6 dark:text-white" />
        ) : (
          <CiMenuFries className="w-6 h-6 dark:text-white" />
        )}
      </button>

      <div
        className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-300 ${
          isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-2 pointer-events-none"
        }`}
      >
        <ul className="py-2">
          <li>
            <button
              onClick={navigateToProfile}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white transition-colors"
            >
              Mon Profil
            </button>
          </li>
          <li>
            <button
              onClick={toggleDarkMode}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white transition-colors flex items-center gap-2"
            >
              {darkMode ? (
                <>
                  <MdLightMode className="w-5 h-5" /> Mode Clair
                </>
              ) : (
                <>
                  <MdDarkMode className="w-5 h-5" /> Mode Sombre
                </>
              )}
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Déconnexion
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuProfile;