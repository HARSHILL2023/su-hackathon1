module.exports.calculateESG = (downtimeHours, wastePercent, energyOveruse) => {
  const score = Math.max(0, 100 - (downtimeHours * 2) - (wastePercent * 3) - (energyOveruse * 1));
  return { score: Math.round(score) };
};