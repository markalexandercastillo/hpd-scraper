const util = require('./util');

const { SELECTORS } = require('./../page');

const fromRow =
  $ => $row => {
    const [
      $apartmentSpan,
      $storySpan,
      $reportedDateSpan,
      $noticeIssuedDateSpan,
      $orderNumberSpan,
      $rentFlagSpan,
      $statusSpan,
      $lastStatusDateSpan,
      $certifyByDateSpan,
      $certifyDateSpan,
    ] = $row.find('span').toArray().map($);
    const $descriptionCell = $($row.find('td')[5]);
    const [
      reportedDate,
      noticeIssuedDate,
      lastStatusDate,
      certifyByDate,
      certifyDate,
    ] = [
      $reportedDateSpan,
      $noticeIssuedDateSpan,
      $lastStatusDateSpan,
      $certifyByDateSpan,
      $certifyDateSpan,
    ].map(util.parseYearMonthDayDate);

    /**
     * TODO - parse out various codes from description. Examples:
     * § 27-2005 adm code
     * § 27-2046.1, 2046.2 hmc:
     * d26-10.01, 10.05 adm code
     * § 27-2005, 2007 adm code
     * § 27-2018  admin. code:
     * § 27-2043.1 hmc
     * § 27-2005 adm code & 309 m/d law
     */

    return {
      description: $descriptionCell.text().trim(),
      apartment: $apartmentSpan.text().trim().toUpperCase() || null,
      story: $storySpan.text().trim().toUpperCase() || null,
      reportedDate,
      noticeIssuedDate,
      orderNumber: $orderNumberSpan.text().trim(),
      rentFlag: !!$rentFlagSpan.text().trim(),
      status: $statusSpan.text().trim().toUpperCase(),
      lastStatusDate,
      certifyByDate,
      certifyDate,
    };
  };

const fromCheerio = util.parseTabularDataFromCheerio(SELECTORS.TABLES.OPEN_VIOLATIONS, fromRow);

module.exports = {
  fromCheerio,
};
