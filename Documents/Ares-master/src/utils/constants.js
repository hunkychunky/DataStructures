const DATETYPE = {
  ALLTIME: 'alltime',
  THISWEEK: 'week',
  THISMONTH: 'month',
  THISYEAR: 'year',
  TODAY: 'today',
};

const ORDERSTATUS = {
  ACCEPTED: 'accepted',
  PENDING: 'pending',
  COMPLETED: 'completed',
  DELAYED: 'delayed',
  CANCELED: 'canceled',
};

const TRANSACTIONSTATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  PENDING: 'pending',
  CANCELED: 'canceled',
  REVERSED: 'reversed',
};

const DAYSINAWEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday'];
const MONTHSINAYEAR = [
  'January',
  'Febuary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const SHOPPRODUCTTYPE = {
  POPULAR: 'popular',
  NEWARRIVALS: 'newarrivals',
  CATEGORIES: 'categories'
};

module.exports = {
  DATETYPE,
  ORDERSTATUS,
  TRANSACTIONSTATUS,
  DAYSINAWEEK,
  MONTHSINAYEAR,
  SHOPPRODUCTTYPE,
};
