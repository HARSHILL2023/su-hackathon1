module.exports.calculateMaintenanceScore = (breakdowns, daysSinceMaintenance) => {
  const score = Math.max(0, 100 - (breakdowns * 10) - (daysSinceMaintenance * 2));
  let color = score > 80 ? 'Green' : (score >= 60 ? 'Yellow' : 'Red');
  return { score: Math.round(score), color };
};