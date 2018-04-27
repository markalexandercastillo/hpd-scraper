const { URL } = require('url')
  , querystring = require('querystring');

const POST_PARAMS = require('./postParams');
const { TYPES } = require('./../page');
const ADDRESS_FORM_URL = 'https://hpdonline.hpdnyc.org/HPDonline/provide_address.aspx';
const INITIAL_PAGE_PATH = '/HPDonline/select_application.aspx';

const create =
  browser => ({
    getPages: (address) =>
      browser.newPage()
        .then(browserPage => {
          browserPage.setDefaultNavigationTimeout(0);
          return browserPage;
        })
        .then(
          browserPage =>
            initialize(browserPage, address)
              .then(getPages)
              .then(pages => browserPage.close().then(() => pages))
        ),
  });

const initialize =
  (browserPage, address) =>
    navigateToInitialPage(browserPage, address)
      .then(
        () =>
          isInitialPage(browserPage)
            ? browserPage
            : Promise.reject(new Error(`Failed to initialize for address ${JSON.stringify(address)}`))
      );

const navigateToInitialPage =
  (browserPage, address) =>
    browserPage.goto(buildInitialUrl(address), { waitUntil: 'networkidle2' });

const buildInitialUrl =
  address =>
    `${ADDRESS_FORM_URL}?${querystring.stringify({
      p1: address.boroughCode,
      p2: address.houseNumber,
      p3: address.streetName,
    })}`;

const isInitialPage =
  browserPage =>
    (new URL(browserPage.url())).pathname === INITIAL_PAGE_PATH;

/**
 * @param {Page} browserPage The initial building page, which is assumed to be the 'other units' page
 */
const getPages =
  browserPage =>
    Object.entries(POST_PARAMS)
      .filter(([pageType]) => pageType !== TYPES.OTHER_UNITS)
      .reduce(
        (pagesPromise, [pageType, postParams]) =>
          Promise.all([
            getPage(browserPage, pageType, postParams),
            pagesPromise,
          ]).then(([page, pages]) => [...pages, page]),
        browserPage.content()
          .then(html => ({ html, type: TYPES.OTHER_UNITS }))
          .then(otherUnitsPage => [otherUnitsPage])
      );

const getPage =
  (browserPage, pageType, postParams) =>
    navigateToPage(browserPage, postParams)
      .then(() => browserPage.content())
      .then(html => ({html, type: pageType}));

const navigateToPage =
  (browserPage, {TARGET, ARGUMENT}) =>
    browserPage
      .evaluate(
        (TARGET, ARGUMENT) => __doPostBack(TARGET, ARGUMENT), // eslint-disable-line no-undef
        TARGET,
        ARGUMENT
      )
      .then(() => browserPage.waitForNavigation({ waitUntil: 'networkidle2' }));

module.exports = {
  create,
};
