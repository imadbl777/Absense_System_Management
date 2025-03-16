/* eslint-disable react/prop-types */
import { IoCloseSharp } from "react-icons/io5";

const ImageViewer = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-[60] flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white"
        aria-label="Close full screen"
      >
        <IoCloseSharp className="text-3xl hover:text-gray-300 transition-colors" />
      </button>
      <img
        src={imageUrl}
        alt=""
        className="max-h-screen max-w-screen-xl object-contain p-4 cursor-pointer"
        onClick={onClose}
      />
    </div>
  );
};

export default ImageViewer;