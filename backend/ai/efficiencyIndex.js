module.exports.calculatePEI = (actualOutput, expectedOutput) => {
  const current = expectedOutput === 0 ? 0 : Math.round((actualOutput / expectedOutput) * 100);
  return { current, trend: current };
};