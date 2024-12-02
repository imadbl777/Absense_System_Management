/* eslint-disable react/prop-types */

const Loading = ({ darkMode }) => {
  return (
    <div className={`absolute inset-0 flex justify-center items-center min-h-screen min-w-full ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="relative inline-flex">
        <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
        <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
        <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loading;
