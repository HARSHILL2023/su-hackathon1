module.exports.calculateWorkerEfficiency = (outputProduced, targetOutput) => {
  const efficiency = targetOutput > 0 ? (outputProduced / targetOutput) * 100 : 0;
  return { efficiency: efficiency.toFixed(2) };
};