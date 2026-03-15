module.exports.forecastDemand = (last7DaysDemand) => {
  if (!last7DaysDemand || last7DaysDemand.length === 0) return { forecast: 0 };
  const sum = last7DaysDemand.reduce((acc, curr) => acc + curr, 0);
  return { forecast: (sum / last7DaysDemand.length).toFixed(2) };
};