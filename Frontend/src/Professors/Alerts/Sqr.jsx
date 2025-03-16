import { useState, useEffect } from "react";

const Sqr = () => {
  const studentId = 2;
  const [qrCode, setQrCode] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQrCode = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/qr-code/${studentId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch QR code");
        }
        const data = await response.json();
        setQrCode(data.qr_code);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchQrCode();
  }, [studentId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!qrCode) {
    return <div>Loading QR code...</div>;
  }

  return (
    <div>
      <h1>QR Code for Student ID: {studentId}</h1>
      <img
        src={`data:image/png;base64,${qrCode}`}
        alt={`QR Code for Student ID ${studentId}`}
      />
    </div>
  );
};

export default Sqr;
