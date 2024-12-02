import { useState, useEffect } from "react";
import axios from "axios";
import { Search, Download, FileSpreadsheet } from "lucide-react";
import * as XLSX from "xlsx";

import { useOutletContext } from "react-router-dom";
import Loading from "../../Tools/Loading";
import StagairesProfile from "../Stagaires/StagairesProfile";


const GroupsLists = () => {
  const [darkMode] = useOutletContext();
  const [branches, setBranches] = useState([]);
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [exportLoading, setExportLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("auth_token");
      try {
        const [branchesResponse, groupsResponse, studentsResponse] =
          await Promise.all([
            axios.get("http://127.0.0.1:8000/api/branches", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get("http://127.0.0.1:8000/api/groups", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get("http://127.0.0.1:8000/api/students", {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);
        setBranches(branchesResponse.data);
        setGroups(groupsResponse.data);
        setStudents(studentsResponse.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredGroups = groups.filter(
    (group) => !selectedBranch || group.branch_id === parseInt(selectedBranch)
  );

  const filteredStudents = students
    .filter(
      (student) =>
        !selectedBranch || student.branch_id === parseInt(selectedBranch)
    )
    .filter(
      (student) => !selectedGroup || student.group_id === Number(selectedGroup)
    )
    .map((student) => {
      const studentGroup = groups.find(
        (group) => group.group_id === student.group_id
      );
      return {
        ...student,
        group_name: studentGroup ? studentGroup.group_name : "",
      };
    })
    .filter(
      (student) =>
        student.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.card_number.includes(searchQuery)
    );

  const getGradeColor = (grade) => {
    if (grade >= 16) return "bg-green-100 text-green-800";
    if (grade >= 14) return "bg-emerald-100 text-emerald-800";
    if (grade >= 12) return "bg-yellow-100 text-yellow-800";
    if (grade >= 10) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

  const exportToExcel = async () => {
    try {
      setExportLoading(true);

      const exportData = filteredStudents.map((student) => ({
        "Nom de l'étudiant": student.first_name + " " + student.last_name,
        Classe: student.group_name,
        "Total Absences": student.total_absences,
        "Absences Justifiées": student.justified_absences,
        Retards: student.tardies,
        "Note /20": student.grade,
        "Taux de présence": `${(
          (1 - student.total_absences / 100) *
          100
        ).toFixed(1)}%`,
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
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <select
                className={`px-4 py-2 rounded-md w-full md:w-40 ${
                  darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-white text-gray-800 border"
                }`}
                value={selectedBranch}
                onChange={(e) => {
                  setSelectedBranch(e.target.value);
                  setSelectedGroup("");
                }}
              >
                <option value="">Toutes les branches</option>
                {branches.map((branch) => (
                  <option key={branch.branch_id} value={branch.branch_id}>
                    {branch.branch_name}
                  </option>
                ))}
              </select>
              <select
                className={`px-4 py-2 rounded-md w-full md:w-40 ${
                  darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-white text-gray-800 border"
                }`}
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
                <option value="">Tous les groupes</option>
                {filteredGroups.map((group) => (
                  <option key={group.group_id} value={group.group_id}>
                    {group.group_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className={`pl-9 pr-4 py-2 rounded-md w-full ${
                  darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-white text-gray-800 border"
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
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
                Vue d`ensemble de la classe:{" "}
                {filteredGroups.find((g) => g.group_id === selectedGroup)
                  ?.group_name || "Tous les groupes"}
              </h2>
              <span className="text-sm text-gray-500">
                Total étudiants: {filteredStudents.length}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`bg-gray-50 ${darkMode ? "bg-gray-700" : ""}`}>
                    <th className="px-4 py-2 text-left">Group</th>
                    <th className="px-4 py-2 text-left">Étudiant</th>
                    <th className="px-4 py-2 text-left">Total Absences</th>
                    <th className="px-4 py-2 text-left">Justifiées</th>
                    <th className="px-4 py-2 text-left">Retards</th>
                    <th className="px-4 py-2 text-left">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr
                      key={student.student_id}
                      className={`cursor-pointer hover:bg-gray-100 ${
                        darkMode ? "hover:bg-gray-700" : ""
                      }`}
                      onClick={() => handleOpen(student)}
                    >
                      <td className="px-4 py-2">{student.group_name}</td>
                      <td className="px-4 py-2">
                        {student.first_name} {student.last_name}
                      </td>
                      <td className="px-4 py-2 font-semibold">
                        {student.total_absences}
                      </td>
                      <td className="px-4 py-2">
                        {student.justified_absences}
                      </td>
                      <td className="px-4 py-2">{student.tardies}</td>
                      <td
                        className={`px-4 py-2 font-semibold ${getGradeColor(
                          student.grade
                        )}`}
                      >
                        {student.grade}
                      </td>
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
