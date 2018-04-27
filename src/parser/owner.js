const util = require('./util');

const { SELECTORS } = require('./../page');

const fromRow =
  $ => $row => {
    const [
      $titleCell,
      $regDatesCell,
      $organizationCell,
      $lastNameCell,
      $firstNameCell,
      $houseNumberCell,
      $streetNameCell,
      $apartmentCell,
      $cityCell,
      $stateCell,
      $postalCodeCell,
    ] = $row.find('td').toArray().map($);

    const [
      lastRegDate,
      regExpireDate,
    ] = $regDatesCell.find('span').toArray().map($).map(util.parseMonthDayYearDate);

    return {
      title: $titleCell.text().trim().toUpperCase(),
      lastRegDate,
      regExpireDate,
      organization: $organizationCell.text().trim() || null,
      lastName: $lastNameCell.text().trim().toUpperCase() || null,
      firstName: $firstNameCell.text().trim().toUpperCase() || null,
      houseNumber: $houseNumberCell.text().trim().toUpperCase() || null,
      streetName: $streetNameCell.text().trim().toUpperCase() || null,
      apartment: $apartmentCell.text().trim().toUpperCase() || null,
      city: $cityCell.text().trim().toUpperCase() || null,
      state: $stateCell.text().trim().toUpperCase() || null,
      postalCode: $postalCodeCell.text().trim().toUpperCase() || null,
    };
  };

const fromCheerio = util.parseTabularDataFromCheerio(
  SELECTORS.TABLES.REGISTRATION,
  fromRow
);

module.exports = {
  fromCheerio,
};
