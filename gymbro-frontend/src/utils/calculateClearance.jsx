export const handleCalculateClearanceAmount = (
    clearancePercent,
    originalPrice,
    discountPrice
  ) => {
    const clearanceInDecimal = clearancePercent / 100;
  
    return discountPrice > 0
      ? discountPrice - discountPrice * clearanceInDecimal
      : originalPrice - originalPrice * clearanceInDecimal;
  };