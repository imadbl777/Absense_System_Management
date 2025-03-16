import { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Camera, Scan, Check } from "lucide-react";

const AttendanceScanner = () => {
  const [result, setResult] = useState("");
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [scanner, setScanner] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [audio] = useState(new Audio("/src/Admins/assets/audio3.mp3"));
  const qrBoxRef = useRef(null);

  useEffect(() => {
    const initializeScanner = async () => {
      try {
        const availableCameras = await Html5Qrcode.getCameras();
        setCameras(availableCameras);

        if (availableCameras.length > 0) {
          setSelectedCamera(availableCameras[0].id);
        }
      } catch (err) {
        console.error("Error accessing cameras:", err);
      }
    };

    initializeScanner();
  }, []);

  const startScanner = async (cameraId) => {
    if (scanner) {
      await scanner.stop();
    }

    const html5QrCode = new Html5Qrcode("reader");
    setScanner(html5QrCode);
    setScanning(true);

    try {
      await html5QrCode.start(
        cameraId,
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          audio.play();
          setResult(decodedText);
          setScanning(false);
          markAttendance(decodedText);
        },
        (errorMessage) => {
          console.warn("Scan error:", errorMessage);
        }
      );
    } catch (err) {
      console.error("Error starting scanner:", err);
    }
  };

  const markAttendance = async (studentId) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/mark-attendance",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            student_id: studentId,
            session_id: 1,
          }),
        }
      );

      if (response.ok) {
        alert("Attendance marked successfully!");
      } else {
        alert("Failed to mark attendance.");
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-2">
        <Scan className="text-blue-600" /> Attendance Scanner
      </h1>

      {cameras.length > 1 && (
        <select
          value={selectedCamera || ""}
          onChange={(e) => setSelectedCamera(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          {cameras.map((camera) => (
            <option key={camera.id} value={camera.id}>
              {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
            </option>
          ))}
        </select>
      )}

      <div className="relative">
        <div
          id="reader"
          ref={qrBoxRef}
          className="w-[300px] h-[300px] mx-auto border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden"
        >
          {!result ? (
            <div className="text-center">
              {scanning ? (
                <div className="animate-pulse">
                  <div className="absolute inset-0 border-4 border-blue-500 animate-scan-border"></div>
                  <Camera className="mx-auto text-gray-400" size={64} />
                  <p className="mt-2 text-gray-600">Scanning...</p>
                </div>
              ) : (
                <div
                  onClick={() => startScanner(selectedCamera)}
                  className="cursor-pointer"
                >
                  <Camera className="mx-auto text-gray-400" size={64} />
                  <p className="mt-2 text-gray-600">Click to Scan ID</p>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full bg-green-50 flex flex-col items-center justify-center p-4">
              <Check className="text-green-600" size={64} />
              <p className="text-green-800 font-bold mt-2">Attendance Marked</p>
              <p className="text-green-600">{result}</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes scanBorder {
          0% { clip-path: inset(0 0 100% 0); }
          50% { clip-path: inset(0 0 0 0); }
          100% { clip-path: inset(100% 0 0 0); }
        }
        .animate-scan-border {
          animation: scanBorder 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AttendanceScanner;
