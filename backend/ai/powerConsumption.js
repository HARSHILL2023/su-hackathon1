module.exports.calculatePowerCost = (powerUsage, costPerKwh) => {
  return { energyCost: (powerUsage * costPerKwh).toFixed(2) };
};