module.exports.optimizeShifts = (workerHours, threshold) => {
  let suggestions = [];
  if (workerHours > threshold) {
     suggestions.push('Suggest rotation');
  }
  return { suggestions };
};