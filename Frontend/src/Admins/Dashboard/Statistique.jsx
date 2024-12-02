/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  AlertTriangle,
} from "lucide-react";
import { useOutletContext } from "react-router-dom";
import Loading from "../../Tools/Loading";


const token = localStorage.getItem("auth_token");

const StatusCard = ({ title, value, icon: Icon, color, darkMode }) => (
  <div
    className={`flex-1 min-w-[180px] sm:min-w-[240px] m-2 p-4 rounded-lg ${
      darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700"
    } shadow-md hover:shadow-lg transition-shadow duration-200`}
  >
    <div className="flex flex-row items-center justify-between pb-2">
      <h3 className="text-sm font-medium">{title}</h3>
      <Icon className={`h-5 w-5 ${color}`} />
    </div>
    <div className="pt-2">
      <div className="text-2xl font-bold">{value}</div>
    </div>
  </div>
);

StatusCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.string.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

const ErrorDisplay = ({ message, onRetry, darkMode }) => (
  <div
    className={`w-full p-8 flex flex-col items-center justify-center ${
      darkMode ? "text-red-400" : "text-red-500"
    }`}
  >
    <AlertTriangle className="h-12 w-12 mb-4" />
    <p className="text-lg font-medium text-center">{message}</p>
    <button
      onClick={onRetry}
      className={`mt-4 px-6 py-2 rounded-lg transition-colors duration-200 font-medium ${
        darkMode ? "bg-red-800 text-red-300" : "bg-red-100 text-red-600"
      }`}
    >
      Try Again
    </button>
  </div>
);

const ChartSection = ({ data, darkMode }) => (
  <div
    className={`mb-8 mt-6 p-6 rounded-lg shadow-md transition-shadow duration-200 ${
      darkMode ? "bg-gray-800" : "bg-white"
    }`}
  >
    <h2 className="text-lg font-semibold mb-4">6-Month Trend</h2>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={darkMode ? "#374151" : "#e5e7eb"}
        />
        <XAxis
          dataKey="month"
          stroke={darkMode ? "#ffffff" : "#000000"}
          tickLine={false}
        />
        <YAxis stroke={darkMode ? "#ffffff" : "#000000"} tickLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: darkMode ? "#1f2937" : "#ffffff",
            color: darkMode ? "#ffffff" : "#000000",
            border: "none",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
        />
        <Line
          type="monotone"
          dataKey="total"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="approved"
          stroke="#22c55e"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const Statistique = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode] = useOutletContext();

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://127.0.0.1:8000/api/admin/getStatistics",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setStatistics(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching statistics:", err);
      setError(err.message || "Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  if (loading) return <Loading />;
  if (error)
    return (
      <ErrorDisplay
        message={error}
        onRetry={fetchStatistics}
        darkMode={darkMode}
      />
    );

  return (
    <div
      className={`p-4 sm:p-6 min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          Current Month Overview
        </h2>
        <div className="flex flex-wrap justify-center sm:justify-start -m-2">
          <StatusCard
            title="Total Justifications"
            value={statistics.current_month.total_justifications}
            icon={BarChart3}
            color={darkMode ? "text-blue-400" : "text-blue-600"}
            darkMode={darkMode}
          />
          <StatusCard
            title="Approved"
            value={statistics.current_month.approved_justifications}
            icon={CheckCircle}
            color={darkMode ? "text-green-400" : "text-green-600"}
            darkMode={darkMode}
          />
          <StatusCard
            title="Pending"
            value={statistics.current_month.pending_justifications}
            icon={Clock}
            color={darkMode ? "text-orange-400" : "text-orange-600"}
            darkMode={darkMode}
          />
          <StatusCard
            title="Rejected"
            value={statistics.current_month.rejected_justifications}
            icon={XCircle}
            color={darkMode ? "text-red-400" : "text-red-600"}
            darkMode={darkMode}
          />
        </div>
        <ChartSection data={statistics.trend} darkMode={darkMode} />
      </div>
    </div>
  );
};

export default Statistique;
