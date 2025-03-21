import { useState } from "react";
import { Download, FileSpreadsheet } from "lucide-react";
import * as XLSX from "xlsx";

import { useOutletContext } from "react-router-dom";
import Loading from "../../Tools/Loading";
import StagairesProfile from "../Stagaires/StagairesProfile";
import useFetch from "../../Hooks/useFetch";
import Select from "./Select";
import Search from "./Search";
const GroupsLists = () => {
  const [darkMode] = useOutletContext();
  const [selectedGroup, setSelectedGroup] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [exportLoading, setExportLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const { data: branches, loading: loadingBranches } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/admin/branches`
  );

  const { data: students, loading: loadingStudents } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/students?group=${selectedGroup}`,
    [selectedGroup]
  );
  const { data: finds, loading: findsLoading } = useFetch(
    `http://localhost:8000/api/admin/student?search=${searchQuery}`
  );
  console.log(finds);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = (student) => {
    setIsOpen(false);
    setTimeout(() => {
      setSelectedStudent(student);
      setIsOpen(true);
    }, 100);
  };

  const exportToExcel = async () => {
    try {
      setExportLoading(true);

      const exportData = students.map((student) => ({
        "Nom de l'étudiant": student.first_name + " " + student.last_name,
        Classe: student.group_name,
        Retards: student.absences_count,
        "Note /20": student.mark,
        "Date d'export": new Date().toLocaleDateString("fr-FR"),
      }));

      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, `Classe ${selectedGroup}`);
      XLSX.writeFile(
        wb,
        `Présences_${selectedGroup}_${
          new Date().toISOString().split("T")[0]
        }.xlsx`
      );
    } catch (error) {
      console.error("Export failed:", error);
      alert("L'export a échoué. Veuillez réessayer.");
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <div
      className={`space-y-4 p-4 md:p-8 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {loadingStudents ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              {loadingBranches ? (
                <h1>looading</h1>
              ) : (
                <Select
                  branches={branches}
                  setSelectedGroup={setSelectedGroup}
                  selectedGroup={selectedGroup}
                />
              )}
            </div>
            <Search
              darkMode={darkMode}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              findsLoading={findsLoading}
              finds={finds}
            />
            <div className="flex gap-2">
              <button
                className={`flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 ${
                  exportLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={exportToExcel}
                disabled={exportLoading}
              >
                <FileSpreadsheet className="h-4 w-4" />
                Exporter Excel
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => window.print()}
              >
                <Download className="h-4 w-4" />
                PDF
              </button>
            </div>
          </div>

          <div
            className={`rounded-lg shadow-md p-4 ${
              darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-black"
            }`}
          >
            <div
              className={`flex flex-col md:flex-row justify-between items-center border-b pb-2 mb-4 ${
                darkMode ? "bg-gray-800" : ""
              }`}
            >
              <h2 className="text-lg font-semibold">
                Vue d`ensemble de la classe: {selectedGroup}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    className={
                      darkMode ? "bg-gray-700" : "bg-gray-100 rounded-lg"
                    }
                  >
                    <th className="px-4 py-2 text-left font-medium">Prenom</th>
                    <th className="px-4 py-2 text-left font-medium">Nom</th>
                    <th className="px-4 py-2 text-left font-medium">
                      Total Absences
                    </th>
                    <th className="px-4 py-2 text-left font-medium">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr
                      key={student.student_id}
                      className={`cursor-pointer hover:bg-gray-100 ${
                        darkMode ? "hover:bg-gray-700" : ""
                      }`}
                      onClick={() => handleOpen(student)}
                    >
                      <td className="px-4 py-2">{student.first_name}</td>
                      <td className="px-4 py-2">{student.last_name}</td>
                      <td className="px-4 py-2">{student.absences_count}</td>
                      <td className="px-4 py-2">{student.mark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {selectedStudent && isOpen && (
            <StagairesProfile
              student={selectedStudent}
              darkMode={darkMode}
              onClose={handleClose}
              onOpen={isOpen}
            />
          )}
        </>
      )}
    </div>
  );
};

export default GroupsLists;
