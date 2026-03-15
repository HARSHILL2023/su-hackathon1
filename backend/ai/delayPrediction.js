module.exports.predictDelay = (remainingWork, averageOutputPerHour, deadlineHours) => {
  const expectedCompletionTime = averageOutputPerHour > 0 ? (remainingWork / averageOutputPerHour) : 9999;
  let status = 'On Time';
  if (expectedCompletionTime > deadlineHours) status = 'Delayed';
  else if (expectedCompletionTime > deadlineHours * 0.8) status = 'Risk';
  return { expectedCompletionTime: expectedCompletionTime.toFixed(2), status };
};