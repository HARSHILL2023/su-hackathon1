module.exports.calculateCostPerMeter = (materialCost, laborCost, energyCost, metersProduced) => {
  const costPerMeter = metersProduced > 0 ? (materialCost + laborCost + energyCost) / metersProduced : 0;
  return { costPerMeter: costPerMeter.toFixed(2) };
};