module.exports.checkInventoryAlert = (quantity, reorderLevel) => {
  return quantity < reorderLevel;
};