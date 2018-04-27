const puppeteer = require('puppeteer');

const Crawler = require('./crawler')
  , Parser = require('./parser');

const closeBrowser =
  browser =>
    browser ? browser.close() : Promise.resolve();

const create =
  (puppeteerLaunchOptions = {}) => {
    let browser, crawler, parser;
    return {
      scrapeAddress: address =>
        Promise.resolve(browser)
          .then(browser => browser || puppeteer.launch(puppeteerLaunchOptions))
          .then(browser => [
            crawler || Crawler.create(browser),
            parser || Parser.create(),
          ])
          .then(
            ([crawler, parser]) =>
              crawler.getPages(address)
                .then(pages => pages.reduce(
                  (data, page) => ({ ...data, ...parser.fromPage(page) }),
                  { address }
                ))
                .catch(e => closeBrowser(browser).then(() => Promise.reject(e)))
          ),
      close: () => closeBrowser(browser),
    };
  };

module.exports = {
  create,
  Crawler,
  Parser,
};
