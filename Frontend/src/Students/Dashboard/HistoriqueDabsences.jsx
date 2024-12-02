/* eslint-disable react/prop-types */
import { format } from "date-fns";
import { Clock } from "lucide-react";

const HistoriqueDabsences = ({ absences, darkMode }) => {
  return (
    <div className={`rounded-lg shadow-md p-6 ml-7 w-1/3 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <h2 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
        Recent Absences
      </h2>
      <div className="space-y-4">
        {absences.map((absence, i) => (
          <div
            key={i}
            className={`flex items-center justify-between p-4 rounded-lg border ${
              darkMode ? "bg-red-600 bg-opacity-20 border-red-500" : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-center space-x-4">
              <Clock className={`h-5 w-5 ${darkMode ? "text-red-400" : "text-red-400"}`} />
              <div>
                <p className={`font-medium ${darkMode ? "text-gray-200" : "text-red-900"}`}>
                  {absence.reason}
                </p>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-red-600"}`}>
                  {format(new Date(absence.date), "PPP")}
                </p>
              </div>
            </div>
            <div className={`font-medium ${darkMode ? "text-red-400" : "text-red-600"}`}>
              {absence.impact} points
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoriqueDabsences;
