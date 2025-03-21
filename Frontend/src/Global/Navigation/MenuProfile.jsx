import { useState } from "react";
import { CiMenuBurger, CiMenuFries } from "react-icons/ci";

const MenuProfile = () => {
  const [menuProfl, setMenuProfl] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_role");
    window.location.href = "/";
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
        className="transition-transform duration-300 hover:scale-110"
      >
        {menuProfl ? (
          <CiMenuBurger className="text-gray-500 mx-5 w-10 h-6 transition-transform duration-300" />
        ) : (
          <CiMenuFries className="text-gray-500 mx-5 w-10 h-6 transition-transform duration-300" />
        )}
      </button>

      <div 
        className={`absolute right-0 top-16 overflow-hidden transition-all duration-300 ease-in-out
          ${menuProfl ? 'max-h-0 opacity-0' : 'max-h-[200px]'}
        `}
      >
        <div 
          className={`bg-white shadow-lg  rounded-lg transform transition-all duration-300 ease-in-out border
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
          `}
        >
          <ul>
            <li className="text-md border-b py-2 px-4 transition-colors duration-200 hover:bg-gray-50 ">
              <button className="w-full text-left">Mon Profil</button>
            </li>
            <li className="text-md py-2 px-4 transition-colors duration-200 hover:bg-gray-50">
              <button 
                onClick={handleLogout} 
                className="w-full text-left text-red-500 hover:text-red-600"
              >
                Deconnexion
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MenuProfile;