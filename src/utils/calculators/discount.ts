// Discount Calculator Logic
export interface DiscountResult {
  discountAmount: number;
  finalPrice: number;
  savedAmount: number;
  savedPercentage: number;
}

export function calculateDiscount(
  originalPrice: number,
  discountPercentage: number
): DiscountResult {
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const finalPrice = originalPrice - discountAmount;

  return {
    discountAmount: Math.round(discountAmount * 100) / 100,
    finalPrice: Math.round(finalPrice * 100) / 100,
    savedAmount: Math.round(discountAmount * 100) / 100,
    savedPercentage: discountPercentage,
  };
}

export function calculateFinalPrice(
  originalPrice: number,
  finalPrice: number
): DiscountResult {
  const discountAmount = originalPrice - finalPrice;
  const discountPercentage = (discountAmount / originalPrice) * 100;

  return {
    discountAmount: Math.round(discountAmount * 100) / 100,
    finalPrice: Math.round(finalPrice * 100) / 100,
    savedAmount: Math.round(discountAmount * 100) / 100,
    savedPercentage: Math.round(discountPercentage * 100) / 100,
  };
}
