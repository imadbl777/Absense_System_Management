/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";

import Navbar from "./Navigation/Navbar";
import { useState } from "react";
import SideMenu from "./Navigation/SideMenu/SideMenu";

const Layout = ({ role }) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen min-w-[100%] ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex">
        <div className="z-50 flex">
          <SideMenu darkMode={darkMode} role={role} />
        </div>
        <main className="flex-1 w-5/6  ">
          <Outlet context={[darkMode]} />
        </main>
      </div>
    </div>
  );
};

export default Layout;
