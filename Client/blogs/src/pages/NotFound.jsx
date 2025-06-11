import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F5F5] dark:bg-[#1C1C1E] transition-colors duration-700 px-4">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold text-gray-800 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Oops! Page not found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 text-white bg-yellow-600 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 rounded-lg shadow transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;