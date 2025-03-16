/* eslint-disable react/prop-types */
import { ArrowLeft, User, Calendar, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

const StagairesProfile = ({ onClose, student, onOpen, darkMode }) => {
  const [isOpen, setIsOpen] = useState(onOpen);
  const [isAbsenceHistoryOpen, setIsAbsenceHistoryOpen] = useState(false);

  useEffect(() => {
    setIsOpen(onOpen);
  }, [onOpen]);

  if (!student) {
    return (
      <div
        className={`text-center py-16 ${
          darkMode ? "bg-gray-900 text-gray-400" : "bg-white text-gray-600"
        }`}
      >
        No student data available.
      </div>
    );
  }

  return isOpen ? (
    <div
      className={`fixed inset-0 overflow-y-auto h-full w-full z-50 flex justify-center items-start ${
        darkMode ? "bg-gray-900 bg-opacity-50" : "bg-gray-600 bg-opacity-50"
      }`}
    >
      <div
        className={`relative top-10 mt-10 p-6  w-full max-w-4xl shadow-lg rounded-lg ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => {
              setIsOpen(false);
              onClose();
            }}
            className={`flex items-center ${
              darkMode
                ? "text-gray-300 hover:text-gray-200"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              onClose();
            }}
            className={`${
              darkMode
                ? "text-gray-300 hover:text-gray-200"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center mb-8">
          <div
            className={`${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            } rounded-full p-4`}
          >
            <User
              className={`h-10 w-10 ${
                darkMode ? "text-white" : "text-gray-600"
              }`}
            />
          </div>
          <div className="ml-4 flex-1">
            <h2
              className={`text-2xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {student.first_name} {student.last_name}
            </h2>
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              {student.group_name}
            </p>
            <p className={darkMode ? "text-gray-500" : "text-gray-500"}>
              {student.gmail ? (
                <a
                  href={`mailto:${student.gmail}`}
                  className={`underline ${
                    darkMode
                      ? "text-blue-300 hover:text-blue-400"
                      : "text-blue-600 hover:text-blue-800"
                  }`}
                >
                  {student.gmail}
                </a>
              ) : (
                "No email available"
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div
            className={`${
              darkMode
                ? "bg-blue-900 text-blue-300"
                : "bg-blue-50 text-blue-800"
            } p-4 rounded-lg shadow-md`}
          >
            <p className="text-sm">Total Absences</p>
            <p className="text-2xl font-bold">{student.total_absences}</p>
          </div>
          <div
            className={`${
              darkMode
                ? "bg-green-900 text-green-300"
                : "bg-green-50 text-green-800"
            } p-4 rounded-lg shadow-md`}
          >
            <p className="text-sm">Justified</p>
            <p className="text-2xl font-bold">{student.justified_absences}</p>
          </div>
          <div
            className={`${
              darkMode ? "bg-red-900 text-red-300" : "bg-red-50 text-red-800"
            } p-4 rounded-lg shadow-md`}
          >
            <p className="text-sm">Retards</p>
            <p className="text-2xl font-bold">{student.tardies}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3
            className={`text-lg font-semibold mb-4 flex items-center justify-between ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Absence History
            </div>
            <button
              onClick={() => setIsAbsenceHistoryOpen(!isAbsenceHistoryOpen)}
              className={`flex items-center ${
                darkMode
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <span className="mr-1">
                {isAbsenceHistoryOpen ? "Hide" : "Show"}
              </span>
              <ChevronDown
                className={`h-5 w-5 transform ${
                  isAbsenceHistoryOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          </h3>
          {isAbsenceHistoryOpen && (
            <div
              className={`${
                darkMode
                  ? "bg-gray-700 text-gray-400"
                  : "bg-gray-50 text-gray-700"
              } rounded-lg overflow-hidden shadow-md`}
            >
              <table className="min-w-full divide-y divide-gray-200">
                <thead
                  className={`${
                    darkMode
                      ? "bg-gray-800 text-gray-400"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {student.absenceHistory &&
                  student.absenceHistory.length > 0 ? (
                    student.absenceHistory.map((absence, index) => (
                      <tr key={index}>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-900"
                          }`}
                        >
                          {absence.date}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-900"
                          }`}
                        >
                          {absence.course}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              absence.type === "Justified"
                                ? "bg-green-900 text-green-300"
                                : "bg-red-900 text-red-300"
                            }`}
                          >
                            {absence.type}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-8">
                        No absence history available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default StagairesProfile;
