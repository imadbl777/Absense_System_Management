import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../Navigation/SideMenu/SideMenu";
import Navbar from "../Navigation/Navbar";

const StudentLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/student/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        setStudentInfo(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentProfile();
  }, []);

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      } min-h-screen`}
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex">
        <SideMenu darkMode={darkMode} />
        <main className="flex-1">
          <Outlet context={[darkMode, studentInfo, loading]} />{" "}
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
