/* eslint-disable react/prop-types */
import { useState } from "react";

import { Home, Bell } from "lucide-react";
import { MdOutlineManageHistory } from "react-icons/md";
import { MdDocumentScanner } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import ListsSideMenu from "./ListsSideMenu";
import AdminProfil from "../../AdminProfil/AdminProfil";

const SideMenu = ({ darkMode }) => {
  const [selectedPath, setSelectedPath] = useState("/admin-dashboard");
  const [isExpand, setIsExpand] = useState(true);

  const links = [
    {
      head: "Navigation",
      subLinks: [
        { icon: Home, title: "Page d'Accueil", path: "/admin-dashboard" },
        {
          icon: MdOutlineManageHistory,
          title: "Consultation Des Absences",
          path: "/Consultation_Des_Absences",
        },
        {
          icon: MdDocumentScanner,
          title: "Gestion de justification",
          path: "/Gestion_De_Justification",
        },
        { icon: Bell, title: "Les Alerts", path: "/alerts" },
        { icon: BiSupport, title: "Les Réclamations", path: "/Reclamations" },
      ],
    },
  ];

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
      {/* <ProfilSideMenu isExpand={isExpand} darkMode={darkMode} /> */}
      <AdminProfil isExpand={isExpand} darkMode={darkMode} />
      <ListsSideMenu
        links={links}
        selectedPath={selectedPath}
        onLinkClick={setSelectedPath}
        isExpand={isExpand}
        darkMode={darkMode}
      />
    </div>
  );
};

export default SideMenu;
