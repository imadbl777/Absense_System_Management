import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

import Traitement from "./Traitement";

import ImageViewer from "./ImageViewer";
import TabsComponent from "./TabsComponen";
import Loading from "../../Tools/Loading";

const Justification = () => {
  const [darkMode] = useOutletContext();
  const token = localStorage.getItem("auth_token");

  const [show, setShow] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [justificationsList, setJustificationsList] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/justifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const justifications = response.data.data;
        setJustificationsList(justifications);
        setLoading(false);
        console.log(justifications);
      })
      .catch((error) => {
        console.error("Error fetching justifications:", error);
        setLoading(false);
      });
  }, [token]);

  const handleAction = (justification, action, comment = "") => {
    axios
      .post(
        `http://127.0.0.1:8000/api/justifications/${justification.justification_id}/review`,
        {
          status: action === "accept" ? "approved" : "rejected",
          admin_comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setJustificationsList((prev) =>
          prev.map((j) =>
            j.justification_id === justification.justification_id
              ? {
                  ...j,
                  status: response.data.justification.status,
                  action: action === "accept" ? "accepted" : "rejected",
                  processedDate: new Date().toLocaleDateString(),
                  admin_comment: response.data.admin_comment,
                }
              : j
          )
        );
        setShow(false);
        setSelectedStudent(null);
      })
      .catch((error) => {
        console.error("Error updating justification status:", error);
      });
  };

  const openTraitementModal = (justification) => {
    setSelectedStudent({
      ...justification,
      imageUrl: justification.image_url,
    });
    setShow(true);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageViewer(true);
  };

  const closeImageViewer = () => {
    setShowImageViewer(false);
    setSelectedImage(null);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full p-8">
          <h1 className="text-2xl font-bold mb-4">Gestion des Justificatifs</h1>
          <TabsComponent
            justifications={justificationsList}
            handleAction={handleAction}
            openTraitementModal={openTraitementModal}
            onImageClick={handleImageClick}
            darkMode={darkMode}
          />

          {show && selectedStudent && (
            <Traitement
              setshow={() => setShow(false)}
              studentData={selectedStudent}
              onImageClick={() => handleImageClick(selectedStudent.image_url)}
              onSubmit={(comment) =>
                handleAction(selectedStudent, "reject", comment)
              }
            />
          )}

          {showImageViewer && selectedImage && (
            <ImageViewer imageUrl={selectedImage} onClose={closeImageViewer} />
          )}
        </div>
      )}
    </>
  );
};

export default Justification;
