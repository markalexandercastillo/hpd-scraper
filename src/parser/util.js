const parseTabularDataFromCheerio =
  (tableSelector, rowParserFunc) => $ =>
    $(tableSelector).length
      ? fromTable($, $(tableSelector), rowParserFunc)
      : [];

const fromTable =
  ($, $table, rowParserFunc) =>
    $table
      .find('tr')
      .toArray()
      .slice(1)
      .map($)
      .map(rowParserFunc($));

const parseMonthDayYearDate =
  $dateElement => {
    const [month = null, day = null, year = null] = $dateElement.text().trim().split('/');
    return month && day && year
      ? `${year}${month}${day}`
      : null;
  };

const parseYearMonthDayDate =
  $dateElement => {
    const [year = null, month = null, day = null] = $dateElement.text().trim().split('/');
    return year && month && day
      ? `${year}${month}${day}`
      : null;
  };

module.exports = {
  parseTabularDataFromCheerio,
  parseYearMonthDayDate,
  parseMonthDayYearDate,
};
