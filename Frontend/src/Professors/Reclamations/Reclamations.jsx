import { useState } from "react";
import { MessageSquare } from "lucide-react";
import ComplaintModal from "./ComplaintModal";

const Reclamations = () => {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      submitter: "Dr. Emily Smith",
      userType: "Professor",
      category: "Technical Issue",
      description: "Unable to mark attendance for my class",
      status: "New",
      date: "2024-03-15",
      urgency: "High",
      attachments: ["screenshot1.png"],
      resolvedBy: null,
      assignedTo: null,
      interactions: [
        {
          type: "initial",
          timestamp: "2024-03-15T10:30:00Z",
          message: "Complaint submitted about attendance marking system",
        },
      ],
    },
    {
      id: 2,
      submitter: "John Doe",
      userType: "Student",
      category: "User Support",
      description: "Login issues with my student account",
      status: "In Progress",
      date: "2024-03-14",
      urgency: "Medium",
      attachments: [],
      resolvedBy: null,
      assignedTo: "Admin Support Team",
      interactions: [
        {
          type: "response",
          timestamp: "2024-03-14T14:45:00Z",
          message: "Initial investigation started",
        },
      ],
    },
  ]);

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [responseMessage, setResponseMessage] = useState("");

  function filterUrgent(s) {
    setComplaints((prev) => prev.filter((c) => c.urgency === s));
  }
  const getUrgencyColor = (urgency) => {
    const colors = {
      High: "bg-red-100 text-red-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-green-100 text-green-800",
    };
    return colors[urgency] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status) => {
    const colors = {
      New: "bg-blue-100 text-blue-800",
      "In Progress": "bg-yellow-100 text-yellow-800",
      Resolved: "bg-green-100 text-green-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const openComplaintDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setIsModalOpen(true);
  };

  const sendResponse = () => {
    if (!selectedComplaint || !responseMessage) return;

    const newInteraction = {
      type: "admin-response",
      timestamp: new Date().toISOString(),
      message: responseMessage,
    };

    setComplaints((prev) =>
      prev.map((c) =>
        c.id === selectedComplaint.id
          ? {
              ...c,
              interactions: [...c.interactions, newInteraction],
              status: "In Progress",
            }
          : c
      )
    );

    setResponseMessage("");
  };

  const resolveComplaint = (complaintId) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === complaintId
          ? {
              ...c,
              status: "Resolved",
              resolvedBy: "Admin Support Team",
              interactions: [
                ...c.interactions,
                {
                  type: "resolution",
                  timestamp: new Date().toISOString(),
                  message: "Complaint resolved by admin support",
                },
              ],
            }
          : c
      )
    );
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <MessageSquare className="mr-3 text-blue-600" />
          Complaints Management
        </h1>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => filterUrgent("High")}
          className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
        >
          High
        </button>
        <button
          onClick={() => filterUrgent("Medium")}
          className="px-4 py-2 bg-yellow-100 text-white rounded-full hover:bg-yellow-600 transition-colors"
        >
          Medium
        </button>
        <button
          onClick={() => filterUrgent("Low")}
          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          Low
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {complaints.map((complaint) => (
          <div
            key={complaint.id}
            className="p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {complaint.submitter}
              </h3>
              <span
                className={`px-2 py-1 rounded-md ${getStatusColor(
                  complaint.status
                )}`}
              >
                {complaint.status}
              </span>
            </div>
            <p className="text-gray-600 mb-2">{complaint.description}</p>
            <div className="text-sm text-gray-500 mb-2">
              <span className="mr-2">Category: {complaint.category}</span>
              <span className="mr-2">Date: {complaint.date}</span>
              <span className="mr-2">Urgency: {complaint.urgency}</span>
            </div>
            <button
              onClick={() => openComplaintDetails(complaint)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <ComplaintModal
          selectedComplaint={selectedComplaint}
          setIsModalOpen={setIsModalOpen}
          getStatusColor={getStatusColor}
          getUrgencyColor={getUrgencyColor}
          responseMessage={responseMessage}
          setResponseMessage={setResponseMessage}
          sendResponse={sendResponse}
          resolveComplaint={resolveComplaint}
        />
      )}
    </div>
  );
};

export default Reclamations;
