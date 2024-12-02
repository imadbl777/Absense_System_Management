/* eslint-disable react/prop-types */
import { Mail, Phone, Building2, Users, School, Medal } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import Loading from "../../Dashboard/Loading";

const StudentProfile = () => {
  const [darkMode, studentInfo, loading] = useOutletContext();

  if (loading) {
    return <Loading />;
  }

  if (!studentInfo) {
    return <div>Error loading student information.</div>;
  }

  const InfoCard = ({ icon: Icon, title, info, subInfo }) => (
    <div
      className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
        darkMode
          ? "bg-gray-800 hover:bg-gray-750 border border-gray-700 shadow-md"
          : "bg-white hover:bg-gray-50 border border-gray-100 shadow-lg"
      } p-6 group hover:shadow-xl`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`p-3 rounded-lg ${
            darkMode ? "bg-blue-700" : "bg-blue-100"
          } group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon
            className={`w-6 h-6 ${
              darkMode ? "text-blue-400" : "text-blue-600"
            }`}
          />
        </div>
        <div className="space-y-2">
          <h3
            className={`text-sm font-medium ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-lg font-semibold ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            {info}
          </p>
          {subInfo && (
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {subInfo}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">
        <div
          className={`flex flex-col md:flex-row items-center gap-8 mb-12 p-8 rounded-2xl ${
            darkMode
              ? "bg-gray-800 border border-gray-700"
              : "bg-white shadow-xl"
          }`}
        >
          <div className="relative group">
            <div
              className={`w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold transition-all duration-300 ${
                darkMode
                  ? "bg-gradient-to-br from-blue-600 to-blue-800"
                  : "bg-gradient-to-br from-blue-500 to-blue-600"
              } text-white group-hover:scale-105`}
            >
              {studentInfo.first_name[0]}
              {studentInfo.last_name[0]}
            </div>
          </div>

          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 mb-2">
              <h1
                className={`text-3xl font-bold ${
                  darkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                {studentInfo.first_name} {studentInfo.last_name}
              </h1>
              <div
                className={`px-3 py-1 rounded-full text-sm ${
                  darkMode
                    ? "bg-green-900 text-green-300"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {studentInfo.status}
              </div>
            </div>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Student ID: {studentInfo.card_number}
            </p>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-500" : "text-gray-500"
              }`}
            >
              Academic Year: {studentInfo.year}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoCard
            icon={School}
            title="Branch"
            info={studentInfo.branch_name}
          />
          <InfoCard icon={Users} title="Group" info={studentInfo.group_name} />
          <InfoCard
            icon={Mail}
            title="Email Address"
            info={studentInfo.gmail}
          />
          <InfoCard
            icon={Phone}
            title="Phone Number"
            info={studentInfo.phone_number}
          />
          <InfoCard
            icon={Medal}
            title="Academic Status"
            info="Good Standing"
            subInfo="Current Semester"
          />
          <InfoCard
            icon={Building2}
            title="Campus"
            info="Main Campus"
            subInfo="Casablanca"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
