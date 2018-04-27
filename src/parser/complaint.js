const util = require('./util');

const { SELECTORS } = require('./../page');

const fromRow =
  $ => $row => {
    const [
      $dateCell,
      $numberCell,
      $serviceRequestNumberCell,
      $apartmentCell,
      $conditionCell,
      $detailCell,
      $locationCell,
    ] = $row.find('td').toArray().map($);

    return {
      date: util.parseMonthDayYearDate($dateCell),
      number: $numberCell.text().trim(),
      serviceRequestNumber: $serviceRequestNumberCell.text().trim(),
      apartment: $apartmentCell.text().trim().toUpperCase() || null,
      condition: $conditionCell.text().trim().toUpperCase() || null,
      detail: $detailCell.text().trim().toUpperCase() || null,
      location: $locationCell.text().trim().toUpperCase() || null,
    };
  };

const fromCheerio = util.parseTabularDataFromCheerio(
  SELECTORS.TABLES.COMPLAINT_HISTORY,
  fromRow
);

module.exports = {
  fromCheerio,
};
