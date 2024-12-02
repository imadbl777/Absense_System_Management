import { Outlet } from "react-router-dom";
import SideMenu from "../Navigation/SideMenu/SideMenu";
import Navbar from "../Navigation/Navbar";
import { useState } from "react";

const AdminLayout = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row">
        <SideMenu darkMode={darkMode} className="sm:w-1/4 md:w-1/5 lg:w-1/6 xl:w-1/7" />
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
          <Outlet context={[darkMode]} />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;