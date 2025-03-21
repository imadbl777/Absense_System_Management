import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Students/Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Justification from "../Admins/Gestion de justification/Jusification";
import AlertSystem from "../Admins/Alerts/AlertSystem";
import AdminDashboard from "../Admins/Dashboard/AdminDashboard";

import StudentJustificationForm from "../Students/Justifications/StudentJustificationForm";
import StudentLogin from "../Students/Login/StudentLogin";
import AdminLogin from "../Admins/login/AdminLogin";
import GroupsLists from "../Admins/Consultation des absences/GroupsLists";
import Reclamations from "../Admins/Reclamations/Reclamations";
import StudentChat from "../Students/StudentChat";
import NotFoundPage from "../Global/NotFound";
import ProfLogin from "../Professors/login/ProfLogin";
import SuiviDesJustification from "../Students/Justifications/Suivi des Justificatifs/SuiviDesJustification";
import ProfDashboard from "../Professors/Dashboard/ProfDashboard";
import AuthSystem from "../AuthSystem";
import AdminProfile from "../Admins/AdminProfil/AdminProfil";
import Layout from "../Global/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthSystem />,
  },
  {
    path: "/student/login",
    element: <StudentLogin />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/professor/login",
    element: <ProfLogin />,
  },
  {
    element: (
      <ProtectedRoute allowedRole="student">
        <Layout role={"student"} />
      </ProtectedRoute>
    ),
    children: [
      { path: "/student-dashboard", element: <Dashboard /> },
      // { path: "/profile", element: <StudentProfile /> },
      { path: "/submit", element: <StudentJustificationForm /> },
      { path: "/messages", element: <StudentChat /> },
      { path: "/Suivi_Justification", element: <SuiviDesJustification /> },
      { path: "/contact", element: <div>Contact Page</div> },
      { path: "/guide", element: <div>Guide Page</div> },
      { path: "/support", element: <div>Support Page</div> },
    ],
  },
  {
    element: (
      <ProtectedRoute allowedRole="admin">
        <Layout role={"admin"} />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/admin-dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/Gestion_De_Justification",
        element: <Justification />,
      },
      {
        path: "/Consultation_Des_Absences",
        element: <GroupsLists />,
      },
      {
        path: "/Alerts",
        element: <AlertSystem />,
      },
      {
        path: "/Reclamations",
        element: <Reclamations />,
      },
      {
        path: "/admin/profile",
        element: <AdminProfile/>,
      },
    ],
  },
  {
    element: (
      <ProtectedRoute allowedRole="prof">
        <Layout role={"prof"} />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/professor-dashboard",
        element: <ProfDashboard />,
      },

      {
        path: "/Consultation_Des_Absences",
        element: <GroupsLists />,
      },
      {
        path: "/Alerts",
        element: <AlertSystem />,
      },
      {
        path: "/Reclamations",
        element: <Reclamations />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
