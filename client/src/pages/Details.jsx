import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useBooking } from '../context/BookingContext';
import SlotSelector from '../components/SlotSelector';
import Loader from '../components/Loader';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`/experiences/${id}`);
  const { setSelectedExperience, setSlots, selectedSlot, selectedSlotId, setSelectedSlot } = useBooking();

  useEffect(() => {
    if (data) {
      setSelectedExperience(data.experience);
      setSlots(data.slots);
    }
  }, [data, setSelectedExperience, setSlots]);

  const handleSlotSelect = (slot, slotId) => {
    setSelectedSlot(slot, slotId);
  };

  const handleContinue = () => {
    if (selectedSlot) {
      navigate('/checkout');
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold">Error loading experience details</p>
          <p className="mt-2">{error || 'Experience not found'}</p>
        </div>
      </div>
    );
  }

  const { experience, slots } = data;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={experience.images[0] || 'https://via.placeholder.com/800x400?text=Experience'}
              alt={experience.title}
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Experience Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{experience.title}</h1>
          <p className="text-gray-600 mb-4">{experience.description}</p>
          <div className="flex items-center justify-between border-t pt-4">
            <span className="text-3xl font-bold text-primary-600">
              ₹{experience.price.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Slot Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Select Date & Time
          </h2>
          <SlotSelector
            slots={slots}
            selectedSlot={selectedSlot}
            selectedSlotId={selectedSlotId}
            onSelectSlot={handleSlotSelect}
          />
        </div>

        {/* Continue Button */}
        <div className="flex justify-end">
          <button
            onClick={handleContinue}
            disabled={!selectedSlot}
            className={`
              px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200
              ${
                selectedSlot
                  ? 'bg-primary-600 hover:bg-primary-700 shadow-md hover:shadow-lg'
                  : 'bg-gray-300 cursor-not-allowed'
              }
            `}
          >
            Continue to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;



