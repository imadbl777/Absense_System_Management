/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import Loading from "../../Tools/Loading";
import {
  Card,
  CardContent,
  CardHeader,

} from "@/components/ui/card";

const GroupsList = () => {
  const [darkMode] = useOutletContext();
  const [todayData, setTodayData] = useState({
    groups: [],
    students: [],
    attendance: {},
  });
  const [selectedGroup, setSelectedGroup] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingAttendance, setSavingAttendance] = useState(false);

  useEffect(() => {
    const fetchTodayData = async () => {
      const token = localStorage.getItem("auth_token");
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/professor/today-groups",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Transform attendance data into a more usable format
        const attendanceMap = {};
        response.data.attendance.forEach((record) => {
          if (!attendanceMap[record.student_id]) {
            attendanceMap[record.student_id] = {};
          }
          const sessionNumber =
            response.data.groups.findIndex(
              (g) => g.session_id === record.session_id
            ) + 1;
          attendanceMap[record.student_id][`S${sessionNumber}`] =
            record.attended;
        });

        setTodayData({
          groups: response.data.groups,
          students: response.data.students,
          attendance: attendanceMap,
        });
      } catch (error) {
        console.error("Failed to fetch today's data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodayData();
  }, []);

  const handleAttendanceChange = async (studentId, sessionId, checked) => {
    setSavingAttendance(true);
    try {
      await axios.post("/api/attendance/mark", {
        student_id: studentId,
        sessions: [
          {
            session_id: sessionId,
            attended: checked,
          },
        ],
      });

      setTodayData((prev) => ({
        ...prev,
        attendance: {
          ...prev.attendance,
          [studentId]: {
            ...(prev.attendance[studentId] || {}),
            [`S${sessionId}`]: checked,
          },
        },
      }));
    } catch (error) {
      console.error("Failed to save attendance:", error);
    } finally {
      setSavingAttendance(false);
    }
  };

  const filteredStudents = todayData.students.filter(
    (student) =>
      (!selectedGroup || student.group_id === parseInt(selectedGroup)) &&
      (searchQuery === "" ||
        student.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.card_number.includes(searchQuery))
  );

  const currentGroup = todayData.groups.find(
    (g) => g.group_id === parseInt(selectedGroup)
  );

  return (
    <div
      className={`space-y-4 p-4 md:p-8 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {loading ? (
        <Loading />
      ) : todayData.groups.length === 0 ? (
        <Card className="p-6 text-center">
          <h2 className="text-xl font-semibold">Aucune classe aujourd'hui</h2>
          <p className="text-gray-500 mt-2">
            Vous n'avez pas de cours programmés pour aujourd'hui.
          </p>
        </Card>
      ) : (
        <Card className={`${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <CardHeader className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <select
                className={`px-4 py-2 rounded-md w-full md:w-64 ${
                  darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-white text-gray-800 border"
                }`}
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
                <option value="">Tous les groupes d'aujourd'hui</option>
                {todayData.groups.map((group) => (
                  <option key={group.group_id} value={group.group_id}>
                    {group.group_name} - {group.subject_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un étudiant..."
                className={`pl-9 pr-4 py-2 rounded-md w-full ${
                  darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-white text-gray-800 border"
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>

          <CardContent>
            {currentGroup && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold">
                  {currentGroup.subject_name} - {currentGroup.group_name}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date(currentGroup.session_date).toLocaleDateString(
                    "fr-FR"
                  )}{" "}
                  -{currentGroup.session_hours} heures
                </p>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={darkMode ? "bg-gray-700" : "bg-gray-50"}>
                    <th className="px-4 py-2 text-left">Étudiant</th>
                    <th className="px-4 py-2 text-left">Groupe</th>
                    {todayData.groups.map((_, index) => (
                      <th key={index} className="px-4 py-2 text-center">
                        S{index + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr
                      key={student.student_id}
                      className={`hover:bg-gray-100 ${
                        darkMode ? "hover:bg-gray-700" : ""
                      }`}
                    >
                      <td className="px-4 py-2">
                        {student.first_name} {student.last_name}
                      </td>
                      <td className="px-4 py-2">
                        {
                          todayData.groups.find(
                            (g) => g.group_id === student.group_id
                          )?.group_name
                        }
                      </td>
                      {todayData.groups.map((group, index) => (
                        <td key={index} className="px-4 py-2 text-center">
                          <input
                            type="checkbox"
                            checked={
                              todayData.attendance[student.student_id]?.[
                                `S${index + 1}`
                              ] || false
                            }
                            onChange={(e) =>
                              handleAttendanceChange(
                                student.student_id,
                                group.session_id,
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 rounded focus:ring-2 focus:ring-blue-500"
                            disabled={savingAttendance}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GroupsList;
