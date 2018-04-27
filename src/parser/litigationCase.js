const util = require('./util');

const { SELECTORS } = require('./../page');

const fromRow =
  $ => $row => {
    const [
      $typeSpan,
      $openedDateSpan,
      $statusSpan,
      $judgementOutstandingSpan,
    ] = $row.find('span').toArray().map($);

    return {
      type: $typeSpan.text().trim().toUpperCase(),
      openedDate: util.parseMonthDayYearDate($openedDateSpan),
      status: $statusSpan.text().trim().toUpperCase(),
      isJudgementOutstanding: !!$judgementOutstandingSpan.text().trim(),
    };
  };

const fromCheerio = util.parseTabularDataFromCheerio(
  SELECTORS.TABLES.CASE_STATUS,
  fromRow
);

module.exports = {
  fromCheerio,
};
