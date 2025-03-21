import { Home, Bell } from "lucide-react";
import { MdOutlineManageHistory } from "react-icons/md";
import { MdDocumentScanner } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { IoMdStats } from "react-icons/io";
import { IoDocumentTextOutline, IoPeople } from "react-icons/io5";
import { BookOpen, Clock7, Mail, MessageSquareMore } from "lucide-react";
import { LiaTeamspeak } from "react-icons/lia";

export const Adminlinks = [
  {
    subLinks: [
      { icon: Home, title: "Page d'Accueil", path: "/admin-dashboard" },
    ],
  },
  {
    head: "Gestion des Étudiants",
    subLinks: [
      {
        icon: IoPeople,
        title: "Liste des Étudiants",
        path: "/Consultation_Des_Absences",
      },
    ],
  },
  {
    head: "Gestion des Justificatifs",
    subLinks: [
      {
        icon: MdDocumentScanner,
        title: "Gestion de justification",
        path: "/Gestion_De_Justification",
      },
    ],
  },
  {
    head: "Communication",
    subLinks: [
      { icon: Bell, title: "Les Alerts", path: "/alerts" },
      { icon: BiSupport, title: "Les Réclamations", path: "/Reclamations" },
    ],
  },
];
export const Studentlinks = [
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
export const Proflinks = [
  {
    head: "Navigation",
    subLinks: [
      { icon: Home, title: "Page d'Accueil", path: "/admin-dashboard" },
      {
        icon: MdOutlineManageHistory,
        title: "Présences",
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
