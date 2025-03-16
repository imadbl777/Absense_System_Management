import { useOutletContext } from "react-router-dom";

import Statistique from "./Statistique";


const ProfDashboard = () => {
  const [darkMode] = useOutletContext();
  return (
    <div
      className={`flex flex-col w-full ${
        darkMode ? `bg-gray-900` : `bg-gray-50`
      }`}
    >
      <Statistique darkmode={darkMode} />
    
    </div>
  );
};

export default ProfDashboard;
