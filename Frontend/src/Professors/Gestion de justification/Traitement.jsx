import { useState } from "react";
import { IoMdExpand } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

/* eslint-disable react/prop-types */
const Traitement = ({ setshow, studentData, onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleClose = () => {
    if (setshow) {
      setshow();
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(comment); 
    }
    handleClose();
  };

  return (
    <div>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm z-40"></div>

      <div className="space-y-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 p-14 shadow-lg rounded-lg">
        <button
          onClick={handleClose}
          className="w-full flex justify-end"
          aria-label="Close"
        >
          <IoCloseSharp className="text-black text-xl" />
        </button>

        <div className="space-y-2">
          <div className="relative group">
            <img
              src={studentData.imageUrl}
              alt=""
              className="w-36 cursor-pointer transition-transform hover:scale-105"
            />
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <IoMdExpand className="text-black bg-white rounded-full p-1 text-xl" />
            </div>
          </div>
          <label htmlFor="comment" className="text-sm font-medium">
            Commentaire interne
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Commentaire pour l'administration..."
            rows={2}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <p className="text-xs text-gray-500">
            Ce commentaire sera visible uniquement par l&apos;administration.
          </p>
          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Envoyer Le Commentaire
          </button>
        </div>
      </div>
    </div>
  );
};

export default Traitement;
