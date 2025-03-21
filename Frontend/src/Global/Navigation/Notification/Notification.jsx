import { useState, useEffect } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import { Bell, Clock, FileText } from "lucide-react";

const Notification1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const darkMode = false;

  useEffect(() => {
    fetchNotifications();
    setupPusherListener();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/notifications",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const setupPusherListener = () => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    });

    const channel = pusher.subscribe("mychatapptest");

    channel.bind("new-admin-notification", (data) => {
      setNotifications((prev) => [
        {
          id: data.id,
          studentName: data.student_name,
          message: data.message,
          type: data.type,
          read: false,
          createdAt: data.created_at,
        },
        ...prev,
      ]);

      if (Notification.permission === "granted") {
        new Notification("New Admin Notification", {
          body: data.message,
          icon: "/favicon.ico",
        });
      }
    });

    if (Notification.permission === "default") {
      Notification.requestPermission();
    }

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  };
  console.log(notifications);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-full transition-colors ${
          darkMode
            ? "hover:bg-gray-700 text-gray-300"
            : "hover:bg-gray-100 text-gray-600"
        }`}
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-96 rounded-lg shadow-lg border z-50 ${
            darkMode
              ? "bg-gray-800 border-gray-600 text-white"
              : "bg-white border-gray-200 text-black"
          }`}
        >
          <div
            className={`p-4 border-b ${
              darkMode ? "border-gray-600" : "border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3
                className={`text-lg font-semibold ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Admin Notifications
              </h3>
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {notifications.length} total
              </span>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div
                className={`p-4 text-center ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Loading notifications...
              </div>
            ) : notifications.length === 0 ? (
              <div
                className={`p-4 text-center ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                No new notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b transition-colors ${
                    darkMode
                      ? `border-gray-600 hover:bg-gray-700 ${
                          notification.read ? "bg-gray-800" : "bg-gray-700"
                        }`
                      : `border-gray-100 hover:bg-gray-50 ${
                          notification.read ? "bg-white" : "bg-blue-50"
                        }`
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <FileText
                          className={`h-4 w-4 ${
                            darkMode ? "text-blue-400" : "text-blue-500"
                          }`}
                        />
                        <p
                          className={`font-medium ${
                            darkMode ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          {notification.type} Notification
                        </p>
                      </div>
                      <p
                        className={`text-sm mt-1 ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {notification.message}
                      </p>
                      <div
                        className={`flex items-center mt-2 text-xs ${
                          darkMode ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTime(notification.created_at)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification1;
