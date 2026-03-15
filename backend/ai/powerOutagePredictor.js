module.exports.predictPowerOutage = () => {
  const probability = Math.random();
  const predictedOutage = probability > 0.75;
  return { probability: probability.toFixed(2), predictedOutage };
};