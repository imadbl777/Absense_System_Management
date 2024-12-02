import { Ghost } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full rounded-xl p-8 text-center transform transition-all hover:scale-105 hover:shadow-3xl">
        <div className="flex justify-center mb-6">
          <Ghost 
            size={120} 
            className="text-gray-400 opacity-80 animate-bounce"
          />
        </div>
        <h1 className="text-6xl font-bold text-gray-500 mb-4">
          404
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops! Looks like this page got lost in the digital mist.
        </p>
        <div className="flex justify-center space-x-4">
          <a 
            href="/" 
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Go Home
          </a>
          <a 
            href="/contact" 
            className="px-6 py-3 border border-gray-500 text-gray-500 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;