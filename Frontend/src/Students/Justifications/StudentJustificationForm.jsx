/* eslint-disable react/no-unescaped-entities */
// import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const StudentJustificationForm = () => {
  const [absentSessions, setAbsentSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [darkMode] = useOutletContext();

  useEffect(() => {
    fetchAbsentSessions();
  }, []);

  const fetchAbsentSessions = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/absent-sessions",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );
      const data = await response.json();
      setAbsentSessions(data);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch absent sessions");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("session_id", selectedSession);
      formData.append("description", description);
      formData.append("document", file);
      const response = await fetch("http://127.0.0.1:8000/api/justifications", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to submit justification");
      }

      setSuccess(true);
      setSelectedSession("");
      setDescription("");
      setFile(null);
      fetchAbsentSessions();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (absentSessions.length === 0) {
    return (
      <div
        className={`max-w-2xl mx-auto mt-8 p-6 border rounded-lg ${
          darkMode
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-white text-black border-gray-300"
        }`}
      >
        <div
          className={`p-4 ${
            darkMode
              ? "bg-gray-700 text-yellow-200"
              : "bg-yellow-100 text-yellow-800"
          } border border-yellow-300 rounded-lg`}
        >
          <p>You don't have any absences that require justification.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`max-w-2xl mx-auto mt-8 p-6 border rounded-lg shadow-lg ${
        darkMode
          ? "bg-gray-800 text-white border-gray-600"
          : "bg-white text-black border-gray-300"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">Submit Absence Justification</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Select Session
          </label>
          <select
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
            required
          >
            <option value="">Select a session...</option>
            {absentSessions.map((session) => (
              <option key={session.session_id} value={session.session_id}>
                {session.subject.subject_name} -{" "}
                {new Date(session.session_date).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Reason for Absence
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
            rows="3"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Supporting Document
          </label>
          <div
            className={`border-2 border-dashed rounded-md p-4 text-center ${
              darkMode ? "border-gray-600" : "border-gray-300"
            }`}
          >
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
              id="document-upload"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              required
            />
            <label htmlFor="document-upload" className="cursor-pointer">
              <span
                className={`mt-2 block text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Click to upload a document
              </span>
            </label>
            {file && (
              <p
                className={`mt-2 text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {file.name}
              </p>
            )}
          </div>
        </div>

        {error && (
          <div
            className={`p-4 ${
              darkMode ? "bg-red-900 text-red-200" : "bg-red-100 text-red-800"
            } border border-red-300 rounded-lg`}
          >
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div
            className={`p-4 ${
              darkMode
                ? "bg-green-900 text-green-200"
                : "bg-green-100 text-green-800"
            } border border-green-300 rounded-lg`}
          >
            <p>Justification submitted successfully!</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded-md hover:bg-blue-700 disabled:opacity-50 ${
            darkMode ? "bg-blue-800 text-white" : "bg-blue-600 text-white"
          }`}
        >
          {loading ? "Submitting..." : "Submit Justification"}
        </button>
      </form>
    </div>
  );
};

export default StudentJustificationForm;
