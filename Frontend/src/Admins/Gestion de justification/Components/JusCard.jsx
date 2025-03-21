/* eslint-disable react/prop-types */
import {
  FaBookOpen,
  FaCalendarAlt,
  FaCheck,
  FaClock,
  FaEye,
  FaFileAlt,
  FaUser,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export const JusCard = ({
  justification,
  darkMode,
  formatDate,
  handleImageView,
  handleJustificationAction,
  type
}) => {
  return (
    <div
      key={justification.justification_id}
      className={`${
        darkMode ? "bg-gray-800" : "bg-white"
      } rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200`}
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <FaUser className="text-gray-400" />
              <h3 className="font-semibold text-lg">
                {justification.student.first_name}
                {justification.student.last_name}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <FaBookOpen className="text-blue-400" />
                <span>{justification.session.subject.subject_name}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <FaCalendarAlt className="text-green-400" />
                <span>{formatDate(justification.session.session_date)}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <FaClock className="text-yellow-400" />
                <span>Soumis le: {formatDate(justification.submitted_at)}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <FaFileAlt className="text-purple-400" />
                <span>{justification.description}</span>
              </div>
            </div>
            <div className="flex justify-end items-center space-x-3 mt-4">
              <button
                onClick={() => handleImageView(justification)}
                className="flex items-center px-4 py-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
              >
                <FaEye className="mr-2" />
                Voir
              </button>
              <button
                onClick={() =>
                  handleJustificationAction(justification, "accept")
                }
                className="flex items-center px-4 py-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors duration-200"
              >
                <FaCheck className="mr-2" />
                Accepter
              </button>
              <button
                onClick={() =>
                  handleJustificationAction(justification, "reject")
                }
                className="flex items-center px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200"
              >
                <IoMdClose className="mr-2" />
                Refuser
              </button>
            </div>
          </div>
        </div>
        <div
          className="w-full md:w-48 h-48 md:h-auto cursor-pointer"
          onClick={() => handleImageView(justification)}
        >
          <img
            src={`http://localhost:8000${justification.document_path}`}
            alt="Justificatif"
            className="h-full w-full object-cover hover:opacity-90 transition-opacity"
          />
        </div>
      </div>
    </div>
  );
};
