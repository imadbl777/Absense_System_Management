/* eslint-disable no-unused-vars */
import { useState } from "react";
import { User, GraduationCap, UserCog, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const Authsystem = () => {
  const [currentPage, setCurrentPage] = useState("role-selection");

  const roles = [
    {
      id: "student",
      title: "Étudiant",
      icon: GraduationCap,
      description: "Accédez à vos notes et absences",
      gradient: "bg-gradient-to-br from-green-500 to-green-700",
    },
    {
      id: "professor",
      title: "Professeur",
      icon: User,
      description: "Gérez vos cours et le suivi des étudiants",
      gradient: "bg-gradient-to-br from-gray-500 to-gray-700",
    },
    {
      id: "admin",
      title: "Administrateur",
      icon: UserCog,
      description: "Administration complète du système",
      gradient: "bg-gradient-to-br from-blue-500 to-blue-700",
    },
  ];

  const handleRoleSelect = (role) => {
    window.location.href = `/${role}/login`;
  };

  const RoleSelectionPage = () => (
    <div className="min-h-screen bg-black overflow-hidden relative">
      <div className="absolute inset-0 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: 'radial-gradient(circle farthest-corner at 25% 100%, #00008B, #00008B)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
        <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(45deg, #000000, #000000 10px, #1a1a1a 10px, #1a1a1a 20px)' }}></div>
      </div>

      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-black to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black to-transparent"></div>
      </div>

      <div className="max-w-6xl w-full mx-auto p-8 sm:p-12 relative z-10">
        <div className="text-center mb-12">
          <motion.h1
            className="text-6xl font-extrabold text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Portail Éducatif
          </motion.h1>
          <motion.p
            className="text-gray-300 text-lg sm:text-xl max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Sélectionnez votre profil pour accéder à votre espace
          </motion.p>
        </div>

        <motion.div
          className="grid md:grid-cols-3 gap-12 sm:gap-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          {roles.map((role) => (
            <motion.div
              key={role.id}
              className="cursor-pointer transform transition-all duration-500 hover:scale-110 hover:shadow-2xl rounded-3xl overflow-hidden border border-transparent"
              onClick={() => handleRoleSelect(role.id)}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 + 0.2 * roles.indexOf(role) }}
            >
              <div
                className={`shadow-lg px-8 py-6 text-center ${role.gradient} flex flex-col justify-between h-full relative`}
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 mx-auto bg-white/10">
                    <role.icon className="text-white animate-pulse" size={48} />
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-3">
                    {role.title}
                  </h2>
                  <p className="text-gray-300 text-sm mb-6">{role.description}</p>
                </div>
                <div className="flex items-center justify-center text-base font-medium text-white hover:text-gray-300 transition-all">
                  <span className="animate-bounce">Se connecter</span>
                  <ChevronRight size={24} className="ml-2 animate-bounce" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );

  return <div>{currentPage === "role-selection" && <RoleSelectionPage />}</div>;
};

export default Authsystem;