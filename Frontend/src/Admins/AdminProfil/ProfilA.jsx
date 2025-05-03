import {
  Building2,
  Mail,
  UserRound,
  Phone,
  Calendar,
  Clock,
} from "lucide-react";
import { useState } from "react";
import useFetch from "../../Hooks/useFetch";
import { useLocation } from "react-router-dom";

const ProfilA = () => {
  const [activeTab, setActiveTab] = useState("info");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const studentId = queryParams.get("studentId");
  console.log(studentId);

  const {
    data: studentData,
    loading,
    error,
  } = useFetch(
    `http://localhost:8000/api/admin/absences?studentId=${studentId}`
  );

  if (loading)
    return <p className="text-center text-gray-500">Chargement...</p>;
  if (error)
    return <p className="text-center text-gray-500">Erreur de chargement</p>;

  const studentRecord = studentData?.[0]; 

  if (!studentRecord)
    return <p className="text-center text-gray-500">Étudiant introuvable</p>;

  const { student, session } = studentRecord;

  return (
    <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden p-6 m-6">
      <div className="flex flex-col md:flex-row md:items-center gap-6 border-b pb-6">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-700 dark:text-gray-200">
          {student.first_name[0]}
          {student.last_name[0]}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            {student.first_name} {student.last_name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Stagiaire • {session.session_topic}
          </p>

          <div className="mt-2">
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                student.mark >= 15
                  ? "bg-green-100 text-green-800"
                  : student.mark >= 10
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {student.mark >= 15
                ? "Excellent"
                : student.mark >= 10
                ? "Passable"
                : "À améliorer"}{" "}
              • Note: {student.mark}/20
            </span>
          </div>
        </div>
      </div>

      <div className="border-b mt-6">
        <nav className="flex gap-6">
          <button
            onClick={() => setActiveTab("info")}
            className={`pb-3 ${
              activeTab === "info"
                ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                : "text-gray-500"
            }`}
          >
            Informations
          </button>
          <button
            onClick={() => setActiveTab("sessions")}
            className={`pb-3 flex items-center gap-1 ${
              activeTab === "sessions"
                ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                : "text-gray-500"
            }`}
          >
            Sessions
            <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
              {studentRecord.attended ? 0 : 1}
            </span>
          </button>
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === "info" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-300" />
              <div>
                <span className="text-sm font-medium text-gray-500">Email</span>
                <p className="text-gray-800 dark:text-gray-200">
                  {student.gmail}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-300" />
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Téléphone
                </span>
                <p className="text-gray-800 dark:text-gray-200">
                  {student.phone_number}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-300" />
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Date de naissance
                </span>
                <p className="text-gray-800 dark:text-gray-200">
                  {student.date_naissance}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-300"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 1.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zM4 19v-2c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v2H4zm2-2h4v-1c0-1.38-1.12-2.5-2.5-2.5S6 15.62 6 17v1zm8-1c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v2h-8v-2zm2 0c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v1h-5v-1z" />
              </svg>
              <div>
                <span className="text-sm font-medium text-gray-500">Sexe</span>
                <p className="text-gray-800 dark:text-gray-200">
                  {student.sexe}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Building2 className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-300" />
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Établissement
                </span>
                <p className="text-gray-800 dark:text-gray-200">
                  ISTA NTIC SIDI MAAROUF CASABLANCA
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <UserRound className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-300" />
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Groupe
                </span>
                <p className="text-gray-800 dark:text-gray-200">
                  {student?.group?.group_name}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "sessions" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-lg">Sessions</h3>
              <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Marquer présence
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Sujet
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Heures
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(session.session_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {session.session_topic}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {session.time} ({session.session_hours}h)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {studentRecord.attended ? (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                          Présent
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                          Absent
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200">
                        Détails
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilA;
