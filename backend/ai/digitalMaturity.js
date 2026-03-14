module.exports.calculateDigitalMaturity = (automationLevel, dataUsage, machineConnectivity) => {
  // Score out of 100
  // weights: 40% automation, 30% dataUsage, 30% connectivity
  const score = (automationLevel * 0.4) + (dataUsage * 0.3) + (machineConnectivity * 0.3);
  return { score: Math.round(score) };
};