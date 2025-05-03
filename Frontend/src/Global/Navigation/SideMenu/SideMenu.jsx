/* eslint-disable react/prop-types */
import { useState } from "react";
import ListsSideMenu from "./ListsSideMenu";
import { Adminlinks, Proflinks, Studentlinks } from "../../const";
import Profil from "./Profil";
import useFetch from "../../../Hooks/useFetch";
const SideMenu = ({ darkMode, role }) => {
  const [selectedPath, setSelectedPath] = useState("/admin-dashboard");
  const [isExpand, setIsExpand] = useState(true);
  const { data: adminData, loading: adminLoading } = useFetch(
    `http://localhost:8000/api/admin/profil`
  );
  const { data: studentData, loading: studentLoading } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/student/profil`
  );
  const { data: profData, loading: profLoading } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/admin/profil`
  );
  return (
    <div
      className={`${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } pt-5 h-screen border-r sticky top-0 transition-all duration-300 ease-in-out overflow-hidden ${
        isExpand ? "w-80" : "w-16"
      }`}
      onMouseEnter={() => setIsExpand(true)}
      onMouseLeave={() => setIsExpand(false)}
    >
      <Profil
        isExpand={isExpand}
        darkMode={darkMode}
        data={
          role === "admin"
            ? adminData
            : role === "student"
            ? studentData
            : role === "prof"
            ? profData
            : ""
        }
        loading={
          role === "admin"
            ? adminLoading
            : role === "student"
            ? studentLoading
            : role === "prof"
            ? profLoading
            : ""
        }
        role={
          role === "admin"
            ? "adminstration"
            : role === "student"
            ? "Etudiant"
            : role === "prof"
            ? "Foundateur"
            : ""
        }
      />
      <ListsSideMenu
        links={
          role === "admin"
            ? Adminlinks
            : role === "student"
            ? Studentlinks
            : role === "prof"
            ? Proflinks
            : ""
        }
        selectedPath={selectedPath}
        onLinkClick={setSelectedPath}
        isExpand={isExpand}
        darkMode={darkMode}
      />
    </div>
  );
};

export default SideMenu;
