const { SELECTORS } = require('./../page');

const fromCheerio =
  $ =>
    $(SELECTORS.TABLES.BUILDING_INFO).length
      ? fromTable($, $(SELECTORS.TABLES.BUILDING_INFO))
      : null;

const fromTable =
  ($, $table) => {
    const [
      $addressSpan,
      $isPmcsSpan,
      $idSpan,
      $statusSpan,
      $rangeSpan,
      $blockSpan,
      $lotSpan,
      $communityDistrictSpan,
      $censusTractSpan,
      $storyCountSpan,
      $aUnitCountSpan,
      $bUnitCountSpan,
      $ownershipTypeSpan,
      $registrationNumberSpan,
      $classSpan,
    ] = $table.find('span').toArray().map($);

    return {
      rawAddress: $addressSpan.text().replace(/(\s+)/g, ' ').toUpperCase().trim(),
      isPmcs: !!$isPmcsSpan.text().trim().length,
      id: $idSpan.text().trim(),
      status: $statusSpan.text().trim().toLowerCase(),
      range: $rangeSpan.text().trim(),
      block: $blockSpan.text().trim(),
      lot: $lotSpan.text().trim(),
      communityDistrict: $communityDistrictSpan.text().trim(),
      censusTract: $censusTractSpan.text().trim(),
      storyCount: parseInt($storyCountSpan.text().trim()),
      aUnitCount: parseInt($aUnitCountSpan.text().trim()),
      bUnitCount: parseInt($bUnitCountSpan.text().trim()),
      ownershipType: $ownershipTypeSpan.text().trim().toUpperCase(),
      registrationNumber: $registrationNumberSpan.text().trim(),
      class: $classSpan.text().trim().toUpperCase(),
    };
  };

module.exports = {
  fromCheerio,
};
