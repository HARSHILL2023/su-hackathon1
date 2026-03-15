module.exports.analyzeYarnPrice = (currentPrice, lastWeekPrice) => {
  const volatility = lastWeekPrice > 0 ? ((currentPrice - lastWeekPrice) / lastWeekPrice) * 100 : 0;
  return { volatility: volatility.toFixed(2) };
};