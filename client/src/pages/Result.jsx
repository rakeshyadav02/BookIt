import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useBooking } from '../context/BookingContext';
import Loader from '../components/Loader';

const Result = () => {
  const { id } = useParams();
  const { resetBooking } = useBooking();
  const { data: booking, loading, error } = useFetch(`/bookings/${id}`);

  useEffect(() => {
    if (booking) {
      // Reset booking context after showing result
      const timer = setTimeout(() => {
        resetBooking();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [booking, resetBooking]);

  if (loading) {
    return <Loader />;
  }

  if (error || !booking) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-red-500 text-6xl mb-4">✕</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Booking Failed</h1>
          <p className="text-gray-600 mb-6">
            {error || 'Unable to retrieve booking details'}
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const experience = typeof booking.experienceId === 'object' ? booking.experienceId : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">
            Your booking has been successfully confirmed
          </p>
        </div>

        <div className="border-t border-b py-6 mb-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Booking ID</h3>
              <p className="text-lg font-semibold text-gray-800">{booking._id}</p>
            </div>

            {experience && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Experience</h3>
                <p className="text-lg font-semibold text-gray-800">{experience.title}</p>
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium text-gray-500">Date & Time</h3>
              <p className="text-lg font-semibold text-gray-800">
                {new Date(booking.selectedSlot.date).toLocaleDateString()} at{' '}
                {booking.selectedSlot.time}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Guest Information</h3>
              <p className="text-gray-800">{booking.userInfo.name}</p>
              <p className="text-gray-600 text-sm">{booking.userInfo.email}</p>
              <p className="text-gray-600 text-sm">{booking.userInfo.phone}</p>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Original Price:</span>
                <span className="text-gray-800">₹{booking.originalPrice.toLocaleString()}</span>
              </div>
              {booking.discount > 0 && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Discount:</span>
                  <span className="text-green-600">-₹{booking.discount.toLocaleString()}</span>
                </div>
              )}
              {booking.promoCode && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Promo Code:</span>
                  <span className="text-gray-800 font-semibold">{booking.promoCode}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-lg font-semibold text-gray-800">Total Paid:</span>
                <span className="text-2xl font-bold text-primary-600">
                  ₹{booking.totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">
            A confirmation email has been sent to {booking.userInfo.email}
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Book Another Experience
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Result;

