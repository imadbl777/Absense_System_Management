import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { Bell, BellOff } from "lucide-react";

const StudentChat = () => {
  const [messages, setMessages] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);


  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === "granted");
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };


  const showNotification = (message) => {
    if (notificationsEnabled && document.hidden) {
      new Notification("New Message", {
        body: `${message.username}: ${message.message}`,
        icon: "/favicon.ico", 
      });
    }
  };

  useEffect(() => {
  
    if (!studentId) {
      setStudentId(`student_${Math.random().toString(36).substr(2, 9)}`);
    }

  
    if (Notification.permission === "granted") {
      setNotificationsEnabled(true);
    }


    const pusher = new Pusher("cb46c8f609ea22184d96", {
      cluster: "eu",
    });


    const channel = pusher.subscribe("mychatapptest");
    
    
    channel.bind("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      showNotification(data);
    });

  
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [studentId, notificationsEnabled]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-4 rounded-lg shadow-lg">
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Student Messages</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={requestNotificationPermission}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                notificationsEnabled
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {notificationsEnabled ? (
                <>
                  <Bell size={16} /> Notifications On
                </>
              ) : (
                <>
                  <BellOff size={16} /> Notifications Off
                </>
              )}
            </button>
            <span className="text-sm text-gray-500">ID: {studentId}</span>
          </div>
        </div>
      </div>

      <div>
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No messages yet. Wait for admin to send a message.
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className="p-3 bg-white rounded-lg shadow-sm border"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-900">
                    {msg.username}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-gray-600">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentChat;