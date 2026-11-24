(() => {
  'use strict';
  const year = window.ADVENT_SETTINGS.year;
  const month = window.ADVENT_SETTINGS.month;
  const total = 25;
  window.AdventDate = {
    availableDay(date) {
      if (date.year < year || (date.year === year && date.month < month)) return 0;
      if (date.year > year || (date.year === year && date.month > month)) return total;
      return Math.min(total, Math.max(0, date.day));
    }
  };
})();
