import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import FormInput from '../components/FormInput';
import api from '../services/api';
import Loader from '../components/Loader';

const Checkout = () => {
  const navigate = useNavigate();
  const {
    selectedExperience,
    selectedSlot,
    selectedSlotId,
    userInfo: contextUserInfo,
    promoCode: contextPromoCode,
    discount: contextDiscount,
    setUserInfo,
    setPromoCode,
    setDiscount,
  } = useBooking();

  const [userInfo, setLocalUserInfo] = useState({
    name: contextUserInfo?.name || '',
    email: contextUserInfo?.email || '',
    phone: contextUserInfo?.phone || '',
  });
  const [promoCode, setLocalPromoCode] = useState(contextPromoCode || '');
  const [promoError, setPromoError] = useState('');
  const [validatingPromo, setValidatingPromo] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (!selectedExperience || !selectedSlot) {
      navigate('/');
    }
  }, [selectedExperience, selectedSlot, navigate]);

  const handleInputChange = (field) => (e) => {
    setLocalUserInfo({ ...userInfo, [field]: e.target.value });
    if (formErrors[field]) {
      setFormErrors({ ...formErrors, [field]: undefined });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!userInfo.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!userInfo.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email)) {
      errors.email = 'Invalid email format';
    }
    
    if (!userInfo.phone.trim()) {
      errors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(userInfo.phone.replace(/\D/g, ''))) {
      errors.phone = 'Invalid phone number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePromoCodeValidate = async () => {
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }

    setValidatingPromo(true);
    setPromoError('');

    try {
      const response = await api.post('/promo/validate', {
        code: promoCode,
        totalPrice: selectedExperience?.price || 0,
      });

      if (response.data.success) {
        setDiscount(response.data.data.discount);
        setPromoCode(promoCode);
        setPromoError('');
      } else {
        setPromoError(response.data.message || 'Invalid promo code');
        setDiscount(0);
      }
    } catch (error) {
      setPromoError(error.response?.data?.message || 'Error validating promo code');
      setDiscount(0);
    } finally {
      setValidatingPromo(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm() || !selectedExperience || !selectedSlot || !selectedSlotId) {
      return;
    }

    setSubmitting(true);

    try {
      setUserInfo(userInfo);
      if (promoCode) {
        setPromoCode(promoCode);
      }

      const response = await api.post('/bookings', {
        experienceId: selectedExperience._id,
        slotId: selectedSlotId,
        userInfo,
        selectedSlot,
        promoCode: promoCode || null,
      });

      if (response.data.success) {
        navigate(`/result/${response.data.data._id}`);
      } else {
        alert(response.data.message || 'Booking failed');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating booking');
    } finally {
      setSubmitting(false);
    }
  };

  if (!selectedExperience || !selectedSlot) {
    return <Loader />;
  }

  const originalPrice = selectedExperience.price;
  const finalPrice = Math.max(0, originalPrice - contextDiscount);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Booking Information
              </h2>
              <form onSubmit={handleSubmit}>
                <FormInput
                  label="Full Name"
                  value={userInfo.name}
                  onChange={handleInputChange('name')}
                  placeholder="Enter your full name"
                  required
                  error={formErrors.name}
                />
                <FormInput
                  label="Email"
                  type="email"
                  value={userInfo.email}
                  onChange={handleInputChange('email')}
                  placeholder="Enter your email"
                  required
                  error={formErrors.email}
                />
                <FormInput
                  label="Phone"
                  type="tel"
                  value={userInfo.phone}
                  onChange={handleInputChange('phone')}
                  placeholder="Enter your phone number"
                  required
                  error={formErrors.phone}
                />

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Promo Code (Optional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => {
                        setLocalPromoCode(e.target.value.toUpperCase());
                        setPromoError('');
                      }}
                      placeholder="Enter promo code"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      type="button"
                      onClick={handlePromoCodeValidate}
                      disabled={validatingPromo || !promoCode.trim()}
                      className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      {validatingPromo ? 'Validating...' : 'Apply'}
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-red-500 text-sm mt-1">{promoError}</p>
                  )}
                  {contextDiscount > 0 && (
                    <p className="text-green-600 text-sm mt-1">
                      Promo code applied! You saved ₹{contextDiscount}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? 'Processing...' : 'Confirm Booking'}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Order Summary
              </h2>

              <div className="mb-4">
                <img
                  src={selectedExperience.images[0] || 'https://via.placeholder.com/300x200'}
                  alt={selectedExperience.title}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-gray-800 mb-2">
                  {selectedExperience.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Date: {new Date(selectedSlot.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  Time: {selectedSlot.time}
                </p>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Price:</span>
                  <span>₹{originalPrice.toLocaleString()}</span>
                </div>
                {contextDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-₹{contextDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg text-gray-800 pt-2 border-t">
                  <span>Total:</span>
                  <span>₹{finalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;



