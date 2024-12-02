import { useState } from 'react';
import axios from 'axios';
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password });
      const { token, role } = response.data;

      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_role', role);

      if (role === 'admin') {
        window.location.href = '/admin-dashboard'; 
      } else if (role === 'student') {
        window.location.href = '/student-dashboard'; 
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Les informations d\'identification sont incorrectes');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
        
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Bienvenue
            </h1>
            <p className="text-gray-500">
              Connectez-vous à votre compte
            </p>
          </div>

      
          {error && (
            <div className="bg-red-50 text-red-800 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
      
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-colors bg-gray-50 focus:bg-white"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-colors bg-gray-50 focus:bg-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

         
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Se souvenir de moi
                </label>
              </div>
              <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Mot de passe oublié?
              </button>
            </div>

         
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Connexion en cours...
                </>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

         
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Vous n`avez pas de compte?{' '}
              <button className="font-medium text-indigo-600 hover:text-indigo-500">
                Contactez l`administration
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;