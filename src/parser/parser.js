const cheerio = require('cheerio');

const building = require('./building')
  , owner = require('./owner')
  , complaint = require('./complaint')
  , litigationCase = require('./litigationCase')
  , violation = require('./violation')
  , { TYPES } = require('./../page');

const create =
  () =>
    ({
      fromPage,
    });

const fromPage =
  ({html, type}) => {
    switch (type) {
    case TYPES.COMPLAINT_HISTORY:
      return {
        complaints: complaint.fromCheerio(cheerio.load(html)),
      };
    case TYPES.LITIGATION_STATUS:
      return {
        cases: litigationCase.fromCheerio(cheerio.load(html)),
      };
    case TYPES.OPEN_VIOLATIONS:
      return {
        violations: violation.fromCheerio(cheerio.load(html)),
      };
    case TYPES.REGISTRATION:
      return {
        owners: owner.fromCheerio(cheerio.load(html)),
      };
    case TYPES.OTHER_UNITS:
      return {
        building: building.fromCheerio(cheerio.load(html)),
      };
    }
  };

module.exports = {
  create,
};
