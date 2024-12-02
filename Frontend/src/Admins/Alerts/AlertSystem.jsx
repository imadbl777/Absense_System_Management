/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import Pusher from "pusher-js";
import { Loader2 } from "lucide-react";

export default function AlertSystem() {
  const [username, setUsername] = useState("username");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const messagesEndRef = useRef(null);
  const sentMessagesRef = useRef(new Set());
  const token = localStorage.getItem("auth_token");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher("cb46c8f609ea22184d96", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("mychatapptest");
    channel.bind("message", function (data) {
      // Check if we've already handled this message (either from optimistic update or previous event)
      if (data.message && !sentMessagesRef.current.has(data.message)) {
        setMessages(prevMessages => {
          // Double-check if message already exists in state
          const messageExists = prevMessages.some(msg => 
            msg.message === data.message && msg.username === data.username
          );
          
          if (messageExists) {
            return prevMessages;
          }
          
          return [...prevMessages, { ...data, status: 'received' }];
        });
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!message.trim() || sendingMessage) return;

    const tempId = Date.now();
    const newMessage = {
      id: tempId,
      username,
      message: message.trim(),
      status: 'sending',
      timestamp: new Date().toISOString()
    };

    // Add message to sent messages tracking
    sentMessagesRef.current.add(newMessage.message);

    // Optimistically add message
    setMessages(prev => [...prev, newMessage]);
    setSendingMessage(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:8000/api/messages", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          message: newMessage.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }


      setMessages(prev => prev.map(msg => 
        msg.id === tempId ? { ...msg, status: 'sent' } : msg
      ));

    } catch (error) {
      console.error('Failed to send message:', error);
    
      sentMessagesRef.current.delete(newMessage.message);

      setMessages(prev => prev.map(msg => 
        msg.id === tempId ? { ...msg, status: 'failed' } : msg
      ));
    } finally {
      setSendingMessage(false);
    }
  };

  const MessageStatus = ({ status }) => {
    switch (status) {
      case 'sending':
        return <Loader2 className="w-3 h-3 animate-spin text-gray-400" />;
      case 'failed':
        return <span className="text-xs text-red-500">Failed to send</span>;
      case 'sent':
        return <span className="text-xs text-green-500">✓</span>;
      case 'received':
        return <span className="text-xs text-blue-500">✓</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Username Input */}
      <div className="flex items-center justify-between bg-white p-3 border-b rounded-t">
        <input
          className="text-lg font-semibold border border-gray-300 rounded p-2 w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="flex flex-col bg-white border-t mt-4 rounded shadow-sm max-h-96 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={msg.id || index}
            className="border-b p-3 hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-center">
              <strong className="text-sm text-gray-700">
                {msg.username}
              </strong>
              <MessageStatus status={msg.status} />
            </div>
            <div className="text-sm text-gray-500">{msg.message}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>


      <form onSubmit={submit} className="mt-4 relative">
        <input
          className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder={sendingMessage ? "Sending..." : "Write a message"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={sendingMessage}
        />
        {sendingMessage && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
          </div>
        )}
      </form>
    </div>
  );
}