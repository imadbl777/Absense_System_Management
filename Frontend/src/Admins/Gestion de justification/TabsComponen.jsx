/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { 
  FaCalendarAlt, 
  FaBookOpen, 
  FaClock, 
  FaFileAlt, 
  FaUser,
  FaEye
} from "react-icons/fa";

function TabsComponent({
  justifications: initialJustifications,
  handleAction,
  openTraitementModal,
  onImageClick,
  darkMode,
}) {
  const [activeTab, setActiveTab] = useState("pending");
  const [justifications, setJustifications] = useState(initialJustifications);

  const pendingJustifications = justifications.filter(
    (j) => j.status === "pending"
  );
  const processedJustifications = justifications.filter(
    (j) => j.status === "approved" || j.status === "rejected"
  );

  const handleJustificationAction = (justification, action) => {
    if (action === "reject") {
      openTraitementModal(justification);
      return;
    }

    const updatedJustifications = justifications.map((j) =>
      j.justification_id === justification.justification_id
        ? {
            ...j,
            status: action === "accept" ? "approved" : "rejected",
            reviewed_at: new Date().toISOString(),
          }
        : j
    );
    setJustifications(updatedJustifications);
    handleAction(
      {
        ...justification,
        status: action === "accept" ? "approved" : "rejected",
      },
      action
    );
  };

  const handleImageView = (justification) => {
    onImageClick(`http://localhost:8000/storage/${justification.document_path}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`w-full ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50"}`}>
      
      <div className={`flex p-1 ${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm`}>
        <button
          className={`
            flex-1 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200
            ${activeTab === "pending"
              ? darkMode
                ? "bg-blue-500 text-white"
                : "bg-blue-500 text-white shadow-sm"
              : darkMode
                ? "text-gray-400 hover:bg-gray-700"
                : "text-gray-600 hover:bg-gray-50"
            }
          `}
          onClick={() => setActiveTab("pending")}
        >
          <div className="flex items-center justify-center space-x-2">
            <span>En attente</span>
            <span className={`
              px-2 py-0.5 text-xs rounded-full
              ${activeTab === "pending"
                ? "bg-white bg-opacity-20 text-white"
                : darkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-600"
              }
            `}>
              {pendingJustifications.length}
            </span>
          </div>
        </button>
        <button
          className={`
            flex-1 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200
            ${activeTab === "processed"
              ? darkMode
                ? "bg-blue-500 text-white"
                : "bg-blue-500 text-white shadow-sm"
              : darkMode
                ? "text-gray-400 hover:bg-gray-700"
                : "text-gray-600 hover:bg-gray-50"
            }
          `}
          onClick={() => setActiveTab("processed")}
        >
          <div className="flex items-center justify-center space-x-2">
            <span>Traités</span>
            <span className={`
              px-2 py-0.5 text-xs rounded-full
              ${activeTab === "processed"
                ? "bg-white bg-opacity-20 text-white"
                : darkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-600"
              }
            `}>
              {processedJustifications.length}
            </span>
          </div>
        </button>
      </div>


      <div className="mt-6 space-y-4">
        {activeTab === "pending" &&
          pendingJustifications.map((justification) => (
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
                        {justification.student.first_name} {justification.student.last_name}
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
                        onClick={() => handleJustificationAction(justification, "accept")}
                        className="flex items-center px-4 py-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors duration-200"
                      >
                        <FaCheck className="mr-2" />
                        Accepter
                      </button>
                      <button
                        onClick={() => handleJustificationAction(justification, "reject")}
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
                    src={`http://localhost:8000/storage/${justification.document_path}`}
                    alt="Justificatif"
                    className="h-full w-full object-cover hover:opacity-90 transition-opacity"
                  />
                </div>
              </div>
            </div>
          ))}

        {activeTab === "processed" &&
          processedJustifications.map((justification) => (
            <div
              key={justification.justification_id}
              className={`${
                darkMode ? "bg-gray-800" : "bg-white"
              } rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200`}
            >
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FaUser className="text-gray-400" />
                        <h3 className="font-semibold text-lg">
                          {justification.student.first_name} {justification.student.last_name}
                        </h3>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          justification.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {justification.status === "approved" ? "Accepté" : "Refusé"}
                      </div>
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
                        <FaClock className="text-orange-400" />
                        <span>Traité le: {formatDate(justification.reviewed_at)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 col-span-2">
                        <FaFileAlt className="text-purple-400" />
                        <span>{justification.description}</span>
                      </div>
                      {justification.admin_comment && (
                        <div className="flex items-center space-x-2 text-sm text-gray-500 col-span-2">
                          <FaFileAlt className="text-red-400" />
                          <span>Commentaire: {justification.admin_comment}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div 
                  className="w-full md:w-48 h-48 md:h-auto cursor-pointer"
                  onClick={() => handleImageView(justification)}
                >
                  <img
                    src={`http://localhost:8000/storage/${justification.document_path}`}
                    alt="Justificatif"
                    className="h-full w-full object-cover hover:opacity-90 transition-opacity"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TabsComponent;