import React from 'react';

const SlotSelector = ({
  slots,
  selectedSlot,
  selectedSlotId,
  onSelectSlot,
}) => {
  const sortedDates = Object.keys(slots).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (sortedDates.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No available slots for this experience
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sortedDates.map((date) => (
        <div key={date} className="border border-gray-200 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            {formatDate(date)}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {slots[date].map((slot) => (
              <button
                key={slot._id}
                onClick={() => !slot.isBooked && onSelectSlot({ date, time: slot.time }, slot._id)}
                disabled={slot.isBooked}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-all duration-200
                  ${
                    slot.isBooked
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : selectedSlotId === slot._id
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700'
                  }
                `}
              >
                {slot.time}
                {slot.isBooked && (
                  <span className="block text-xs mt-1">Booked</span>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SlotSelector;



