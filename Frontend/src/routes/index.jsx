import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Students/Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Justification from "../Admins/Gestion de justification/Jusification";
import AlertSystem from "../Admins/Alerts/AlertSystem";
import AdminDashboard from "../Admins/Dashboard/AdminDashboard";
import StudentProfile from "../Students/Navigation/SideMenu/StudentProfile";
import Authsystem from "../Students/Authsystem";
import StudentJustificationForm from "../Students/Justifications/StudentJustificationForm";
import StudentLogin from "../Students/Login/StudentLogin";
import AdminLogin from "../Admins/login/AdminLogin";
import GroupsLists from "../Admins/Consultation des absences/GroupsLists";
import AdminLayout from "../Admins/Layouts/AdminLayout";
import StudentLayout from "../Students/Layouts/StudentLayout";
import Reclamations from "../Admins/Reclamations/Reclamations";
import StudentChat from "../Students/StudentChat";
import NotFoundPage from "../Global/NotFound";
import SuiviDesJustification from "../Students/Justifications/Suivi des Justificatifs/SuiviDesJustification";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Authsystem />,
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
    element: (
      <ProtectedRoute allowedRole="student">
        <StudentLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/student-dashboard", element: <Dashboard /> },
      { path: "/profile", element: <StudentProfile /> },
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
        <AdminLayout />
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
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
