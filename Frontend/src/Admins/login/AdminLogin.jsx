import { useState } from "react";
import axios from "axios";
import { Lock, Mail, UserCog } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const endpoint = `http://localhost:8000/api/admin/login`;

    try {
      const response = await axios.post(endpoint, { email, password });
      const { token, role } = response.data;

      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_role", role);

      if (role === "admin") {
        window.location.href = "/admin-dashboard";
      } else if (role === "student") {
        window.location.href = "/student-dashboard";
      } else if (role === "professor") {
        window.location.href = "/professor-dashboard";
      }
    } catch (err) {
      console.log(err);
      setError("Les informations d`identification sont incorrectes");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-green-500 to-blue-600 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-6">
          <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
              <UserCog className="text-blue-600" size={40} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Connexion Admin</h2>
        </div>

        {error && (
          <div className="mb-6 bg-red-500 border border-red-600 text-white text-center py-3 px-4 rounded-lg shadow">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-400"
                placeholder="votre.email@exemple.com"
                required
              />
              <Mail
                className="absolute left-3 top-2.5 text-gray-500"
                size={24}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-400"
                placeholder="••••••••"
                required
              />
              <Lock
                className="absolute left-3 top-2.5 text-gray-500"
                size={24}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-2"
              />
              <span className="ml-2">Se souvenir de moi</span>
            </label>
            <a href="#" className="text-sm text-blue-500 hover:text-blue-600">
              Mot de passe oublié ?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg text-white font-medium bg-gradient-to-br from-blue-500 to-green-600 ${
              isLoading ? "opacity-70" : "hover:opacity-90"
            }`}
          >
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
