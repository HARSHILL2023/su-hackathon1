module.exports.findDelayRootCause = (machineUptimePct, inventoryLow) => {
  let causes = [];
  if (machineUptimePct < 70) causes.push('machine downtime');
  if (inventoryLow === true) causes.push('material shortage');
  return causes;
};