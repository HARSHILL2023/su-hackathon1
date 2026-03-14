module.exports.getRecommendations = ({ healthScore, inventoryLow, pei }) => {
  let actions = [];
  if (healthScore < 80) actions.push('Schedule maintenance');
  if (inventoryLow) actions.push('Reorder yarn');
  if (pei < 90) actions.push('Add extra shift');
  return actions;
};