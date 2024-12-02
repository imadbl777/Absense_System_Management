import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Calendar, Clock, AlertTriangle, Award } from "lucide-react";
import AbsenceCalendar from "./AbsenceCalendar";
import HistoriqueDabsences from "./HistoriqueDabsences";
import StatCard from "./StatCard";
import Loading from "./Loading";

const Dashboard = () => {
  const [darkMode, studentInfo, loading] = useOutletContext();

  const disciplinePoints = 15;
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9));
  const absences = [
    { date: "2024-09-08", reason: "Illness", count: 1, impact: -2 },
    { date: "2024-10-10", reason: "Family Event", count: 1, impact: -1 },
    { date: "2024-10-21", reason: "Illness", count: 1, impact: -2 },
  ];

  const totalAbsences = absences.reduce((sum, a) => sum + a.count, 0);
  const totalImpact = absences.reduce((sum, a) => sum + a.impact, 0);

  const getPointsStatus = () => {
    if (disciplinePoints === 20 || disciplinePoints >= 16)
      return {
        color: darkMode ? "text-green-400" : "text-green-500",
        message: "Excellent Standing",
      };
    if (disciplinePoints <= 15 && disciplinePoints >= 10)
      return {
        color: darkMode ? "text-yellow-400" : "text-yellow-500",
        message: "Good Standing",
      };
    return {
      color: darkMode ? "text-red-400" : "text-red-500",
      message: "Needs Improvement",
    };
  };

  const status = getPointsStatus();
  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      } p-6 w-full`}
    >
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1
              className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Bonjour {studentInfo.first_name}
            </h1>
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              Année académique 2024-2025
            </p>
          </div>
          <div
            className={`${
              darkMode
                ? "bg-amber-900/20 border-amber-700/50 text-amber-400"
                : "bg-amber-50 border-amber-200 text-amber-700"
            } border rounded-lg p-4 flex items-center gap-2`}
          >
            <AlertTriangle
              className={`h-4 w-4 ${
                darkMode ? "text-amber-400" : "text-amber-500"
              }`}
            />
            <p className="text-sm">
              La prochaine absence aura un impact sur la note de -2 points
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="La Note de discipline"
            value={disciplinePoints}
            subtitle={status.message}
            icon={Award}
            valueColor={status.color}
            darkMode={darkMode}
          />
          <StatCard
            title="Absences totales"
            value={totalAbsences}
            subtitle="absences total par mois"
            icon={Calendar}
            darkMode={darkMode}
          />
          <StatCard
            title="Impact sur les notes"
            value={totalImpact}
            subtitle="Points perdus à cause des absences"
            icon={Clock}
            valueColor={darkMode ? "text-red-400" : "text-red-500"}
            darkMode={darkMode}
          />
        </div>

        <div className="flex p-8">
          <AbsenceCalendar
            absences={absences}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            darkMode={darkMode}
          />
          <HistoriqueDabsences absences={absences} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
