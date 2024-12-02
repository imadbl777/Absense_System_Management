/* eslint-disable react/prop-types */
const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  valueColor = "text-gray-900",
  darkMode = false,
}) => (
  <div className={`rounded-lg p-6 ${
    darkMode ? "bg-gray-800 shadow-lg" : "bg-white shadow-md"
  }`}>
    <div className="flex items-center justify-between mb-2">
      <h3 className={`text-sm font-medium ${
        darkMode ? "text-gray-300" : "text-gray-600"
      }`}>
        {title}
      </h3>
      <Icon className={`h-4 w-4 ${
        darkMode ? "text-gray-500" : "text-gray-400"
      }`} />
    </div>
    <div className={`text-2xl font-bold ${
      darkMode && valueColor === "text-gray-900" ? "text-gray-100" : valueColor
    }`}>
      {value}
    </div>
    <p className={`text-xs ${
      darkMode ? "text-gray-400" : "text-gray-500"
    }`}>
      {subtitle}
    </p>
  </div>
);

export default StatCard;