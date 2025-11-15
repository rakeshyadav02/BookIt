import React from 'react';
import { useFetch } from '../hooks/useFetch';
import ExperienceCard from '../components/ExperienceCard';
import Loader from '../components/Loader';

const Home = () => {
  const { data: experiences, loading, error } = useFetch('/experiences');

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold">Error loading experiences</p>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Discover Amazing Experiences
        </h1>
        <p className="text-xl text-gray-600">
          Book your perfect adventure today
        </p>
      </div>

      {experiences && experiences.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((experience) => (
            <ExperienceCard key={experience._id} experience={experience} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="text-xl">No experiences available at the moment</p>
        </div>
      )}
    </div>
  );
};

export default Home;



