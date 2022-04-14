const { DATETYPE, DAYSINAWEEK, MONTHSINAYEAR } = require('./constants');

const constructStartOfDayObject = (date) => {
  const x = new Date(date);
  return new Date(x.getFullYear(), x.getMonth(), x.getDate(), 0, 0, 0);
};

const constructEndOfDayObject = (date) => {
  const x = new Date(date);
  return new Date(x.getFullYear(), x.getMonth(), x.getDate(), 12, 0, -1);
};

const constructDateObject = (year, month, date, hour, minute, seconds) => {
  return new Date(year, month, date, hour, minute, seconds);
};

const getWeeksInAMonth = (year, month) => {
  const weeks = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  let dayOfWeek = firstDay.getDay();
  let start;
  let end;
  let weekNumber = 1;
  for (let i = 1; i < daysInMonth + 1; i += 1) {
    if (dayOfWeek === 0 || i === 1) {
      start = i;
    }

    if (dayOfWeek === 6 || i === daysInMonth) {
      end = i;
      if (start !== end) {
        weeks.push({
          name: `Week ${weekNumber}`,
          start: constructDateObject(year, month, start, 0, 0, 0),
          end: constructDateObject(year, month, end, 12, 0, -1),
        });
        weekNumber += 1;
      }
    }
    dayOfWeek = new Date(year, month, i).getDay();
  }

  return weeks;
};

const getDaysInAWeek = () => {
  const now = new Date();
  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
  const endOfWeek = new Date(now.getFullYear(), now.getMonth(), startOfWeek.getDate() + 7);

  const days = [];
  for (let i = startOfWeek.getDate(); i < endOfWeek.getDate(); i += 1) {
    days.push({
      name: DAYSINAWEEK[startOfWeek.getDay()],
      start: constructStartOfDayObject(startOfWeek),
      end: constructEndOfDayObject(startOfWeek),
    });

    startOfWeek.setDate(startOfWeek.getDate() + 1);
  }

  return days;
};

const getMonthsInAYear = (year) => {
  const months = [];

  for (let i = 0; i <= 11; i += 1) {
    const date = new Date();
    date.setMonth(i);
    const firstDay = new Date(year, date.getMonth(), 1);
    const lastDay = new Date(year, date.getMonth() + 1, 0, 0, -1);

    months.push({
      name: MONTHSINAYEAR[i],
      start: firstDay,
      end: lastDay,
    });
  }

  return months;
};

const returnDateClassification = (dateType) => {
  if (dateType === DATETYPE.THISWEEK) {
    const result = getDaysInAWeek();
    return result;
  }

  if (dateType === DATETYPE.THISMONTH) {
    const result = getWeeksInAMonth(new Date().getFullYear(), new Date().getMonth());
    return result;
  }

  if (dateType === DATETYPE.THISYEAR) {
    const result = getMonthsInAYear(new Date().getFullYear());
    return result;
  }
};

module.exports = returnDateClassification;
