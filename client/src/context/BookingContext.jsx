import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

const BookingContext = createContext(undefined);

export const BookingProvider = ({ children }) => {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [slots, setSlots] = useState({});
  const [userInfo, setUserInfo] = useState(null);
  const [promoCode, setPromoCode] = useState(null);
  const [discount, setDiscount] = useState(0);

  const handleSetSelectedSlot = useCallback((slot, slotId) => {
    setSelectedSlot(slot);
    setSelectedSlotId(slotId);
  }, []);

  const resetBooking = useCallback(() => {
    setSelectedExperience(null);
    setSelectedSlot(null);
    setSelectedSlotId(null);
    setSlots({});
    setUserInfo(null);
    setPromoCode(null);
    setDiscount(0);
  }, []);

  const value = useMemo(() => ({
    selectedExperience,
    selectedSlot,
    selectedSlotId,
    slots,
    userInfo,
    promoCode,
    discount,
    setSelectedExperience,
    setSelectedSlot: handleSetSelectedSlot,
    setSlots,
    setUserInfo,
    setPromoCode,
    setDiscount,
    resetBooking,
  }), [
    selectedExperience,
    selectedSlot,
    selectedSlotId,
    slots,
    userInfo,
    promoCode,
    discount,
    handleSetSelectedSlot,
    resetBooking,
  ]);

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

