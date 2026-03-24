import defaultPromoCodes from '../data/promoCodes.js';

const normalizePromoCodes = (codes = {}) => {
  const normalized = {};

  Object.entries(codes).forEach(([rawCode, promo]) => {
    const code = String(rawCode || '').trim().toUpperCase();

    if (!code) {
      return;
    }

    if (!promo || typeof promo !== 'object') {
      return;
    }

    if (!['percentage', 'fixed'].includes(promo.type)) {
      return;
    }

    const value = Number(promo.value);
    if (!Number.isFinite(value) || value <= 0) {
      return;
    }

    normalized[code] = {
      type: promo.type,
      value,
      description: promo.description || '',
    };
  });

  return normalized;
};

const resolvePromoCodes = () => {
  const baseCodes = normalizePromoCodes(defaultPromoCodes);

  const rawOverride = process.env.PROMO_CODES_JSON;
  if (!rawOverride) {
    return baseCodes;
  }

  try {
    const parsed = JSON.parse(rawOverride);
    return {
      ...baseCodes,
      ...normalizePromoCodes(parsed),
    };
  } catch (error) {
    console.warn('Invalid PROMO_CODES_JSON. Falling back to default promo catalog.');
    return baseCodes;
  }
};

const promoCodes = resolvePromoCodes();

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



