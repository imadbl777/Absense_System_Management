/* eslint-disable react/prop-types */
import { CheckCircle, FileText, Send, X } from "lucide-react";

const ComplaintModal = ({
  selectedComplaint,
  setIsModalOpen,
  getStatusColor,
  getUrgencyColor,
  responseMessage,
  setResponseMessage,
  sendResponse,
  resolveComplaint,
}) => {
  if (!selectedComplaint) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl w-[800px] max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Complaint #{selectedComplaint.id} Details
          </h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-500 hover:text-gray-800"
          >
            <X size={24} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="font-semibold text-gray-600">Submitter:</p>
            <p>
              {selectedComplaint.submitter} ({selectedComplaint.userType})
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Category:</p>
            <p>{selectedComplaint.category}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Status:</p>
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                selectedComplaint.status
              )}`}
            >
              {selectedComplaint.status}
            </span>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Urgency:</p>
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getUrgencyColor(
                selectedComplaint.urgency
              )}`}
            >
              {selectedComplaint.urgency}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold text-gray-600 mb-2">Description:</p>
          <p className="bg-gray-50 p-3 rounded-lg">
            {selectedComplaint.description}
          </p>
        </div>

        {selectedComplaint.attachments &&
          selectedComplaint.attachments.length > 0 && (
            <div className="mb-6">
              <p className="font-semibold text-gray-600 mb-2">Attachments:</p>
              <div className="flex space-x-2">
                {selectedComplaint.attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-100 p-2 rounded"
                  >
                    <FileText className="mr-2 text-blue-600" size={20} />
                    <span>{attachment}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        <div className="mb-6">
          <p className="font-semibold text-gray-600 mb-2">
            Interaction History:
          </p>
          <div className="space-y-2">
            {selectedComplaint.interactions.map((interaction, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-sm text-gray-600">
                    {interaction.type.replace("-", " ").toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(interaction.timestamp).toLocaleString()}
                  </span>
                </div>
                <p>{interaction.message}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex space-x-2">
            <textarea
              value={responseMessage}
              onChange={(e) => setResponseMessage(e.target.value)}
              placeholder="Write your response here..."
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-200"
              rows="4"
            />
            <div className="flex flex-col space-y-2">
              <button
                onClick={sendResponse}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Send size={16} className="mr-2" /> Send
              </button>
              <button
                onClick={() => resolveComplaint(selectedComplaint.id)}
                className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 flex items-center"
              >
                <CheckCircle size={16} className="mr-2" /> Resolve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ComplaintModal;
