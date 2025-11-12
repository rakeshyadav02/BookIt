import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            BookIt
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



