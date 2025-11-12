import { validatePromoCode, calculateDiscount } from '../utils/promoCodes.js';

export const validatePromo = async (req, res) => {
  try {
    const { code, totalPrice } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Promo code is required',
      });
    }

    const validation = validatePromoCode(code);

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.message,
      });
    }

    const discount = calculateDiscount(code, totalPrice || 0);
    const finalPrice = Math.max(0, (totalPrice || 0) - discount);

    res.status(200).json({
      success: true,
      data: {
        code: code.toUpperCase(),
        discount,
        originalPrice: totalPrice || 0,
        finalPrice,
        ...validation.data,
      },
      message: validation.message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error validating promo code',
    });
  }
};



