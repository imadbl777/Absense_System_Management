/* eslint-disable react/prop-types */

import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AbsenceCalendar = ({ absences, currentMonth, setCurrentMonth, darkMode }) => {
  const firstDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const startingBlankDays = firstDay.getDay();

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const days = [...Array(daysInMonth).keys()].map((i) => i + 1);

  const isAbsent = (day) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(
      currentMonth.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return absences.some((absence) => absence.date === dateStr);
  };

  return (
    <div className={`rounded-xl shadow-md p-4 w-2/3 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-lg font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>Présence</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              setCurrentMonth(
                new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
              )
            }
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <ChevronLeft className={`h-4 w-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
          </button>
          <span className={`text-sm font-medium min-w-[100px] text-center ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
            {format(currentMonth, "MMMM yyyy")}
          </span>
          <button
            onClick={() =>
              setCurrentMonth(
                new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
              )
            }
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <ChevronRight className={`h-4 w-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <div key={day} className={`text-center font-medium text-xs p-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {day}
          </div>
        ))}

        {[...Array(startingBlankDays)].map((_, i) => (
          <div key={`blank-${i}`} className="aspect-square" />
        ))}

        {days.map((day) => (
          <div
            key={day}
            className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all duration-200 ${
              isAbsent(day)
                ? "bg-gradient-to-br from-red-500 to-red-600 text-white"
                : `${darkMode ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-end gap-3 text-xs">
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${darkMode ? "bg-gray-600 border border-gray-700" : "bg-gray-50 border border-gray-200"}`}></div>
          <span className={`text-gray-600 ${darkMode ? "text-gray-400" : ""}`}>Present</span>
        </div>
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full bg-gradient-to-br from-red-500 to-red-600`}></div>
          <span className={`text-gray-600 ${darkMode ? "text-gray-400" : ""}`}>Absent</span>
        </div>
      </div>
    </div>
  );
};

export default AbsenceCalendar;
