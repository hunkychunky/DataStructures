/**
 * A function that returns first day of the current month
 * @returns {Date}
 */
const firstDayOfCurrentMonth = () => {
  const currenDate = new Date();
  return new Date(currenDate.getFullYear(), currenDate.getMonth(), 1);
};

/**
 * A function that returns last day of the current month
 * @returns {Date}
 */
const lastDayofCurrentMonth = () => {
  const currentDate = new Date();
  return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
};

module.exports = {
  firstDayOfCurrentMonth,
  lastDayofCurrentMonth,
};
