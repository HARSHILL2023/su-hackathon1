module.exports.projectProfit = (sellingPrice, costPerMeter) => {
  return { profitPerMeter: (sellingPrice - costPerMeter).toFixed(2) };
};