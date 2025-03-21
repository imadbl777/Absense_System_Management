const AuthSystem = () => {
  const handleSelectedRole = (role) => {
    window.location.href = `/${role}/login`;
  };
  const role = localStorage.getItem("user_role");

  if (role === "admin") {
    window.location.href = `/admin-dashboard`;
  } else if (role === "student") {
    window.location.href = `/student-dashboard`;
  } else if (role === "prof") {
    window.location.href = `/professor-dashboard`;
  }

  return (
    <div className="h-screen w-full lg:flex items-center justify-center">
      <div className="relative h-2/3 lg:w-1/2">
        <img src="/image1.png" alt="" className="h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/70 to-transparent"></div>
      </div>
      <div className="mx-6 h-1/3">
        <div className="flex flex-col h-full justify-center">
          <h1 className="text-3xl font-bold">Portail Éducatif</h1>
          <h1 className="text-gray-400 leading-5">
            Sélectionnez votre profil pour accéder à votre espace
          </h1>
          <button
            onClick={() => handleSelectedRole("admin")}
            className="border-green-500 border-[1px] rounded-md text-lg mb-3 mt-6 font-medium lg:hover:bg-green-500 transition duration-300 hover:text-white"
          >
            Adminstration
          </button>
          <button
            onClick={() => handleSelectedRole("student")}
            className="border-blue-500 border-[1px] rounded-md text-lg mb-3 font-medium lg:hover:bg-blue-500 transition duration-300 hover:text-white"
          >
            Etudiant
          </button>
          <button
            onClick={() => handleSelectedRole("professor")}
            className="border-gray-500 border-[1px] rounded-md text-lg mb-3 font-medium lg:hover:bg-gray-500 transition duration-300 hover:text-white"
          >
            Professeur
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthSystem;
