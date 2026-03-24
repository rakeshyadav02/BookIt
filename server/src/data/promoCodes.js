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

export default promoCodes;
