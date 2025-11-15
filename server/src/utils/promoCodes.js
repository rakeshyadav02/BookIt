const promoCodes = {
  SAVE10: {
    type: 'percentage',
    value: 10,
    description: '10% off on total price',
  },
  FLAT100: {
    type: 'fixed',
    value: 100,
    description: 'Flat ₹100 off',
  },
  SUMMER20: {
    type: 'percentage',
    value: 20,
    description: '20% off on total price',
  },
  WELCOME50: {
    type: 'fixed',
    value: 50,
    description: 'Flat ₹50 off',
  },
};

export const validatePromoCode = (code) => {
  const promo = promoCodes[code?.toUpperCase()];
  
  if (!promo) {
    return {
      valid: false,
      message: 'Invalid promo code',
    };
  }

  return {
    valid: true,
    data: promo,
    message: 'Promo code applied successfully',
  };
};

export const calculateDiscount = (code, totalPrice) => {
  const promo = promoCodes[code?.toUpperCase()];
  
  if (!promo) {
    return 0;
  }

  if (promo.type === 'percentage') {
    return Math.round((totalPrice * promo.value) / 100);
  } else if (promo.type === 'fixed') {
    return Math.min(promo.value, totalPrice);
  }

  return 0;
};

export default promoCodes;



