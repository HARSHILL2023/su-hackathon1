module.exports.assessFireRisk = (temperature, lintDetected) => {
  const highFireRisk = (temperature > 50 && lintDetected === true);
  return { highFireRisk };
};