module.exports.calculateDailyOutput = (outputList) => {
  const total = outputList.reduce((acc, curr) => acc + (curr || 0), 0);
  return { totalMetersProduced: total };
};