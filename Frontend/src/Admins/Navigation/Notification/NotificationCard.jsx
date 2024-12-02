/* eslint-disable react/prop-types */
// src/components/Notification/NotificationCard.jsx
import { Eye } from "lucide-react";

const NotificationCard = ({ notification, onMarkAsRead }) => {
  const isNewJustification =
    notification.type === "App\\Notifications\\NewJustificationNotification";
  const isStatusUpdate =
    notification.type === "App\\Notifications\\JustificationStatusNotification";

  return (
    <div
      className={`p-4 mb-2 rounded-lg border ${
        notification.read_at
          ? "bg-gray-50 border-gray-200"
          : "bg-blue-50 border-blue-200"
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">
            {isNewJustification
              ? "New Justification Submission"
              : "Justification Status Update"}
          </h4>
          <p className="text-sm text-gray-600">
            {isNewJustification
              ? `${notification.data.student_name} submitted a justification for ${notification.data.subject_name}`
              : `Status updated to ${notification.data.status} for ${notification.data.subject_name}`}
          </p>
          <p className="text-xs mt-1 text-gray-500">
            {new Date(notification.created_at).toLocaleString()}
          </p>
        </div>
        {!notification.read_at && (
          <button
            onClick={() => onMarkAsRead(notification.id)}
            className="text-gray-600 hover:text-gray-900 transition-colors"
            title="Mark as read"
          >
            <Eye className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
