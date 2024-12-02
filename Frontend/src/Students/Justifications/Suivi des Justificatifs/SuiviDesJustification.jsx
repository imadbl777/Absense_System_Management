import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../../Tools/Loading";
import { useOutletContext } from "react-router-dom";

const SuiviDesJustification = () => {
  const [justifications, setJustifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadingIds, setDownloadingIds] = useState(new Set());
  const [darkMode] = useOutletContext();

  const statusColors = {
    pending: "text-yellow-600 bg-yellow-100",
    approved: "text-green-600 bg-green-100",
    rejected: "text-red-600 bg-red-100",
  };

  useEffect(() => {
    fetchJustifications();
  }, []);

  const fetchJustifications = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "http://127.0.0.1:8000/api/my-justifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setJustifications(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(
        err.response?.data?.detail ||
          "Failed to fetch justifications. Please try again."
      );
      setLoading(false);
    }
  };

  const downloadDocument = async (justificationId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/justifications/${justificationId}/download`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
          responseType: "blob",
        }
      );

      const contentType = response.headers["content-type"];
      const isImage = contentType && contentType.startsWith("image/");

      if (!isImage) {
        setError("The downloaded file is not an image");
        return;
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      const fileExtension = contentType.split("/")[1] || "jpg";
      const filename =
        response.headers["content-disposition"]
          ?.split("filename=")[1]
          ?.replace(/"/g, "") || `image_${justificationId}.${fileExtension}`;

      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download Error:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });

      if (err.response) {
        switch (err.response.status) {
          case 403:
            setError("You are not authorized to download this image");
            break;
          case 404:
            setError("Image not found");
            break;
          case 500:
            setError("Server error occurred while downloading the image");
            break;
          default:
            setError(
              "An unexpected error occurred while downloading the image"
            );
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    }
  };

  const renderStatusBadge = (status) => {
    return (
      <span
        className={`px-2 py-1 text-sm rounded ${statusColors[status]} capitalize`}
      >
        {status}
      </span>
    );
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex space-x-4">
      <div className="w-full bg-dark shadow rounded p-4">
        <div className="border-b pb-2 mb-4">
          <h2 className="text-lg font-bold">My Justifications</h2>
        </div>
        <table className="min-w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left border">Date</th>
              <th className="px-4 py-2 text-left border">Subject</th>
              <th className="px-4 py-2 text-left border">Status</th>
              <th className="px-4 py-2 text-left border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {justifications.map((justification) => (
              <tr
                key={justification.justification_id}
                className="hover:bg-gray-50"
              >
                <td className="px-4 py-2 border">
                  {new Date(justification.submitted_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border">
                  {justification.session.session_topic || "N/A"}
                </td>
                <td className="px-4 py-2 border">
                  {renderStatusBadge(justification.status)}
                </td>
                <td className="px-4 py-2 border space-x-2">
                  <button
                    className={`px-2 py-1 text-sm font-semibold text-blue-600 border border-blue-600 rounded 
                      ${
                        downloadingIds.has(justification.justification_id)
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-blue-600 hover:text-white"
                      }`}
                    onClick={() =>
                      downloadDocument(justification.justification_id)
                    }
                    disabled={downloadingIds.has(
                      justification.justification_id
                    )}
                  >
                    {downloadingIds.has(justification.justification_id)
                      ? "Downloading..."
                      : "Download"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuiviDesJustification;
