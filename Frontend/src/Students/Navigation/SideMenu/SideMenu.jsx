/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoMdStats } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import ProfilSideMenu from "./ProfilSideMenu";
import ListsSideMenu from "./ListsSideMenu";
import { BookOpen, Clock7, Mail, MessageSquareMore } from "lucide-react";
import { LiaTeamspeak } from "react-icons/lia";

const SideMenu = ({ darkMode }) => {
  const [selectedPath, setSelectedPath] = useState("/student-dashboard");
  const [isExpand, setisExpand] = useState(true);

  const links = [
    {
      head: "Mon Suivi",
      subLinks: [
        {
          icon: IoMdStats,
          title: "Tableau de bord",
          path: "/student-dashboard",
        },
      ],
    },
    {
      head: "Justificatifs",
      subLinks: [
        {
          icon: IoDocumentTextOutline,
          title: "Soumettre un Justificatif",
          path: "/submit",
        },
        {
          icon: Clock7,
          title: "Suivi des Justificatifs",
          path: "/Suivi_Justification",
        },
      ],
    },
    {
      head: "Communication",
      subLinks: [
        { icon: MessageSquareMore, title: "Messages", path: "/messages" },
        { icon: Mail, title: "Contacter l'Administration", path: "/contact" },
      ],
    },
    {
      head: "Aide Et Communication",
      subLinks: [
        { icon: BookOpen, title: "Guide Stagiaire", path: "/guide" },
        { icon: LiaTeamspeak, title: "Support", path: "/support" },
      ],
    },
  ];

  return (
    <div
      className={`${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } h-screen border-r sticky top-0 transition-all duration-300 ease-in-out overflow-hidden ${
        isExpand ? "w-80" : "w-16"
      }`}
      onMouseEnter={() => setisExpand(true)}
      onMouseLeave={() => setisExpand(false)}
    >
      <ProfilSideMenu isExpand={isExpand} darkMode={darkMode} />
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
