module.exports.calculateUtilization = (runningHours, totalAvailableHours) => {
  const utilization = totalAvailableHours > 0 ? (runningHours / totalAvailableHours) * 100 : 0;
  return { utilization: utilization.toFixed(2) };
};