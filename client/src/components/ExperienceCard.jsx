import React from 'react';
import { Link } from 'react-router-dom';

const ExperienceCard = ({ experience }) => {
  return (
    <Link to={`/details/${experience._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48 overflow-hidden">
          <img
            src={experience.images[0] || 'https://via.placeholder.com/400x300?text=Experience'}
            alt={experience.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
            {experience.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {experience.shortDescription}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary-600">
              ₹{experience.price.toLocaleString()}
            </span>
            <span className="text-primary-600 font-medium hover:text-primary-700">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ExperienceCard;



